// Cloudinary工具函数
const cloudinary = require('cloudinary').v2;

// 上传文件到Cloudinary
async function uploadToCloudinary(buffer, options = {}) {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw', // 强制使用raw类型，不进行任何转换
          folder: 'stem-splitter',
          use_filename: true,
          unique_filename: true,
          ...options
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve({
              success: true,
              data: {
                public_id: result.public_id,
                secure_url: result.secure_url,
                format: result.format,
                bytes: result.bytes,
                width: result.width,
                height: result.height
              }
            });
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 删除文件
async function deleteFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 生成优化后的URL
function getOptimizedUrl(publicId, options = {}) {
  const defaultOptions = {
    quality: 'auto',
    format: 'auto',
    fetch_format: 'auto'
  };
  
  return cloudinary.url(publicId, {
    ...defaultOptions,
    ...options
  });
}

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
  getOptimizedUrl
};
