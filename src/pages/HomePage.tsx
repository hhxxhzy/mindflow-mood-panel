import { useState } from 'react'
import { Send, Mic, RefreshCw, Clock } from 'lucide-react'
import { useMoodStore } from '../stores/moodStore'
import MoodInput from '../components/MoodInput'
import MoodHistory from '../components/MoodHistory'
import toast from 'react-hot-toast'

interface HomePageProps {
  onRefresh?: () => void;
}

export default function HomePage({ onRefresh }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'voice'>('text')

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh()
      toast.success('正在刷新记录...')
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          心绪看板 · MindFlow
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          记录此刻心情，AI为你提供温暖的分析与陪伴
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：心情输入 */}
        <div className="space-y-8">
          {/* 心情输入卡片 */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-100">
                  <Send className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">记录此刻心情</h2>
              </div>
              <button
                onClick={handleRefresh}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                刷新
              </button>
            </div>
            
            {/* 输入方式切换 */}
            <div className="tabs tabs-boxed bg-white/50 backdrop-blur-sm mb-6">
              <button
                className={`tab tab-lg flex-1 ${activeTab === 'text' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('text')}
              >
                <Send size={18} className="mr-2" />
                文字记录
              </button>
              <button
                className={`tab tab-lg flex-1 ${activeTab === 'voice' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('voice')}
              >
                <Mic size={18} className="mr-2" />
                语音记录
              </button>
            </div>

            {/* 输入区域 */}
            {activeTab === 'text' ? (
              <MoodInput onSuccess={onRefresh} />
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-secondary-100 to-primary-100 mb-4">
                  <Mic className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">语音记录功能</h3>
                <p className="text-gray-600 mb-6">
                  语音转文字功能正在开发中，敬请期待！
                </p>
                <button
                  onClick={() => setActiveTab('text')}
                  className="btn-primary"
                >
                  切换到文字记录
                </button>
              </div>
            )}
          </div>

          {/* 使用提示 */}
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h3 className="font-bold text-gray-800 mb-3">使用提示</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                <span>每天记录心情，AI会分析你的情绪变化模式</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 mt-1.5"></div>
                <span>点击导航栏查看详细分析和周报</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                <span>所有数据仅存储在本地，保护你的隐私</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 右侧：历史记录 */}
        <div>
          <div className="glass-card rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary-100">
                  <Clock className="w-5 h-5 text-secondary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">最近心情记录</h2>
              </div>
              <button
                onClick={handleRefresh}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                刷新
              </button>
            </div>
            
            <div className="h-[calc(100%-100px)]">
              <MoodHistory />
            </div>

            {/* 历史记录提示 */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                点击记录查看详情，或前往分析页面查看完整图表
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 功能入口提示 */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">更多功能请使用导航栏访问：</p>
        <div className="inline-flex items-center gap-6 text-sm">
          <span className="text-primary-600 font-medium">📊 数据分析</span>
          <span className="text-gray-400">•</span>
          <span className="text-secondary-600 font-medium">📋 智能周报</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 font-medium">⚙️ 个性化设置</span>
        </div>
      </div>
    </div>
  )
}