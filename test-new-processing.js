// 测试新的处理流程
async function testNewProcessing() {
  try {
    console.log('🧪 测试新的处理流程...');
    
    // 1. 上传新文件
    console.log('\n1️⃣ 上传新文件...');
    const formData = new FormData();
    // 创建一个简单的测试音频文件（模拟）
    const testAudio = new Blob(['test audio content'], { type: 'audio/mpeg' });
    formData.append('audio', testAudio, 'test-audio.mp3');
    
    const uploadResponse = await fetch('https://ai-stem-splitter-fown.onrender.com/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.status}`);
    }
    
    const uploadData = await uploadResponse.json();
    console.log('✅ 上传成功:', uploadData.data.fileId);
    
    // 2. 启动处理
    console.log('\n2️⃣ 启动处理...');
    const processResponse = await fetch('https://ai-stem-splitter-fown.onrender.com/api/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileId: uploadData.data.fileId
      })
    });
    
    if (!processResponse.ok) {
      throw new Error(`Process failed: ${processResponse.status}`);
    }
    
    const processData = await processResponse.json();
    console.log('✅ 处理启动成功:', processData.data.jobId);
    
    // 3. 等待处理完成
    console.log('\n3️⃣ 等待处理完成...');
    let attempts = 0;
    const maxAttempts = 30; // 最多等待5分钟
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // 等待10秒
      attempts++;
      
      const statusResponse = await fetch(`https://ai-stem-splitter-fown.onrender.com/api/process/${processData.data.jobId}`);
      const statusData = await statusResponse.json();
      
      console.log(`📊 处理状态 (${attempts}/${maxAttempts}):`, {
        status: statusData.data.status,
        progress: statusData.data.progress
      });
      
      if (statusData.data.status === 'completed') {
        console.log('✅ 处理完成！');
        console.log('📊 Stems:', statusData.data.stems);
        
        // 4. 测试下载
        console.log('\n4️⃣ 测试下载...');
        const downloadResponse = await fetch(`https://ai-stem-splitter-fown.onrender.com/api/download/${processData.data.jobId}/vocals`);
        
        if (downloadResponse.ok) {
          console.log('✅ 下载成功！');
          const downloadData = await downloadResponse.arrayBuffer();
          console.log('📊 下载文件大小:', downloadData.byteLength);
        } else {
          console.log('❌ 下载失败:', downloadResponse.status);
          const errorData = await downloadResponse.text();
          console.log('❌ 错误信息:', errorData);
        }
        
        break;
      } else if (statusData.data.status === 'failed') {
        console.log('❌ 处理失败:', statusData.data.error);
        break;
      }
    }
    
    if (attempts >= maxAttempts) {
      console.log('⏰ 处理超时，请手动检查');
    }
    
  } catch (error) {
    console.error('❌ 测试错误:', error);
  }
}

testNewProcessing();
