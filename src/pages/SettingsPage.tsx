import { useState } from 'react'
import { Settings, Bell, Moon, Globe, Shield, User, Palette, Download } from 'lucide-react'
import { useMoodStore } from '../stores/moodStore'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { currentUserId, setCurrentUserId } = useMoodStore()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('zh-CN')
  const [privacy, setPrivacy] = useState('friends')

  const handleExportData = () => {
    toast.success('数据导出已开始，请稍候...')
    // 这里可以添加实际的数据导出逻辑
  }

  const handleResetData = () => {
    if (window.confirm('确定要重置所有数据吗？此操作不可撤销。')) {
      toast.success('数据已重置')
      // 这里可以添加实际的数据重置逻辑
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">设置</h1>
        </div>
        <p className="text-gray-600">个性化你的心绪看板体验</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：设置分类 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 账户设置 */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary-100">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">账户设置</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  用户ID
                </label>
                <input
                  type="text"
                  value={currentUserId}
                  onChange={(e) => setCurrentUserId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="输入你的用户ID"
                />
                <p className="mt-1 text-sm text-gray-500">
                  用于区分不同用户的数据，建议使用容易记忆的ID
                </p>
              </div>

              <div className="pt-4 border-t">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Bell className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">推送通知</span>
                      <p className="text-sm text-gray-500">接收心情提醒和每周报告</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-primary-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'transform translate-x-7' : 'transform translate-x-1'}`} />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* 外观设置 */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-secondary-100">
                <Palette className="w-5 h-5 text-secondary-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">外观设置</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <Moon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">深色模式</span>
                    <p className="text-sm text-gray-500">切换到深色主题</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'transform translate-x-7' : 'transform translate-x-1'}`} />
                  </div>
                </div>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  语言设置
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="zh-CN">简体中文</option>
                  <option value="en-US">English</option>
                  <option value="ja-JP">日本語</option>
                </select>
              </div>
            </div>
          </div>

          {/* 隐私与数据 */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-red-100">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">隐私与数据</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  数据可见性
                </label>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="private">仅自己可见</option>
                  <option value="friends">好友可见</option>
                  <option value="public">公开可见</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  控制谁可以看到你的心情记录和分析
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <button
                  onClick={handleExportData}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  导出数据
                </button>
                <button
                  onClick={handleResetData}
                  className="btn-danger flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  重置数据
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：快捷操作 */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">快捷操作</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary">
                同步到云端
              </button>
              <button className="w-full btn-secondary">
                备份设置
              </button>
              <button className="w-full btn-outline">
                查看使用指南
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">系统信息</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">版本</span>
                <span className="font-medium">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">数据存储</span>
                <span className="font-medium">本地 + 云端</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最后同步</span>
                <span className="font-medium">刚刚</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">AI分析</span>
                <span className="font-medium text-green-600">正常</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h3 className="font-bold text-gray-800 mb-2">需要帮助？</h3>
            <p className="text-sm text-gray-600 mb-4">
              有任何问题或建议，欢迎联系我们
            </p>
            <button className="w-full btn-outline">
              联系支持
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}