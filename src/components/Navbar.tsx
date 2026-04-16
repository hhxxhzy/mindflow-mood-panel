import React from 'react';
import { Brain, BarChart3, FileText, User, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl gap-2">
            <Brain className="text-mindflow-primary" />
            <span className="gradient-text font-bold">MindFlow</span>
            <span className="text-sm text-gray-500 hidden md:inline">心绪看板</span>
          </a>
        </div>
        
        <div className="flex-none gap-4">
          {/* 桌面端导航 */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="/" className="flex items-center gap-2 hover:text-mindflow-primary transition-colors">
              <BarChart3 size={18} />
              <span>情绪看板</span>
            </a>
            <a href="/dashboard" className="flex items-center gap-2 hover:text-mindflow-primary transition-colors">
              <BarChart3 size={18} />
              <span>数据分析</span>
            </a>
            <a href="/reports" className="flex items-center gap-2 hover:text-mindflow-primary transition-colors">
              <FileText size={18} />
              <span>周报</span>
            </a>
            
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mindflow-primary to-mindflow-secondary flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a>个人资料</a></li>
                <li><a>设置</a></li>
                <li><a className="text-red-500">退出登录</a></li>
              </ul>
            </div>
          </div>
          
          {/* 移动端菜单按钮 */}
          <div className="lg:hidden dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a href="/">情绪看板</a></li>
              <li><a href="/dashboard">数据分析</a></li>
              <li><a href="/reports">周报</a></li>
              <li className="divider"></li>
              <li><a>个人资料</a></li>
              <li><a>设置</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;