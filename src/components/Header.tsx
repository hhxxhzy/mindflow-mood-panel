import { Cloud, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">MindFlow</h1>
              <p className="text-xs text-gray-500">心绪看板 · 情绪追踪</p>
            </div>
          </div>

          {/* 导航 */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">
              首页
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">
              分析
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">
              周报
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">
              设置
            </a>
          </nav>

          {/* 右侧操作 */}
          <div className="flex items-center gap-4">
            {/* 主题切换 */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="切换主题"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* 服务器状态 */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium">在线</span>
            </div>

            {/* 用户头像 */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center border-2 border-white shadow-sm">
              <span className="font-bold text-primary-600">U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header