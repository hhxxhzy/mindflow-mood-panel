import { Calendar, Clock, Tag, MessageSquare } from 'lucide-react'
import { useMoodStore } from '../stores/moodStore'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const MoodHistory = () => {
  const { records, isLoading } = useMoodStore()

  const getMoodColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Negative':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getStressColor = (level: number) => {
    if (level < 30) return 'text-green-600'
    if (level < 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">加载历史记录中...</p>
      </div>
    )
  }

  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center">
          <MessageSquare className="w-10 h-10 text-primary-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">暂无记录</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          开始记录你的心情吧！AI会分析你的情绪变化，帮你更好地了解自己。
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
      {records.map((record) => (
        <div
          key={record._id}
          className="glass-card rounded-xl p-5 hover:shadow-lg transition-shadow"
        >
          {/* 头部信息 */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-50">
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {format(new Date(record.timestamp), 'MM月dd日 HH:mm', {
                      locale: zhCN,
                    })}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getMoodColor(
                      record.analysis.sentiment
                    )}`}
                  >
                    {record.analysis.moodLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {format(new Date(record.timestamp), 'EEEE', {
                      locale: zhCN,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">
                <span className={getStressColor(record.analysis.stressLevel)}>
                  {record.analysis.stressLevel}
                </span>
                <span className="text-sm text-gray-500">/100</span>
              </div>
              <div className="text-xs text-gray-500">压力指数</div>
            </div>
          </div>

          {/* 心情内容 */}
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {record.originalContent}
            </p>
          </div>

          {/* 分析结果 */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            {/* 关键标签 */}
            {record.analysis.keyTags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-1.5">
                  {record.analysis.keyTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI回复 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-primary-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 mb-1">AI暖心回复</p>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {record.analysis.empathyReply}
                </p>
              </div>
            </div>
          </div>

          {/* 情感倾向指示器 */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">情感倾向</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      record.analysis.sentiment === 'Positive'
                        ? 'bg-green-500'
                        : record.analysis.sentiment === 'Negative'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                    style={{
                      width:
                        record.analysis.sentiment === 'Positive'
                          ? '80%'
                          : record.analysis.sentiment === 'Negative'
                          ? '60%'
                          : '70%',
                    }}
                  ></div>
                </div>
                <span className="font-medium text-gray-700">
                  {record.analysis.sentiment === 'Positive'
                    ? '积极'
                    : record.analysis.sentiment === 'Negative'
                    ? '消极'
                    : '中性'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoodHistory