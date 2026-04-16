import { create } from 'zustand';

export interface MoodRecord {
  id: string;
  userId: string;
  timestamp: Date;
  content: string;
  emoji?: string;
  analysis: {
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    moodLabel: string;
    stressLevel: number; // 0-100
    keyTags: string[];
    empathyReply: string;
  };
}

interface MoodStore {
  // 状态
  records: MoodRecord[];
  isLoading: boolean;
  selectedDate: Date;
  weeklyReport: any | null;
  
  // 操作
  addRecord: (record: Omit<MoodRecord, 'id' | 'timestamp'>) => Promise<void>;
  updateRecord: (id: string, updates: Partial<MoodRecord>) => void;
  deleteRecord: (id: string) => void;
  loadRecords: (userId: string) => Promise<void>;
  setSelectedDate: (date: Date) => void;
  generateWeeklyReport: () => Promise<void>;
  
  // 计算属性
  getTodayMoods: () => MoodRecord[];
  getWeeklyStats: () => {
    avgStress: number;
    moodDistribution: Record<string, number>;
    mostCommonTags: string[];
  };
}

// 模拟数据
const mockRecords: MoodRecord[] = [
  {
    id: '1',
    userId: 'user123',
    timestamp: new Date('2026-04-14T09:30:00'),
    content: '早上醒来感觉精力充沛，期待今天的工作',
    emoji: '😊',
    analysis: {
      sentiment: 'Positive',
      moodLabel: '充满活力',
      stressLevel: 15,
      keyTags: ['早晨', '工作', '期待'],
      empathyReply: '为新的一天充满活力而高兴！继续保持这份积极能量。'
    }
  },
  {
    id: '2',
    userId: 'user123',
    timestamp: new Date('2026-04-14T13:45:00'),
    content: '午饭后有点困，需要一杯咖啡',
    emoji: '☕',
    analysis: {
      sentiment: 'Neutral',
      moodLabel: '午后困倦',
      stressLevel: 25,
      keyTags: ['午餐', '休息', '咖啡'],
      empathyReply: '午后小困是正常的，适当休息一下会更好。'
    }
  },
  {
    id: '3',
    userId: 'user123',
    timestamp: new Date('2026-04-13T18:20:00'),
    content: '完成了重要项目，很有成就感',
    emoji: '🎉',
    analysis: {
      sentiment: 'Positive',
      moodLabel: '成就感',
      stressLevel: 10,
      keyTags: ['工作', '成就', '项目'],
      empathyReply: '为你完成重要项目感到骄傲！这是努力的成果。'
    }
  },
  {
    id: '4',
    userId: 'user123',
    timestamp: new Date('2026-04-12T22:10:00'),
    content: '今天有点小压力，需要放松一下',
    emoji: '😌',
    analysis: {
      sentiment: 'Neutral',
      moodLabel: '轻度压力',
      stressLevel: 45,
      keyTags: ['压力', '放松', '自我关怀'],
      empathyReply: '感受到你的压力，记得给自己一些放松的时间。'
    }
  }
];

const useMoodStore = create<MoodStore>((set, get) => ({
  // 初始状态
  records: mockRecords,
  isLoading: false,
  selectedDate: new Date(),
  weeklyReport: null,

  // 添加记录
  addRecord: async (recordData) => {
    set({ isLoading: true });
    
    // 模拟 API 调用延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newRecord: MoodRecord = {
      ...recordData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    set(state => ({
      records: [newRecord, ...state.records],
      isLoading: false
    }));
  },

  // 更新记录
  updateRecord: (id, updates) => {
    set(state => ({
      records: state.records.map(record =>
        record.id === id ? { ...record, ...updates } : record
      )
    }));
  },

  // 删除记录
  deleteRecord: (id) => {
    set(state => ({
      records: state.records.filter(record => record.id !== id)
    }));
  },

  // 加载记录
  loadRecords: async (userId) => {
    set({ isLoading: true });
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ isLoading: false });
  },

  // 设置选中日期
  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },

  // 生成周报
  generateWeeklyReport: async () => {
    set({ isLoading: true });
    // 模拟 AI 生成周报
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const stats = get().getWeeklyStats();
    const report = {
      week: '2026-04-08 至 2026-04-14',
      summary: '本周情绪整体稳定，积极情绪占主导。周三压力值较高，建议适当放松。',
      insights: [
        '工作日下午3-4点压力值较高',
        '晨间情绪最积极',
        '周末放松时间充足'
      ],
      recommendations: [
        '尝试午间15分钟冥想',
        '增加户外活动时间',
        '保持规律的作息'
      ],
      stats
    };
    
    set({ weeklyReport: report, isLoading: false });
  },

  // 获取今日心情
  getTodayMoods: () => {
    const today = new Date().toDateString();
    return get().records.filter(record =>
      new Date(record.timestamp).toDateString() === today
    );
  },

  // 获取周统计
  getWeeklyStats: () => {
    const records = get().records;
    const avgStress = records.reduce((sum, record) => sum + record.analysis.stressLevel, 0) / records.length;
    
    const moodDistribution: Record<string, number> = {};
    records.forEach(record => {
      moodDistribution[record.analysis.moodLabel] = (moodDistribution[record.analysis.moodLabel] || 0) + 1;
    });
    
    const tagCounts: Record<string, number> = {};
    records.forEach(record => {
      record.analysis.keyTags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    const mostCommonTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tag]) => tag);
    
    return {
      avgStress: Math.round(avgStress),
      moodDistribution,
      mostCommonTags
    };
  }
}));

export default useMoodStore;