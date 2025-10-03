// Cloudinary配置文件
import { v2 as cloudinary } from 'cloudinary';

// 配置Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// 上传文件到Cloudinary
export async function uploadToCloudinary(file, options = {}) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
      folder: 'stem-splitter',
      use_filename: true,
      unique_filename: true,
      ...options
    });
    
    return {
      success: true,
      data: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        format: result.format,
        bytes: result.bytes,
        width: result.width,
        height: result.height
      }
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 删除文件
export async function deleteFromCloudinary(publicId) {
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
export function getOptimizedUrl(publicId, options = {}) {
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

export default cloudinary;
