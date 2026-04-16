import { create } from 'zustand';
import { MoodRecord } from '../types';

interface MoodStore {
  // 状态
  records: MoodRecord[];
  isLoading: boolean;
  error: string | null;
  currentUserId: string;
  
  // 操作
  setRecords: (records: MoodRecord[]) => void;
  addRecord: (record: MoodRecord) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUserId: (userId: string) => void;
  
  // 计算属性
  getRecentRecords: () => MoodRecord[];
  getMoodStats: () => {
    total: number;
    positive: number;
    neutral: number;
    negative: number;
    avgStress: number;
  };
}

export const useMoodStore = create<MoodStore>((set, get) => ({
  // 初始状态
  records: [],
  isLoading: false,
  error: null,
  currentUserId: 'user_001',
  
  // 操作
  setRecords: (records) => set({ records }),
  
  addRecord: (record) => 
    set((state) => ({ 
      records: [record, ...state.records] 
    })),
    
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setUserId: (userId) => set({ currentUserId: userId }),
  
  // 计算属性
  getRecentRecords: () => {
    const { records } = get();
    return records.slice(0, 10);
  },
  
  getMoodStats: () => {
    const { records } = get();
    const total = records.length;
    const positive = records.filter(r => r.analysis.sentiment === 'Positive').length;
    const neutral = records.filter(r => r.analysis.sentiment === 'Neutral').length;
    const negative = records.filter(r => r.analysis.sentiment === 'Negative').length;
    const avgStress = records.length > 0 
      ? Math.round(records.reduce((sum, r) => sum + r.analysis.stressLevel, 0) / records.length)
      : 0;
      
    return {
      total,
      positive,
      neutral,
      negative,
      avgStress
    };
  }
}));