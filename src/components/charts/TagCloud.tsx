import React from 'react';
import { Hash, TrendingUp, TrendingDown } from 'lucide-react';

interface TagCloudProps {
  tags: Array<{
    tag: string;
    count: number;
  }>;
}

const TagCloud: React.FC<TagCloudProps> = ({ tags }) => {
  // 计算字体大小范围
  const maxCount = Math.max(...tags.map(t => t.count));
  const minCount = Math.min(...tags.map(t => t.count));
  
  // 颜色梯度
  const colors = [
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-green-100 text-green-800 border-green-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-yellow-100 text-yellow-800 border-yellow-200',
    'bg-pink-100 text-pink-800 border-pink-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
    'bg-teal-100 text-teal-800 border-teal-200',
    'bg-orange-100 text-orange-800 border-orange-200',
  ];

  // 计算字体大小
  const getFontSize = (count: number) => {
    const minSize = 0.75; // rem
    const maxSize = 1.5; // rem
    const range = maxCount - minCount;
    
    if (range === 0) return `${maxSize}rem`;
    
    const size = minSize + ((count - minCount) / range) * (maxSize - minSize);
    return `${size}rem`;
  };

  // 获取颜色类
  const getColorClass = (index: number) => {
    return colors[index % colors.length];
  };

  // 获取趋势图标
  const getTrendIcon = (tag: string) => {
    const trends: Record<string, { icon: React.ReactNode; color: string }> = {
      '工作': { icon: <TrendingUp size={12} />, color: 'text-green-500' },
      '学习': { icon: <TrendingUp size={12} />, color: 'text-blue-500' },
      '压力': { icon: <TrendingDown size={12} />, color: 'text-red-500' },
      '休息': { icon: <TrendingUp size={12} />, color: 'text-green-500' },
      '运动': { icon: <TrendingUp size={12} />, color: 'text-green-500' },
      '家庭': { icon: <TrendingUp size={12} />, color: 'text-purple-500' },
      '朋友': { icon: <TrendingUp size={12} />, color: 'text-yellow-500' },
      '健康': { icon: <TrendingUp size={12} />, color: 'text-teal-500' },
    };
    
    return trends[tag] || { icon: null, color: 'text-gray-500' };
  };

  return (
    <div className="space-y-6">
      {/* 标签云 */}
      <div className="flex flex-wrap gap-3 justify-center">
        {tags.map((item, index) => {
          const trend = getTrendIcon(item.tag);
          return (
            <div
              key={index}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-md ${getColorClass(index)}`}
              style={{ fontSize: getFontSize(item.count) }}
            >
              <Hash size={14} />
              <span className="font-medium">{item.tag}</span>
              <span className="text-xs font-bold bg-white/50 px-2 py-0.5 rounded-full">
                {item.count}
              </span>
              {trend.icon && <span className={trend.color}>{trend.icon}</span>}
            </div>
          );
        })}
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">最常出现</span>
            <div className="badge badge-primary badge-sm">高频</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center">
              <Hash size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold">{tags[0]?.tag || '工作'}</p>
              <p className="text-xs text-gray-500">{tags[0]?.count || 0} 次出现</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">本周趋势</span>
            <div className="badge badge-success badge-sm">↑ 增长</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h 8 rounded-full bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center">
              <TrendingUp size={16} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold">积极标签 +18%</p>
              <p className="text-xs text-gray-500">较上周增长</p>
            </div>
          </div>
        </div>
      </div>

      {/* 标签分析 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-blue-500 mt-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-800 mb-1">AI 标签洞察</p>
            <p className="text-sm text-blue-700">
              你的高频关键词显示工作与学习占主导，建议适当增加「休息」和「运动」相关的记录，保持生活平衡。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagCloud;