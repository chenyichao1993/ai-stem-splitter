// 真实音频分离处理模块
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const { supabase } = require('./config/supabase');

class AudioProcessor {
  constructor() {
    this.tempDir = path.join(__dirname, '../../temp');
    this.outputDir = path.join(__dirname, '../../output');
    
    // 确保目录存在
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  // 使用 Spleeter 分离音频
  async separateWithSpleeter(inputFilePath, outputDir) {
    return new Promise((resolve, reject) => {
      console.log(`🎵 开始使用 Spleeter 分离音频: ${inputFilePath}`);
      
      // 使用 Spleeter 的 4stems 模型分离音频
      const spleeter = spawn('spleeter', [
        'separate',
        '-p', 'spleeter:4stems-16kHz',
        '-o', outputDir,
        inputFilePath
      ]);

      let stdout = '';
      let stderr = '';

      spleeter.stdout.on('data', (data) => {
        stdout += data.toString();
        console.log(`Spleeter stdout: ${data}`);
      });

      spleeter.stderr.on('data', (data) => {
        stderr += data.toString();
        console.log(`Spleeter stderr: ${data}`);
      });

      spleeter.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Spleeter 分离完成');
          resolve({
            success: true,
            outputDir: outputDir,
            stems: ['vocals', 'drums', 'bass', 'other']
          });
        } else {
          console.error(`❌ Spleeter 分离失败，退出码: ${code}`);
          reject(new Error(`Spleeter failed with code ${code}: ${stderr}`));
        }
      });

      spleeter.on('error', (error) => {
        console.error(`❌ Spleeter 启动失败: ${error.message}`);
        reject(new Error(`Failed to start Spleeter: ${error.message}`));
      });
    });
  }

  // 获取分离后的音轨文件
  getStemFiles(outputDir, baseFileName) {
    const stems = ['vocals', 'drums', 'bass', 'other'];
    const stemFiles = {};
    
    stems.forEach(stem => {
      const stemPath = path.join(outputDir, baseFileName, `${stem}.wav`);
      if (fs.existsSync(stemPath)) {
        stemFiles[stem] = stemPath;
      }
    });
    
    return stemFiles;
  }

  // 处理音频分离任务
  async processAudio(jobId, fileId) {
    try {
      console.log('🎵 开始使用 Spleeter 真实音频分离...');
      
      // 更新状态为处理中
      await supabase
        .from('processing_jobs')
        .update({ status: 'processing' })
        .eq('id', jobId);

      // 获取原始音频文件信息
      const { data: audioFileData, error: audioError } = await supabase
        .from('audio_files')
        .select('storage_url, file_size, original_name')
        .eq('id', fileId)
        .single();
      
      if (audioError) {
        throw new Error('Failed to fetch audio file');
      }

      // 下载原始音频文件
      console.log('📥 下载原始音频文件...');
      const originalResponse = await fetch(audioFileData.storage_url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (!originalResponse.ok) {
        throw new Error(`Failed to download original file: ${originalResponse.status}`);
      }
      
      const originalBuffer = Buffer.from(await originalResponse.arrayBuffer());
      console.log('✅ 原始音频文件下载成功，大小:', originalBuffer.length, 'bytes');

      // 保存临时文件
      const tempFileName = `${jobId}_input.wav`;
      const tempFilePath = path.join(this.tempDir, tempFileName);
      fs.writeFileSync(tempFilePath, originalBuffer);
      console.log(`💾 临时文件保存: ${tempFilePath}`);

      // 创建输出目录
      const outputDir = path.join(this.outputDir, jobId);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // 使用 Spleeter 分离音频
      console.log('🎵 开始 Spleeter 音频分离...');
      const separationResult = await this.separateWithSpleeter(tempFilePath, outputDir);
      console.log('✅ Spleeter 分离完成:', separationResult);

      // 获取分离后的文件
      const baseFileName = path.parse(audioFileData.original_name).name;
      const stemFiles = this.getStemFiles(outputDir, baseFileName);
      console.log('📁 分离文件:', stemFiles);

      // 上传分离结果到 Cloudinary
      const stems = ['vocals', 'drums', 'bass', 'other'];
      const stemData = [];
      
      for (const stem of stems) {
        if (stemFiles[stem]) {
          try {
            console.log(`📤 上传 ${stem} 音轨到 Cloudinary...`);
            
            // 读取分离后的文件
            const stemBuffer = fs.readFileSync(stemFiles[stem]);
            
            // 上传到 Cloudinary
            const stemFileName = `${jobId}_${stem}.wav`;
            const stemPublicId = `stem-splitter/stems/${stemFileName}`;
            
            const uploadResult = await cloudinary.uploader.upload(
              `data:audio/wav;base64,${stemBuffer.toString('base64')}`,
              {
                public_id: stemPublicId,
                resource_type: 'raw',
                folder: 'stem-splitter/stems'
              }
            );
            
            console.log(`✅ ${stem} 音轨上传成功:`, uploadResult.secure_url);
            
            // 保存到数据库
            const { error: stemError } = await supabase
              .from('separated_stems')
              .insert({
                id: uuidv4(),
                job_id: jobId,
                stem_type: stem,
                file_name: stemFileName,
                storage_url: uploadResult.secure_url,
                public_id: stemPublicId,
                file_size: stemBuffer.length,
                expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                is_expired: false
              });
            
            if (stemError) {
              console.error(`❌ 保存 ${stem} 音轨信息失败:`, stemError);
            } else {
              console.log(`✅ ${stem} 音轨信息保存成功`);
            }
            
            stemData.push({
              type: stem,
              url: uploadResult.secure_url,
              size: stemBuffer.length
            });
            
          } catch (error) {
            console.error(`❌ 处理 ${stem} 音轨失败:`, error.message);
          }
        } else {
          console.log(`⚠️ ${stem} 音轨文件不存在，跳过`);
        }
      }
      
      // 更新处理状态为完成
      await supabase
        .from('processing_jobs')
        .update({ 
          status: 'completed',
          progress: 100,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
      
      console.log('🎉 Spleeter 音频分离处理完成！');
      
      // 清理临时文件
      this.cleanup(this.tempDir);
      this.cleanup(outputDir);

    } catch (error) {
      console.error('❌ Spleeter 处理错误:', error.message);
      
      // 更新处理状态为失败
      await supabase
        .from('processing_jobs')
        .update({ 
          status: 'failed',
          error: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
    }
  }

  // 清理临时文件
  cleanup(dir) {
    try {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`🧹 清理临时目录: ${dir}`);
      }
    } catch (error) {
      console.error(`❌ 清理失败: ${error.message}`);
    }
  }
}

module.exports = AudioProcessor;
