// 使用内置fetch

async function testDownload() {
  try {
    console.log('🧪 Testing download endpoint...');
    
    const url = 'https://ai-stem-splitter-fown.onrender.com/api/download/557a7f54-cc08-4dea-a30f-d8bccd951fec/vocals';
    
    console.log('📥 Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const contentType = response.headers.get('content-type');
    console.log('📊 Content-Type:', contentType);
    
    const contentLength = response.headers.get('content-length');
    console.log('📊 Content-Length:', contentLength);
    
    const buffer = await response.arrayBuffer();
    console.log('📊 Buffer size:', buffer.length);
    
    // 检查前100个字节
    const preview = Buffer.from(buffer).slice(0, 100);
    console.log('📊 First 100 bytes:', preview.toString('hex'));
    
    // 检查是否是HTML
    const text = Buffer.from(buffer).toString('utf8', 0, 200);
    if (text.includes('<!doctype html>') || text.includes('<html')) {
      console.log('❌ Response is HTML, not audio file');
      console.log('📄 HTML preview:', text);
    } else {
      console.log('✅ Response appears to be binary data');
    }
    
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testDownload();
