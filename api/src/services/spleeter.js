// Spleeter 本地音频分离服务
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class SpleeterService {
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

  // 分离音频文件
  async separateAudio(inputFilePath, outputDir) {
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

  // 清理临时文件
  cleanup(tempDir) {
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
        console.log(`🧹 清理临时目录: ${tempDir}`);
      }
    } catch (error) {
      console.error(`❌ 清理失败: ${error.message}`);
    }
  }
}

module.exports = SpleeterService;
