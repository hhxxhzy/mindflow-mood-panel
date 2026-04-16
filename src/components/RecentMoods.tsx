import React from 'react';
import { Clock, MessageCircle, Tag, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import useMoodStore from '../store/moodStore';

const RecentMoods: React.FC = () => {
  const { records, deleteRecord } = useMoodStore();

  // 格式化时间
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours}小时前`;
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
    }
  };

  // 获取情绪颜色
  const getMoodColor = (stressLevel: number) => {
    if (stressLevel <= 30) return 'text-green-500 bg-green-100 border-green-200';
    if (stressLevel <= 60) return 'text-yellow-500 bg-yellow-100 border-yellow-200';
    return 'text-red-500 bg-red-100 border-red-200';
  };

  // 获取情绪图标
  const getMoodIcon = (stressLevel: number) => {
    if (stressLevel <= 30) return <TrendingUp size={14} />;
    if (stressLevel <= 60) return <TrendingUp size={14} />;
    return <TrendingDown size={14} />;
  };

  // 最近记录（最多5条）
  const recentRecords = records.slice(0, 5);

  if (recentRecords.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
            <MessageCircle className="text-gray-400" size={24} />
          </div>
          <h3 className="font-medium text-gray-700 mb-2">暂无记录</h3>
          <p className="text-sm text-gray-500">
            开始记录你的第一份心情吧！
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold gradient-text">最近记录</h3>
        <div className="badge badge-primary badge-sm">
          共 {records.length} 条
        </div>
      </div>

      <div className="space-y-4">
        {recentRecords.map((record) => (
          <div
            key={record.id}
            className="group p-4 rounded-xl border border-gray-200 hover:border-mindflow-primary/50 hover:bg-gradient-to-r hover:from-white/50 hover:to-mindflow-primary/5 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              {/* 左侧：内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-2xl">{record.emoji || '📝'}</span>
                    <p className="font-medium text-gray-800 truncate">
                      {record.content}
                    </p>
                  </div>
                  
                  {/* 下拉菜单 */}
                  <div className="dropdown dropdown-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-xs btn-circle">
                      <MoreVertical size={16} />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 rounded-box z-[1] mt-1 w-32 p-2 shadow">
                      <li><a>编辑</a></li>
                      <li><a onClick={() => deleteRecord(record.id)} className="text-red-500">删除</a></li>
                    </ul>
                  </div>
                </div>

                {/* AI 回复 */}
                <div className="flex items-start gap-2 mb-3">
                  <MessageCircle size={14} className="text-mindflow-primary mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {record.analysis.empathyReply}
                  </p>
                </div>

                {/* 标签和时间 */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* 情绪标签 */}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm ${getMoodColor(record.analysis.stressLevel)}`}>
                    {getMoodIcon(record.analysis.stressLevel)}
                    <span>{record.analysis.moodLabel}</span>
                    <span className="font-bold ml-1">{record.analysis.stressLevel}</span>
                  </div>

                  {/* 关键词标签 */}
                  {record.analysis.keyTags.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 bg-gray-100 text-gray-700 text-sm"
                    >
                      <Tag size={12} />
                      <span>{tag}</span>
                    </div>
                  ))}

                  {/* 时间 */}
                  <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                    <Clock size={12} />
                    <span>{formatTime(record.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 查看全部按钮 */}
      {records.length > 5 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="btn btn-outline btn-sm w-full gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            查看全部记录 ({records.length})
          </button>
        </div>
      )}

      {/* 统计信息 */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-800">积极情绪</p>
              <p className="text-xl font-bold text-green-700">
                {Math.round((records.filter(r => r.analysis.sentiment === 'Positive').length / records.length) * 100)}%
              </p>
            </div>
            <TrendingUp className="text-green-600" size={20} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-800">平均压力</p>
              <p className="text-xl font-bold text-blue-700">
                {Math.round(records.reduce((sum, r) => sum + r.analysis.stressLevel, 0) / records.length)}
              </p>
            </div>
            <TrendingDown className="text-blue-600" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentMoods;