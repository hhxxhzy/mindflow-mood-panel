import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Smile, Frown, Meh } from 'lucide-react';

const MoodCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // 生成日历数据
  const generateCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 获取当月第一天和最后一天
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // 获取第一天是星期几（0=周日，6=周六）
    const firstDayOfWeek = firstDay.getDay();
    
    // 生成日期数组
    const daysInMonth = lastDay.getDate();
    const days = [];
    
    // 添加上个月的日期（用于填充）
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        mood: null,
      });
    }
    
    // 添加当月日期
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      // 模拟心情数据
      const moods = ['happy', 'neutral', 'sad', null];
      const mood = Math.random() > 0.3 ? moods[Math.floor(Math.random() * 3)] : null;
      
      days.push({
        date,
        isCurrentMonth: true,
        mood,
      });
    }
    
    // 添加下个月的日期（用于填充）
    const totalCells = 42; // 6行 x 7列
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        mood: null,
      });
    }
    
    return days;
  };

  // 获取心情图标
  const getMoodIcon = (mood: string | null) => {
    switch (mood) {
      case 'happy':
        return <Smile size={16} className="text-green-500" />;
      case 'neutral':
        return <Meh size={16} className="text-yellow-500" />;
      case 'sad':
        return <Frown size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  // 获取心情颜色
  const getMoodColor = (mood: string | null) => {
    switch (mood) {
      case 'happy':
        return 'bg-green-100 border-green-200';
      case 'neutral':
        return 'bg-yellow-100 border-yellow-200';
      case 'sad':
        return 'bg-red-100 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  // 月份导航
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // 星期标题
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  const calendarData = generateCalendarData();
  const monthName = currentDate.toLocaleDateString('zh-CN', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-4">
      {/* 日历头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="text-mindflow-primary" size={20} />
          <h3 className="font-bold text-lg">{monthName}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="btn btn-sm btn-ghost btn-circle"
            aria-label="上个月"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goToToday}
            className="btn btn-sm btn-primary"
          >
            今天
          </button>
          <button
            onClick={goToNextMonth}
            className="btn btn-sm btn-ghost btn-circle"
            aria-label="下个月"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 星期标题 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日历网格 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarData.map((day, index) => {
          const isToday = day.date.toDateString() === new Date().toDateString();
          
          return (
            <div
              key={index}
              className={`min-h-16 p-2 rounded-lg border transition-all duration-200 ${
                day.isCurrentMonth
                  ? getMoodColor(day.mood)
                  : 'bg-gray-50/50 border-gray-100'
              } ${
                isToday
                  ? 'ring-2 ring-mindflow-primary ring-offset-1'
                  : ''
              }`}
            >
              <div className="flex flex-col h-full">
                {/* 日期 */}
                <div className={`text-sm font-medium mb-1 ${
                  day.isCurrentMonth
                    ? isToday
                      ? 'text-mindflow-primary'
                      : 'text-gray-700'
                    : 'text-gray-400'
                }`}>
                  {day.date.getDate()}
                </div>
                
                {/* 心情图标 */}
                <div className="flex-1 flex items-center justify-center">
                  {day.mood && getMoodIcon(day.mood)}
                </div>
                
                {/* 提示信息 */}
                {day.mood && (
                  <div className="text-xs text-gray-500 text-center truncate">
                    {day.mood === 'happy' && '开心'}
                    {day.mood === 'neutral' && '平静'}
                    {day.mood === 'sad' && '难过'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 图例 */}
      <div className="flex flex-wrap gap-4 justify-center pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">开心</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm text-gray-600">平静</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-600">难过</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <span className="text-sm text-gray-600">无记录</span>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">本月记录统计</p>
            <p className="text-2xl font-bold gradient-text">18 天</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">积极天数</p>
            <p className="text-xl font-bold text-green-600">12 天</p>
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
            style={{ width: '67%' }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          本月有 67% 的时间处于积极情绪状态，继续保持！
        </p>
      </div>
    </div>
  );
};

export default MoodCalendar;