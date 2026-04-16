import React, { useState } from 'react';
import { FileText, Calendar, Download, Share2, Printer, Sparkles, TrendingUp, TrendingDown, Target, BarChart3, Clock, Users } from 'lucide-react';

const ReportPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week');
  const [isGenerating, setIsGenerating] = useState(false);

  // 模拟周报数据
  const weeklyReport = {
    period: '2026-04-08 至 2026-04-14',
    summary: '本周情绪整体稳定，积极情绪占主导。周三压力值较高，建议适当放松。周末情绪明显提升，显示休息对情绪恢复的重要性。',
    insights: [
      '工作日下午3-4点压力值较高，建议安排轻松任务',
      '晨间9-10点是情绪高峰，适合处理重要工作',
      '运动后压力值平均下降40%，效果显著',
      '周末放松时间充足，情绪恢复良好'
    ],
    recommendations: [
      '尝试午间15分钟冥想，降低下午压力',
      '增加每周3次户外活动，每次30分钟',
      '保持规律的作息时间，确保充足睡眠',
      '周末安排至少半天完全放松时间'
    ],
    stats: {
      avgStress: 32,
      positiveDays: 5,
      recordCount: 24,
      moodDistribution: {
        '开心': 35,
        '平静': 25,
        '专注': 20,
        '疲惫': 15,
        '焦虑': 5
      },
      topTags: ['工作', '学习', '家庭', '运动', '休息']
    }
  };

  // 模拟生成报告
  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // 这里可以触发实际的报告生成逻辑
    }, 2000);
  };

  // 导出报告
  const exportReport = (format: 'pdf' | 'csv' | 'json') => {
    alert(`导出 ${format.toUpperCase()} 格式报告`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* 页面标题和操作 */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">情绪分析报告</h1>
            <p className="text-gray-600">基于你的心情记录生成的深度分析与建议</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-outline gap-2">
                <Calendar size={18} />
                选择周期
              </div>
              <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 rounded-box z-[1] mt-1 w-40 p-2 shadow">
                <li><a onClick={() => setSelectedPeriod('week')}>本周报告</a></li>
                <li><a onClick={() => setSelectedPeriod('month')}>月度报告</a></li>
                <li><a onClick={() => setSelectedPeriod('quarter')}>季度报告</a></li>
              </ul>
            </div>
            
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="btn btn-primary gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  生成报告
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 报告周期选择 */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="tabs tabs-boxed bg-white/50 backdrop-blur-sm">
          <button
            className={`tab ${selectedPeriod === 'week' ? 'tab-active' : ''}`}
            onClick={() => setSelectedPeriod('week')}
          >
            本周
          </button>
          <button
            className={`tab ${selectedPeriod === 'month' ? 'tab-active' : ''}`}
            onClick={() => setSelectedPeriod('month')}
          >
            本月
          </button>
          <button
            className={`tab ${selectedPeriod === 'quarter' ? 'tab-active' : ''}`}
            onClick={() => setSelectedPeriod('quarter')}
          >
            本季度
          </button>
        </div>
      </div>

      {/* 报告卡片 */}
      <div className="glass-card rounded-2xl p-8 mb-8">
        {/* 报告头部 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-mindflow-primary/20 to-mindflow-secondary/20">
              <FileText className="text-mindflow-primary" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold gradient-text">情绪分析周报</h2>
              <p className="text-gray-600">{weeklyReport.period}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => exportReport('pdf')}
              className="btn btn-outline btn-sm gap-2"
            >
              <Download size={16} />
              PDF
            </button>
            <button
              onClick={() => exportReport('csv')}
              className="btn btn-outline btn-sm gap-2"
            >
              <Download size={16} />
              CSV
            </button>
            <button className="btn btn-outline btn-sm gap-2">
              <Share2 size={16} />
              分享
            </button>
            <button className="btn btn-outline btn-sm gap-2">
              <Printer size={16} />
              打印
            </button>
          </div>
        </div>

        {/* 报告摘要 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold gradient-text mb-4 flex items-center gap-2">
            <Sparkles size={20} />
            本周摘要
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed">{weeklyReport.summary}</p>
          </div>
        </div>

        {/* 关键指标 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold gradient-text mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            关键指标
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">平均压力</span>
                <TrendingDown size={16} className="text-green-500" />
              </div>
              <p className="text-2xl font-bold gradient-text">{weeklyReport.stats.avgStress}</p>
              <p className="text-xs text-gray-500">较上周 ↓ 12%</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">积极天数</span>
                <TrendingUp size={16} className="text-green-500" />
              </div>
              <p className="text-2xl font-bold gradient-text">{weeklyReport.stats.positiveDays}/7</p>
              <p className="text-xs text-gray-500">71% 积极率</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">记录总数</span>
                <Clock size={16} className="text-blue-500" />
              </div>
              <p className="text-2xl font-bold gradient-text">{weeklyReport.stats.recordCount}</p>
              <p className="text-xs text-gray-500">日均 3.4 次</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">情绪稳定性</span>
                <Target size={16} className="text-purple-500" />
              </div>
              <p className="text-2xl font-bold gradient-text">85%</p>
              <p className="text-xs text-gray-500">波动较小</p>
            </div>
          </div>
        </div>

        {/* 洞察与建议 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* 深度洞察 */}
          <div>
            <h3 className="text-lg font-bold gradient-text mb-4 flex items-center gap-2">
              <Sparkles size={20} />
              AI 深度洞察
            </h3>
            <div className="space-y-4">
              {weeklyReport.insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200"
                >
                  <div className="p-2 rounded-full bg-blue-100">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 个性化建议 */}
          <div>
            <h3 className="text-lg font-bold gradient-text mb-4 flex items-center gap-2">
              <Target size={20} />
              个性化建议
            </h3>
            <div className="space-y-4">
              {weeklyReport.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200"
                >
                  <div className="p-2 rounded-full bg-green-100">
                    <Target size={16} className="text-green-600" />
                  </div>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 情绪分布 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold gradient-text mb-4">情绪分布</h3>
          <div className="space-y-4">
            {Object.entries(weeklyReport.stats.moodDistribution).map(([mood, percentage]) => (
              <div key={mood} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-mindflow-primary to-mindflow-secondary"></div>
                  <span className="font-medium">{mood}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-48 bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-mindflow-primary to-mindflow-secondary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="font-bold w-12 text-right">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 高频关键词 */}
        <div>
          <h3 className="text-lg font-bold gradient-text mb-4">高频关键词</h3>
          <div className="flex flex-wrap gap-3">
            {weeklyReport.stats.topTags.map((tag, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-mindflow-primary/10 to-mindflow-secondary/10 border border-mindflow-primary/20 rounded-full text-mindflow-primary font-medium"
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 报告说明 */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-gray-200 to-gray-300">
            <FileText className="text-gray-600" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">关于情绪分析报告</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 报告基于你的心情记录数据生成，每周日晚自动更新</li>
              <li>• AI 分析你的情绪模式、压力变化和关键词趋势</li>
              <li>• 所有建议均为个性化推荐，可根据实际情况调整</li>
              <li>• 数据完全加密存储，仅用于个人情绪分析</li>
              <li>• 如需专业心理咨询建议，请咨询专业心理医生</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;