import axios from 'axios';
import { MoodRecord } from '../types';

const API_BASE = import.meta.env.DEV ? '/api' : 'http://8.213.221.116:8082/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 心情记录API
export const moodApi = {
  // 提交心情记录
  async submitMood(userId: string, content: string): Promise<MoodRecord> {
    try {
      const response = await api.post('/record', {
        userId,
        originalContent: content,
      });
      return response.data;
    } catch (error) {
      console.error('提交心情失败:', error);
      throw new Error('提交失败，请稍后重试');
    }
  },

  // 获取历史记录
  async getHistory(userId: string): Promise<MoodRecord[]> {
    try {
      const response = await api.get(`/history/${userId}`);
      return response.data;
    } catch (error) {
      console.error('获取历史记录失败:', error);
      throw new Error('加载历史记录失败');
    }
  },

  // 模拟周报数据（后续实现真实API）
  async getWeeklyReport(userId: string, weekStart: string) {
    // 临时模拟数据
    return {
      weekStart,
      weekEnd: new Date(new Date(weekStart).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString(),
      totalRecords: 7,
      avgMood: 75,
      avgStress: 45,
      dominantMood: '平静',
      keyInsights: [
        '本周情绪相对稳定',
        '工作日下午压力值较高',
        '周末情绪明显提升'
      ],
      recommendations: [
        '建议在工作间隙进行短暂休息',
        '尝试午间散步缓解压力',
        '周末安排一些放松活动'
      ],
      aiSummary: '本周你的情绪整体平稳，工作压力在可控范围内。继续保持良好的作息习惯，适当增加户外活动时间。'
    };
  }
};

// 健康检查
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    await axios.get(API_BASE.replace('/api', ''), { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
};

export default api;