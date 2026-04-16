import { useState } from 'react'
import { Send, Mic, Smile, Frown, Meh } from 'lucide-react'
import { useMoodStore } from '../stores/moodStore'
import { moodApi } from '../lib/api'
import toast from 'react-hot-toast'

interface MoodInputProps {
  onSuccess: () => void
}

const MoodInput = ({ onSuccess }: MoodInputProps) => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const { currentUserId, addRecord } = useMoodStore()

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('请输入心情内容')
      return
    }

    setIsSubmitting(true)
    try {
      const newRecord = await moodApi.submitMood(currentUserId, content)
      addRecord(newRecord)
      setContent('')
      toast.success('心情记录已保存！')
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '提交失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const quickEmotions = [
    { icon: Smile, label: '开心', text: '今天心情很好！' },
    { icon: Meh, label: '平静', text: '今天一切正常。' },
    { icon: Frown, label: '低落', text: '今天感觉有点累。' },
  ]

  return (
    <div className="space-y-6">
      {/* 快速情绪选择 */}
      <div>
        <p className="text-sm text-gray-600 mb-3">快速选择情绪：</p>
        <div className="flex flex-wrap gap-2">
          {quickEmotions.map((emotion) => (
            <button
              key={emotion.label}
              onClick={() => setContent(emotion.text)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition"
            >
              <emotion.icon className="w-4 h-4" />
              <span className="text-sm">{emotion.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 文本输入区域 */}
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="写下你此刻的心情、想法或感受..."
          className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 outline-none transition resize-none text-gray-700 placeholder-gray-400"
          disabled={isSubmitting}
        />
        <div className="absolute bottom-4 right-4 text-sm text-gray-400">
          {content.length}/500
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* 语音输入按钮 */}
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-3 rounded-full transition ${
              isRecording
                ? 'bg-red-100 text-red-600 animate-pulse'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            disabled={isSubmitting}
            aria-label={isRecording ? '停止录音' : '开始录音'}
          >
            <Mic className="w-5 h-5" />
          </button>
          {isRecording && (
            <div className="text-sm text-red-600 font-medium">
              录音中... 3秒后自动结束
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setContent('')}
            className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition"
            disabled={isSubmitting || !content}
          >
            清空
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                分析中...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                提交分析
              </>
            )}
          </button>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-md bg-blue-100">
            <Smile className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-800">AI分析提示</p>
            <p className="text-sm text-blue-600 mt-1">
              提交后，AI将分析你的情绪倾向、压力值，并给出暖心回复。支持中英文输入。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoodInput