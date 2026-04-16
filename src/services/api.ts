import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证 token
    const token = localStorage.getItem('mindflow_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // 统一错误处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，跳转到登录页
          window.location.href = '/login';
          break;
        case 403:
          console.error('权限不足');
          break;
        case 404:
          console.error('资源不存在');
          break;
        case 500:
          console.error('服务器错误');
          break;
        default:
          console.error('请求失败');
      }
    } else if (error.request) {
      console.error('网络错误，请检查连接');
    } else {
      console.error('请求配置错误');
    }
    
    return Promise.reject(error);
  }
);

export interface MoodRecordRequest {
  userId: string;
  originalContent: string;
  emoji?: string;
}

export interface MoodRecordResponse {
  _id: string;
  userId: string;
  timestamp: string;
  originalContent: string;
  analysis: {
    sentiment: string;
    moodLabel: string;
    stressLevel: number;
    keyTags: string[];
    empathyReply: string;
  };
}

export interface WeeklyReport {
  week: string;
  summary: string;
  insights: string[];
  recommendations: string[];
  stats: {
    avgStress: number;
    moodDistribution: Record<string, number>;
    mostCommonTags: string[];
  };
}

// API 方法
export const moodApi = {
  // 提交心情记录
  submitMood: (data: MoodRecordRequest): Promise<MoodRecordResponse> => {
    return api.post('/record', data);
  },

  // 获取历史记录
  getHistory: (userId: string): Promise<MoodRecordResponse[]> => {
    return api.get(`/history/${userId}`);
  },

  // 获取周报
  getWeeklyReport: (userId: string, startDate: string, endDate: string): Promise<WeeklyReport> => {
    return api.get(`/weekly-report/${userId}`, {
      params: { startDate, endDate }
    });
  },

  // 获取统计数据
  getStats: (userId: string, period: 'day' | 'week' | 'month') => {
    return api.get(`/stats/${userId}`, { params: { period } });
  },

  // 语音转文字
  transcribeAudio: (audioFile: File): Promise<{ text: string }> => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    return api.post('/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // AI 分析文本
  analyzeText: (text: string): Promise<{
    sentiment: string;
    moodLabel: string;
    stressLevel: number;
    keyTags: string[];
    empathyReply: string;
  }> => {
    return api.post('/analyze', { text });
  }
};

// 模拟 API（开发环境使用）
export const mockApi = {
  submitMood: async (data: MoodRecordRequest): Promise<MoodRecordResponse> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const moods = ['开心', '平静', '期待', '感恩', '兴奋', '满足', '放松', '专注'];
    const tags = ['工作', '生活', '学习', '家庭', '朋友', '健康', '休闲', '成长'];
    const replies = [
      '感谢分享你的心情，我在这里陪伴你。',
      '每一刻的感受都值得被看见，你做得很好。',
      '情绪就像天气，有晴有雨，都是自然的。',
      '接纳自己的感受，这是自我关怀的第一步。',
    ];
    
    return {
      _id: Date.now().toString(),
      userId: data.userId,
      timestamp: new Date().toISOString(),
      originalContent: data.originalContent,
      analysis: {
        sentiment: Math.random() > 0.3 ? 'Positive' : 'Neutral',
        moodLabel: moods[Math.floor(Math.random() * moods.length)],
        stressLevel: Math.floor(Math.random() * 100),
        keyTags: [tags[Math.floor(Math.random() * tags.length)]],
        empathyReply: replies[Math.floor(Math.random() * replies.length)],
      },
    };
  },

  getHistory: async (userId: string): Promise<MoodRecordResponse[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },
};

// 根据环境选择 API
export const apiService = process.env.NODE_ENV === 'development' ? mockApi : moodApi;

export default apiService;