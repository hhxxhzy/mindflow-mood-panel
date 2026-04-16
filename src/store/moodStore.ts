import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MoodEntry {
  id: string;
  mood: string;
  stressLevel: number;
  notes: string;
  timestamp: number;
}

interface MoodStore {
  history: MoodEntry[];
  addMood: (mood: MoodEntry) => void;
  loadHistory: () => Promise<void>;
  clearHistory: () => void;
}

export const useMoodStore = create<MoodStore>((set) => ({
  history: [],
  
  addMood: async (mood) => {
    set((state) => {
      const newHistory = [...state.history, mood];
      AsyncStorage.setItem('moodHistory', JSON.stringify(newHistory));
      return { history: newHistory };
    });
  },
  
  loadHistory: async () => {
    try {
      const stored = await AsyncStorage.getItem('moodHistory');
      if (stored) {
        set({ history: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Failed to load mood history:', error);
    }
  },
  
  clearHistory: async () => {
    await AsyncStorage.removeItem('moodHistory');
    set({ history: [] });
  },
}));
