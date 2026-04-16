import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Brain, BarChart3, Calendar, User, Home, Settings, FileText } from 'lucide-react'
import { useMoodStore } from './stores/moodStore'
import { moodApi } from './lib/api'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import ReportPage from './pages/ReportPage'
import SettingsPage from './pages/SettingsPage'
import toast from 'react-hot-toast'

// 导航组件
function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/dashboard', label: '分析', icon: BarChart3 },
    { path: '/reports', label: '周报', icon: FileText },
    { path: '/settings', label: '设置', icon: Settings },
  ]

  return (
    <nav className="glass-card rounded-2xl p-4 mb-8">
      <div className="flex flex-wrap gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

// 主应用组件
function AppContent() {
  const { currentUserId, setRecords, setLoading, setError } = useMoodStore()

  // 加载历史记录
  const loadHistory = async () => {
    setLoading(true)
    try {
      const records = await moodApi.getHistory(currentUserId)
      setRecords(records)
      toast.success('历史记录加载成功')
    } catch (error) {
      setError(error instanceof Error ? error.message : '加载失败')
      toast.error('加载历史记录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* 头部 */}
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 导航 */}
        <Navigation />

        {/* 页面内容 */}
        <Routes>
          <Route path="/" element={<HomePage onRefresh={loadHistory} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>

      {/* 页脚 */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>心绪看板 · MindFlow · 版本 1.0 · 情绪追踪与治愈空间</p>
          <p className="mt-2">服务器状态: <span className="text-green-600 font-medium">✅ 正常</span></p>
        </div>
      </footer>
    </div>
  )
}

// 包装路由
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App