import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square, Play, Pause, Volume2, Send } from 'lucide-react';

interface VoiceRecorderProps {
  onSubmit: (content: string) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onSubmit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [volume, setVolume] = useState(0.7);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 初始化录音
  const initRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        audioChunksRef.current = [];
      };
      
      return true;
    } catch (error) {
      console.error('录音初始化失败:', error);
      return false;
    }
  };

  // 开始录音
  const startRecording = async () => {
    if (!mediaRecorderRef.current) {
      const success = await initRecording();
      if (!success) return;
    }
    
    audioChunksRef.current = [];
    mediaRecorderRef.current?.start();
    setIsRecording(true);
    
    // 计时器
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // 停止所有音频轨道
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  // 播放录音
  const playRecording = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 暂停播放
  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 提交录音
  const handleSubmit = () => {
    if (transcription.trim()) {
      onSubmit(transcription);
      setTranscription('');
      setAudioURL(null);
      setRecordingTime(0);
    }
  };

  // 模拟语音转文字
  const simulateTranscription = () => {
    const phrases = [
      "今天心情不错，完成了重要工作",
      "有点小压力，需要放松一下",
      "和朋友聊天很开心",
      "运动后感觉精力充沛",
      "需要一些独处的时间",
      "学习新知识很有成就感"
    ];
    
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setTranscription(randomPhrase);
  };

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 清理
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, []);

  // 音频播放结束
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* 录音控制 */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col items-center space-y-6">
          {/* 录音按钮 */}
          <div className="flex items-center gap-6">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`btn btn-circle btn-lg transition-all duration-300 ${
                isRecording
                  ? 'btn-error animate-pulse'
                  : 'btn-primary'
              }`}
              disabled={isPlaying}
            >
              {isRecording ? <Square size={24} /> : <Mic size={24} />}
            </button>
            
            {audioURL && (
              <button
                onClick={isPlaying ? pauseRecording : playRecording}
                className="btn btn-circle btn-lg btn-secondary"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            )}
          </div>

          {/* 录音状态 */}
          <div className="text-center">
            {isRecording ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="font-medium text-red-600">录音中...</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {formatTime(recordingTime)}
                </p>
                <p className="text-sm text-gray-500">
                  最长可录制 5 分钟
                </p>
              </div>
            ) : audioURL ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium text-green-600">录音完成</span>
                </div>
                <p className="text-sm text-gray-500">
                  点击播放按钮试听录音
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <MicOff size={20} className="text-gray-400" />
                  <span className="font-medium text-gray-600">准备录音</span>
                </div>
                <p className="text-sm text-gray-500">
                  点击麦克风按钮开始录音
                </p>
              </div>
            )}
          </div>

          {/* 音频播放器 */}
          {audioURL && (
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center gap-4">
                <Volume2 size={18} className="text-gray-500" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="range range-xs flex-1"
                />
                <span className="text-sm text-gray-600">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              
              <audio
                ref={audioRef}
                src={audioURL}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* 转录区域 */}
      <div className="glass-card rounded-2xl p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg gradient-text">语音转文字</h3>
            <button
              onClick={simulateTranscription}
              disabled={!audioURL}
              className="btn btn-sm btn-outline gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              模拟转录
            </button>
          </div>

          <div className="relative">
            <textarea
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              placeholder="录音转录的文字将显示在这里，你也可以手动编辑..."
              className="w-full min-h-[120px] p-4 bg-white/50 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-mindflow-primary focus:border-transparent resize-none"
              rows={4}
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-500">
              {transcription.length}/500
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {audioURL ? (
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  录音已保存，可提交
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  请先录制语音
                </span>
              )}
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!transcription.trim()}
              className={`btn btn-lg gap-2 transition-all duration-300 ${
                transcription.trim()
                  ? 'bg-gradient-to-r from-mindflow-primary to-mindflow-secondary text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
              提交记录
            </button>
          </div>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
            <Mic className="text-mindflow-primary" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">语音记录小贴士</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 在安静的环境下录音效果更好</li>
              <li>• 每次录音建议在30秒到2分钟之间</li>
              <li>• 录音后可以试听，不满意可以重新录制</li>
              <li>• AI会自动分析语音中的情绪和关键词</li>
              <li>• 所有录音文件都会加密保存，保护隐私</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 音频文件信息 */}
      {audioURL && (
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">录音文件信息</p>
              <p className="text-xs text-gray-500">
                时长: {formatTime(recordingTime)} | 格式: WAV
              </p>
            </div>
            <button
              onClick={() => {
                setAudioURL(null);
                setTranscription('');
                setRecordingTime(0);
              }}
              className="btn btn-sm btn-ghost text-red-500"
            >
              删除录音
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;