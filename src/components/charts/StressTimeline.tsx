import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StressTimelineProps {
  data: Array<{
    day: string;
    stress: number;
    mood: number;
  }>;
}

const StressTimeline: React.FC<StressTimelineProps> = ({ data }) => {
  // 根据压力值获取颜色
  const getStressColor = (stress: number) => {
    if (stress <= 30) return '#48bb78'; // 绿色 - 低压力
    if (stress <= 60) return '#ed8936'; // 橙色 - 中等压力
    return '#f56565'; // 红色 - 高压力
  };

  // 自定义 Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const stress = payload[0].value;
      let stressLevel = '低';
      let advice = '';
      
      if (stress <= 30) {
        stressLevel = '低';
        advice = '状态很好，继续保持！';
      } else if (stress <= 60) {
        stressLevel = '中等';
        advice = '适当放松，注意休息。';
      } else {
        stressLevel = '高';
        advice = '建议安排放松活动。';
      }

      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getStressColor(stress) }} />
              <span className="text-sm text-gray-600">压力值: </span>
              <span className="font-bold">{stress}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                stress <= 30 ? 'bg-green-100 text-green-800' :
                stress <= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {stressLevel}压力
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{advice}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
            domain={[0, 100]}
            label={{ value: '压力值', angle: -90, position: 'insideLeft', offset: -10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="stress" 
            name="压力水平"
            radius={[4, 4, 0, 0]}
            barSize={40}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getStressColor(entry.stress)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* 压力等级说明 */}
      <div className="flex justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">低压力 (0-30)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-gray-600">中等压力 (31-60)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-600">高压力 (61-100)</span>
        </div>
      </div>
    </div>
  );
};

export default StressTimeline;