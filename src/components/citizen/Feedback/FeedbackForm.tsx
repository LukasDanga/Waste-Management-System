import { Upload } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import type { FeedbackFormData } from './types';

interface FeedbackFormProps {
  formData: FeedbackFormData;
  onChange: (data: Partial<FeedbackFormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function FeedbackForm({ formData, onChange, onSubmit, onCancel }: FeedbackFormProps) {
  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-bold mb-6">Tạo phản hồi mới</h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label>Loại phản hồi *</Label>
          <RadioGroup
            value={formData.type}
            onValueChange={(value : any) => onChange({ type: value as FeedbackFormData['type'] })}
            className="grid sm:grid-cols-3 gap-4"
          >
            {[
              { value: 'feedback', label: '💬 Góp ý', helper: 'Đề xuất cải thiện' },
              { value: 'complaint', label: '⚠️ Khiếu nại', helper: 'Báo cáo vấn đề' },
              { value: 'support', label: '❓ Hỗ trợ', helper: 'Cần giúp đỡ' }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.type === option.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <div>
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.helper}</div>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Liên quan đến báo cáo (không bắt buộc)</Label>
          <Select
            value={formData.relatedReport}
            onValueChange={(value: any) => onChange({ relatedReport: value })}
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

        <div className="space-y-2">
          <Label>Tiêu đề *</Label>
          <Input
            value={formData.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Nhập tiêu đề ngắn gọn..."
            className="bg-input-background"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Nội dung chi tiết *</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Mô tả chi tiết vấn đề hoặc góp ý của bạn..."
            rows={6}
            className="bg-input-background resize-none"
            required
          />
          <div className="text-xs text-gray-500 text-right">{formData.description.length}/1000</div>
        </div>

        <div className="space-y-2">
          <Label>Đính kèm ảnh (không bắt buộc)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Nhấn để tải ảnh lên</p>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Mức độ ưu tiên *</Label>
          <RadioGroup
            value={formData.priority}
            onValueChange={(value: any) => onChange({ priority: value as FeedbackFormData['priority'] })}
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

        <div className="flex gap-3 pt-4">
          <Button type="button" onClick={onCancel} className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100">
            Hủy
          </Button>
          <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
            Gửi phản hồi
          </Button>
        </div>
      </form>
    </Card>
  );
}
