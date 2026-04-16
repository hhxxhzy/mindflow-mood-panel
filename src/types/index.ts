// 心情记录类型
export interface MoodAnalysis {
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  moodLabel: string;
  stressLevel: number;
  keyTags: string[];
  empathyReply: string;
}

export interface MoodRecord {
  _id: string;
  userId: string;
  originalContent: string;
  analysis: MoodAnalysis;
  timestamp: string;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// 用户类型
export interface User {
  id: string;
  name: string;
  avatar?: string;
}

// 图表数据点
export interface ChartDataPoint {
  date: string;
  mood: number;
  stress: number;
  label: string;
}

// 周报类型
export interface WeeklyReport {
  weekStart: string;
  weekEnd: string;
  totalRecords: number;
  avgMood: number;
  avgStress: number;
  dominantMood: string;
  keyInsights: string[];
  recommendations: string[];
  aiSummary: string;
}