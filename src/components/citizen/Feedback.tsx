import { useState } from 'react';
import { MessageSquare, AlertTriangle, HelpCircle, Upload, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export function Feedback() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'feedback',
    relatedReport: '',
    title: '',
    description: '',
    priority: 'medium'
  });

  const feedbackList = [
    {
      id: '#FB-001',
      type: 'complaint',
      typeLabel: '⚠️ Khiếu nại',
      title: 'Chưa thu đúng giờ',
      status: 'processing',
      statusLabel: 'Đang xử lý',
      date: '10/01/2026',
      response: null
    },
    {
      id: '#FB-002',
      type: 'feedback',
      typeLabel: '💬 Góp ý',
      title: 'Giao diện rất dễ sử dụng',
      status: 'resolved',
      statusLabel: 'Đã xử lý',
      date: '05/01/2026',
      response: 'Cảm ơn bạn đã góp ý!'
    },
    {
      id: '#FB-003',
      type: 'support',
      typeLabel: '❓ Hỗ trợ',
      title: 'Làm sao để đổi điểm thưởng?',
      status: 'resolved',
      statusLabel: 'Đã xử lý',
      date: '28/12/2025',
      response: 'Bạn có thể xem phần Điểm thưởng để biết chi tiết.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Phản hồi đã được gửi thành công!');
    setShowForm(false);
    setFormData({
      type: 'feedback',
      relatedReport: '',
      title: '',
      description: '',
      priority: 'medium'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Phản hồi & Khiếu nại</h1>
        <p className="text-gray-600">Gửi ý kiến của bạn hoặc báo cáo vấn đề</p>
      </div>

      {/* Create New Button */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="mb-6 bg-green-600 hover:bg-green-700"
          size="lg"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Tạo phản hồi mới
        </Button>
      )}

      {/* Create Form */}
      {showForm && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">Tạo phản hồi mới</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Selection */}
            <div className="space-y-3">
              <Label>Loại phản hồi *</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                className="grid sm:grid-cols-3 gap-4"
              >
                <label
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.type === 'feedback'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <RadioGroupItem value="feedback" id="feedback" />
                  <div>
                    <div className="font-semibold">💬 Góp ý</div>
                    <div className="text-xs text-gray-500">Đề xuất cải thiện</div>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.type === 'complaint'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <RadioGroupItem value="complaint" id="complaint" />
                  <div>
                    <div className="font-semibold">⚠️ Khiếu nại</div>
                    <div className="text-xs text-gray-500">Báo cáo vấn đề</div>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.type === 'support'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <RadioGroupItem value="support" id="support" />
                  <div>
                    <div className="font-semibold">❓ Hỗ trợ</div>
                    <div className="text-xs text-gray-500">Cần giúp đỡ</div>
                  </div>
                </label>
              </RadioGroup>
            </div>

            {/* Related Report */}
            <div className="space-y-2">
              <Label>Liên quan đến báo cáo (không bắt buộc)</Label>
              <Select
                value={formData.relatedReport}
                onValueChange={(value) => setFormData({ ...formData, relatedReport: value })}
              >
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder="Chọn báo cáo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Không có</SelectItem>
                  <SelectItem value="r1">#R20260112-001 - Rác tái chế tại Q1</SelectItem>
                  <SelectItem value="r2">#R20260111-045 - Rác hữu cơ tại Q5</SelectItem>
                  <SelectItem value="r3">#R20260110-023 - Rác thông thường tại Q3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label>Tiêu đề *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Nhập tiêu đề ngắn gọn..."
                className="bg-input-background"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Nội dung chi tiết *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả chi tiết vấn đề hoặc góp ý của bạn..."
                rows={6}
                className="bg-input-background resize-none"
                required
              />
              <div className="text-xs text-gray-500 text-right">
                {formData.description.length}/1000
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Đính kèm ảnh (không bắt buộc)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Nhấn để tải ảnh lên</p>
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-3">
              <Label>Mức độ ưu tiên *</Label>
              <RadioGroup
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
                className="flex gap-4"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="low" id="low" />
                  <span className="text-sm">🟢 Thấp</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="medium" id="medium" />
                  <span className="text-sm">🟡 Trung bình</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="high" id="high" />
                  <span className="text-sm">🔴 Cao</span>
                </label>
              </RadioGroup>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Gửi phản hồi
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Feedback List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Phản hồi của tôi</h2>
        <div className="space-y-4">
          {feedbackList.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{item.typeLabel}</span>
                    <span className="font-mono text-sm text-gray-500">{item.id}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">Ngày gửi: {item.date}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(item.status)}`}>
                    {item.statusLabel}
                  </span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {item.response && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-green-800 mb-1">Phản hồi từ quản trị viên:</p>
                  <p className="text-sm text-gray-700">{item.response}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
