import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react'
import { useMoodStore } from '../stores/moodStore'

const MoodStats = () => {
  const { getMoodStats, records } = useMoodStore()
  const stats = getMoodStats()

  if (records.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary-100">
            <Activity className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">情绪统计</h2>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center">
            <Activity className="w-8 h-8 text-primary-400" />
          </div>
          <p className="text-gray-500">暂无数据，开始记录心情吧！</p>
        </div>
      </div>
    )
  }

  const positivePercent = stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0
  const neutralPercent = stats.total > 0 ? Math.round((stats.neutral / stats.total) * 100) : 0
  const negativePercent = stats.total > 0 ? Math.round((stats.negative / stats.total) * 100) : 0

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary-100">
          <Activity className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">情绪统计</h2>
      </div>

      {/* 总体统计 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
          <div className="text-2xl font-bold text-green-700">{stats.positive}</div>
          <div className="text-sm text-green-600">积极</div>
          <TrendingUp className="w-4 h-4 mx-auto mt-2 text-green-500" />
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-2xl font-bold text-blue-700">{stats.neutral}</div>
          <div className="text-sm text-blue-600">中性</div>
          <Minus className="w-4 h-4 mx-auto mt-2 text-blue-500" />
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-red-50 to-red-100">
          <div className="text-2xl font-bold text-red-700">{stats.negative}</div>
          <div className="text-sm text-red-600">消极</div>
          <TrendingDown className="w-4 h-4 mx-auto mt-2 text-red-500" />
        </div>
      </div>

      {/* 百分比进度条 */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-green-700 font-medium">积极 {positivePercent}%</span>
            <span className="text-gray-500">{stats.positive} 条</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${positivePercent}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-blue-700 font-medium">中性 {neutralPercent}%</span>
            <span className="text-gray-500">{stats.neutral} 条</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${neutralPercent}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-red-700 font-medium">消极 {negativePercent}%</span>
            <span className="text-gray-500">{stats.negative} 条</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${negativePercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 平均压力值 */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">平均压力指数</span>
          <span className="text-lg font-bold text-primary-600">{stats.avgStress}/100</span>
        </div>
        <div className="h-3 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
            style={{ width: `${stats.avgStress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>轻松</span>
          <span>适中</span>
          <span>高压</span>
        </div>
      </div>

      {/* 统计总结 */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          {stats.total > 0 ? (
            <>
              共记录了 <span className="font-bold text-primary-600">{stats.total}</span> 条心情。
              {positivePercent > 60 ? ' 你的积极情绪占主导，继续保持！' : ''}
              {negativePercent > 40 ? ' 注意调节情绪，适当放松一下。' : ''}
              {stats.avgStress > 70 ? ' 压力值偏高，建议适当休息。' : ''}
            </>
          ) : (
            '开始记录心情，让AI帮你分析情绪变化。'
          )}
        </p>
      </div>
    </div>
  )
}

export default MoodStats