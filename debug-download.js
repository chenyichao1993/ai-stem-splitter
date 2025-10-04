// 深度调试下载问题
async function debugDownload() {
  try {
    console.log('🔍 深度调试下载问题...');
    
    const jobId = 'a5a54b79-05dc-4cc3-8e9d-c4b1a5138e02';
    const stemType = 'vocals';
    const url = `https://ai-stem-splitter-fown.onrender.com/api/download/${jobId}/${stemType}`;
    
    console.log('📥 请求URL:', url);
    
    // 1. 测试下载端点
    console.log('\n1️⃣ 测试下载端点...');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'audio/mpeg, audio/*, */*'
      }
    });
    
    console.log('📊 响应状态:', response.status);
    console.log('📊 响应头:', Object.fromEntries(response.headers.entries()));
    
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    
    console.log('📊 Content-Type:', contentType);
    console.log('📊 Content-Length:', contentLength);
    
    // 2. 检查响应内容
    console.log('\n2️⃣ 检查响应内容...');
    const buffer = await response.arrayBuffer();
    console.log('📊 缓冲区大小:', buffer.byteLength);
    
    // 检查前200个字节
    const preview = Buffer.from(buffer).slice(0, 200);
    console.log('📊 前200字节 (hex):', preview.toString('hex'));
    
    // 检查是否为HTML
    const text = Buffer.from(buffer).toString('utf8', 0, 500);
    if (text.includes('<!doctype html>') || text.includes('<html')) {
      console.log('❌ 响应是HTML页面，不是音频文件');
      console.log('📄 HTML内容预览:', text.substring(0, 300));
    } else {
      console.log('✅ 响应看起来是二进制数据');
    }
    
    // 3. 测试Cloudinary URL
    console.log('\n3️⃣ 测试Cloudinary URL...');
    const cloudinaryUrl = 'https://res.cloudinary.com/dbxdnfxgn/raw/upload/v1759557276/stem-splitter/stems/a5a54b79-05dc-4cc3-8e9d-c4b1a5138e02_vocals';
    
    const cloudinaryResponse = await fetch(cloudinaryUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    console.log('📊 Cloudinary响应状态:', cloudinaryResponse.status);
    console.log('📊 Cloudinary Content-Type:', cloudinaryResponse.headers.get('content-type'));
    console.log('📊 Cloudinary Content-Length:', cloudinaryResponse.headers.get('content-length'));
    
    const cloudinaryBuffer = await cloudinaryResponse.arrayBuffer();
    console.log('📊 Cloudinary缓冲区大小:', cloudinaryBuffer.byteLength);
    
    // 检查Cloudinary内容
    const cloudinaryText = Buffer.from(cloudinaryBuffer).toString('utf8', 0, 200);
    if (cloudinaryText.includes('<!doctype html>') || cloudinaryText.includes('<html')) {
      console.log('❌ Cloudinary URL也返回HTML页面');
      console.log('📄 Cloudinary HTML预览:', cloudinaryText);
    } else {
      console.log('✅ Cloudinary URL返回正确的音频数据');
    }
    
  } catch (error) {
    console.error('❌ 调试错误:', error);
  }
}

debugDownload();
