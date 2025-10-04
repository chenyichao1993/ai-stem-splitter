// GaudioLab API 客户端
const axios = require('axios');

class GaudioLabClient {
  constructor() {
    this.apiKey = process.env.GAUDIOLAB_API_KEY;
    this.baseURL = 'https://api.gaudiolab.com/v1';
  }

  // 上传音频文件
  async uploadAudio(audioBuffer, fileName) {
    try {
      console.log('📤 上传音频文件到 GaudioLab...');
      
      const FormData = require('form-data');
      const formData = new FormData();
      formData.append('file', audioBuffer, {
        filename: fileName,
        contentType: 'audio/wav'
      });
      
      const response = await axios.post(`${this.baseURL}/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          ...formData.getHeaders()
        },
        timeout: 30000 // 30秒超时
      });
      
      console.log('✅ GaudioLab 上传成功:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ GaudioLab 上传失败:', error.response?.data || error.message);
      throw new Error(`GaudioLab upload failed: ${error.response?.data?.message || error.message}`);
    }
  }

  // 启动音乐分离
  async startMusicSeparation(uploadId, options = {}) {
    try {
      console.log('🎵 启动 GaudioLab 音乐分离...');
      
      const response = await axios.post(`${this.baseURL}/separate/music`, {
        upload_id: uploadId,
        model: options.model || 'gsep_music_hq_v1',
        stems: options.stems || ['vocals', 'drums', 'bass', 'guitar', 'piano']
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });
      
      console.log('✅ GaudioLab 分离任务启动:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ GaudioLab 分离启动失败:', error.response?.data || error.message);
      throw new Error(`GaudioLab separation failed: ${error.response?.data?.message || error.message}`);
    }
  }

  // 检查处理状态
  async getStatus(jobId) {
    try {
      const response = await axios.get(`${this.baseURL}/status/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        timeout: 10000
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ GaudioLab 状态检查失败:', error.response?.data || error.message);
      throw new Error(`GaudioLab status check failed: ${error.response?.data?.message || error.message}`);
    }
  }

  // 下载分离结果
  async downloadStem(jobId, stemType) {
    try {
      console.log(`📥 下载 ${stemType} 音轨...`);
      
      const response = await axios.get(`${this.baseURL}/download/${jobId}/${stemType}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        responseType: 'arraybuffer',
        timeout: 60000 // 60秒超时
      });
      
      console.log(`✅ ${stemType} 音轨下载成功，大小: ${response.data.length} bytes`);
      return response.data;
    } catch (error) {
      console.error(`❌ ${stemType} 音轨下载失败:`, error.response?.data || error.message);
      throw new Error(`GaudioLab download failed for ${stemType}: ${error.response?.data?.message || error.message}`);
    }
  }

  // 获取可用的分离模型
  async getAvailableModels() {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ 获取模型列表失败:', error.response?.data || error.message);
      throw new Error(`Failed to get models: ${error.response?.data?.message || error.message}`);
    }
  }
}

module.exports = GaudioLabClient;
