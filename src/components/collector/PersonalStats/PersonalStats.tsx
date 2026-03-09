import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, Star, Zap, CheckCircle2, Target, Award } from 'lucide-react';

export function PersonalStats() {
  // Chart data
  const weeklyData = [
    { week: 'T2', tasks: 12 },
    { week: 'T3', tasks: 15 },
    { week: 'T4', tasks: 18 },
    { week: 'T5', tasks: 14 },
    { week: 'T6', tasks: 20 },
    { week: 'T7', tasks: 16 },
    { week: 'CN', tasks: 10 },
  ];

  const timeData = [
    { week: 'T1', avgTime: 28 },
    { week: 'T2', avgTime: 25 },
    { week: 'T3', avgTime: 22 },
    { week: 'T4', avgTime: 24 },
    { week: 'T5', avgTime: 20 },
    { week: 'T6', avgTime: 23 },
  ];

  const wasteTypeData = [
    { name: 'Rác tái chế', value: 45, color: '#10b981' },
    { name: 'Rác hữu cơ', value: 35, color: '#f59e0b' },
    { name: 'Rác nguy hại', value: 12, color: '#ef4444' },
    { name: 'Rác khác', value: 8, color: '#6b7280' },
  ];

  const achievements = [
    { icon: Trophy, label: '100 công việc', description: 'Hoàn thành 100 công việc', earned: true },
    { icon: Star, label: '4.8 sao', description: 'Đánh giá trung bình 4.8+', earned: true },
    { icon: Zap, label: 'Nhanh nhất', description: 'Thời gian TB dưới 20 phút', earned: true },
    { icon: CheckCircle2, label: '98% hoàn thành', description: 'Tỷ lệ hoàn thành trên 95%', earned: true },
    { icon: Target, label: 'Chính xác', description: 'Không có khiếu nại trong tháng', earned: true },
    { icon: Award, label: 'Siêu sao', description: 'Top 5 nhân viên xuất sắc', earned: true },
  ];

  const rankings = {
    company: { rank: 3, total: 15 },
    region: { rank: 12, total: 87 },
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thống kê cá nhân</h1>
        <p className="text-gray-600">Theo dõi hiệu suất làm việc của bạn</p>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Tasks Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Số công việc hoàn thành theo tuần
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="tasks" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Average Time Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Thời gian trung bình/công việc (phút)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="avgTime" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Waste Type Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Phân bố theo loại rác
        </h2>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={wasteTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {wasteTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {wasteTypeData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-gray-500">{item.value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Huy hiệu thành tích</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className={`text-center p-4 rounded-xl border-2 transition-all ${
                  achievement.earned
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-8 h-8 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div className="font-semibold text-sm text-gray-900 mb-1">
                  {achievement.label}
                </div>
                <div className="text-xs text-gray-600">
                  {achievement.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Hạng trong công ty</div>
              <div className="text-2xl font-bold text-gray-900">
                #{rankings.company.rank}/{rankings.company.total}
              </div>
            </div>
          </div>
          <div className="h-2 bg-green-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 rounded-full"
              style={{ width: `${((rankings.company.total - rankings.company.rank + 1) / rankings.company.total) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Bạn đang ở vị trí thứ {rankings.company.rank} trong {rankings.company.total} nhân viên
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Hạng trong khu vực</div>
              <div className="text-2xl font-bold text-gray-900">
                #{rankings.region.rank}/{rankings.region.total}
              </div>
            </div>
          </div>
          <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
            <div 
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: `${((rankings.region.total - rankings.region.rank + 1) / rankings.region.total) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Bạn đang ở vị trí thứ {rankings.region.rank} trong {rankings.region.total} nhân viên khu vực
          </p>
        </div>
      </div>
    </div>
  );
}
