import React from 'react';
import { TrendingUp, TrendingDown, Activity, Target, Calendar, Filter } from 'lucide-react';
import EmotionChart from '../components/charts/EmotionChart';
import StressTimeline from '../components/charts/StressTimeline';
import TagCloud from '../components/charts/TagCloud';
import MoodCalendar from '../components/MoodCalendar';

const DashboardPage: React.FC = () => {
  // 模拟数据
  const weeklyData = [
    { day: '周一', stress: 30, mood: 8 },
    { day: '周二', stress: 45, mood: 7 },
    { day: '周三', stress: 60, mood: 6 },
    { day: '周四', stress: 35, mood: 8 },
    { day: '周五', stress: 25, mood: 9 },
    { day: '周六', stress: 20, mood: 9 },
    { day: '周日', stress: 15, mood: 9 },
  ];

  const moodDistribution = [
    { name: '开心', value: 35, color: '#48bb78' },
    { name: '平静', value: 25, color: '#4299e1' },
    { name: '专注', value: 20, color: '#9f7aea' },
    { name: '疲惫', value: 15, color: '#ed8936' },
    { name: '焦虑', value: 5, color: '#f56565' },
  ];

  const topTags = [
    { tag: '工作', count: 12 },
    { tag: '学习', count: 8 },
    { tag: '家庭', count: 6 },
    { tag: '运动', count: 5 },
    { tag: '休息', count: 4 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">情绪数据分析看板</h1>
        <p className="text-gray-600">基于你的心情记录，AI 生成的情绪趋势与深度洞察</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">本周平均压力</p>
              <p className="text-3xl font-bold gradient-text">32</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown size={16} className="text-green-500" />
                <span className="text-sm text-green-500">↓ 12%</span>
                <span className="text-sm text-gray-500 ml-2">较上周</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-green-100 to-green-50">
              <Activity className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">积极情绪占比</p>
              <p className="text-3xl font-bold gradient-text">78%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-sm text-green-500">↑ 8%</span>
                <span className="text-sm text-gray-500 ml-2">较上周</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-50">
              <Target className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">本周记录数</p>
              <p className="text-3xl font-bold gradient-text">24</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-sm text-gray-500">日均 3.4 次</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-100 to-purple-50">
              <Calendar className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">最佳记录时段</p>
              <p className="text-3xl font-bold gradient-text">09:00</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-sm text-gray-500">早晨情绪最积极</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-pink-100 to-pink-50">
              <Filter className="text-pink-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* 情绪趋势图 */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold gradient-text">情绪趋势变化</h3>
              <p className="text-sm text-gray-500">过去7天的情绪波动</p>
            </div>
            <select className="select select-bordered select-sm">
              <option>过去7天</option>
              <option>过去30天</option>
              <option>过去90天</option>
            </select>
          </div>
          <EmotionChart data={weeklyData} />
        </div>

        {/* 压力时间线 */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold gradient-text">压力水平时间线</h3>
              <p className="text-sm text-gray-500">每日压力值变化</p>
            </div>
            <div className="badge badge-primary">实时更新</div>
          </div>
          <StressTimeline data={weeklyData} />
        </div>
      </div>

      {/* 第二行图表 */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* 情绪分布 */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold gradient-text mb-6">情绪分布</h3>
          <div className="space-y-4">
            {moodDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 标签云 */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold gradient-text mb-6">高频关键词</h3>
          <TagCloud tags={topTags} />
        </div>

        {/* 情绪日历 */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold gradient-text">情绪日历</h3>
            <button className="btn btn-sm btn-ghost">查看详情</button>
          </div>
          <MoodCalendar />
        </div>
      </div>

      {/* AI 洞察 */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-mindflow-primary/20 to-mindflow-secondary/20">
            <Activity className="text-mindflow-primary" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold gradient-text mb-4">AI 深度洞察</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2">📈 积极发现</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• 周末情绪明显优于工作日</li>
                  <li>• 早晨9-10点是情绪高峰时段</li>
                  <li>• 运动后压力值平均下降40%</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 优化建议</h4>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• 周三下午压力较高，建议安排轻松工作</li>
                  <li>• 增加午间休息时间，提升下午效率</li>
                  <li>• 尝试晚间冥想，改善睡眠质量</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 数据导出 */}
      <div className="flex justify-end">
        <button className="btn btn-outline gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          导出数据报告
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;