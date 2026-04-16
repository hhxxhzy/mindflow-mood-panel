export interface MoodEntry {
  id: string;
  mood: 'happy' | 'neutral' | 'sad' | 'angry' | 'anxious';
  stressLevel: number; // 1-10
  notes: string;
  timestamp: number;
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  email?: string;
}

export interface AppState {
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  language: 'zh' | 'en';
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}
