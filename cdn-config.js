// CDN和缓存配置文件
// 用于优化静态资源加载和缓存策略

const cdnConfig = {
  // Cloudflare配置
  cloudflare: {
    // 缓存规则
    cacheRules: {
      // 静态资源 - 1年
      static: {
        pattern: '/_next/static/*',
        ttl: 31536000, // 1年
        browserTTL: 31536000,
        edgeTTL: 31536000
      },
      // 图片 - 1个月
      images: {
        pattern: '/_next/image/*',
        ttl: 2592000, // 1个月
        browserTTL: 2592000,
        edgeTTL: 2592000
      },
      // API - 5分钟
      api: {
        pattern: '/api/*',
        ttl: 300, // 5分钟
        browserTTL: 300,
        edgeTTL: 300
      },
      // 音频文件 - 1天
      audio: {
        pattern: '/audio/*',
        ttl: 86400, // 1天
        browserTTL: 86400,
        edgeTTL: 86400
      },
      // 页面 - 1小时
      pages: {
        pattern: '/*',
        ttl: 3600, // 1小时
        browserTTL: 3600,
        edgeTTL: 3600
      }
    },
    
    // 压缩设置
    compression: {
      gzip: true,
      brotli: true,
      minify: {
        html: true,
        css: true,
        js: true
      }
    },
    
    // 安全设置
    security: {
      ssl: 'flexible',
      hsts: true,
      minTlsVersion: '1.2'
    }
  },
  
  // 资源优化
  optimization: {
    // 图片优化
    images: {
      format: 'webp',
      quality: 85,
      progressive: true,
      lazy: true
    },
    
    // 字体优化
    fonts: {
      preload: true,
      display: 'swap',
      fallback: 'system-ui'
    },
    
    // 脚本优化
    scripts: {
      defer: true,
      async: true,
      minify: true
    }
  },
  
  // 监控配置
  monitoring: {
    // 性能监控
    performance: {
      enabled: true,
      sampleRate: 0.1
    },
    
    // 错误监控
    errors: {
      enabled: true,
      sampleRate: 1.0
    }
  }
};

module.exports = cdnConfig;
