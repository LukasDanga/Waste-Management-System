import { useState } from 'react';
import { Camera, Upload, MapPin, Check, X, ChevronRight } from 'lucide-react';
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
import { Slider } from '../ui/slider';

interface CreateReportProps {
  onNavigate: (section: string) => void;
}

export function CreateReport({ onNavigate }: CreateReportProps) {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiClassification, setAiClassification] = useState({
    type: 'Rác tái chế (Plastic)',
    confidence: 87,
    confirmed: false
  });
  const [formData, setFormData] = useState({
    wasteType: 'recyclable',
    location: 'Đang lấy vị trí...',
    description: '',
    weight: 50 // 0-100 scale
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setStep(2);
        // Simulate AI classification after 1 second
        setTimeout(() => {
          setAiClassification({
            type: 'Rác tái chế (Plastic)',
            confidence: 87,
            confirmed: false
          });
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Simulate submission
    alert('Báo cáo đã được gửi thành công!');
    onNavigate('my-reports');
  };

  const wasteTypes = [
    { value: 'organic', label: '🌿 Rác hữu cơ (Organic)', color: 'text-green-600' },
    { value: 'recyclable', label: '♻️ Rác tái chế (Recyclable)', color: 'text-blue-600' },
    { value: 'hazardous', label: '⚠️ Rác nguy hại (Hazardous)', color: 'text-red-600' },
    { value: 'general', label: '🗑️ Rác thông thường (General)', color: 'text-gray-600' }
  ];

  const getWeightLabel = (value: number) => {
    if (value < 33) return 'Nhỏ (<5kg)';
    if (value < 67) return 'Trung bình (5-20kg)';
    return 'Lớn (>20kg)';
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s <= step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s < step ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 ${
                    s < step ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            {step === 1 && 'Chụp/Tải ảnh'}
            {step === 2 && 'AI Phân loại'}
            {step === 3 && 'Thông tin chi tiết'}
          </h2>
          <p className="text-gray-600">
            {step === 1 && 'Tải lên hình ảnh rác cần thu gom'}
            {step === 2 && 'Xác nhận loại rác được AI phân tích'}
            {step === 3 && 'Điền thông tin chi tiết về rác'}
          </p>
        </div>
      </div>

      {/* Step 1: Image Upload */}
      {step === 1 && (
        <Card className="p-8">
          <div className="space-y-4">
            {imagePreview ? (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <Button
                  onClick={() => setStep(2)}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Tiếp tục
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="image-upload"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <Upload className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-lg font-semibold mb-2">Kéo thả ảnh vào đây</p>
                  <p className="text-sm text-gray-500 mb-4">hoặc nhấn để chọn file</p>
                  <Button type="button" variant="outline" className="pointer-events-none">
                    <Camera className="mr-2 h-5 w-5" />
                    Chọn ảnh
                  </Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Step 2: AI Classification */}
      {step === 2 && (
        <Card className="p-8">
          <div className="space-y-6">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            )}

            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🤖</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-4">AI Gợi ý phân loại</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Kết quả:</span>
                      <span className="text-lg font-bold text-blue-600">
                        {aiClassification.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Độ tin cậy:</span>
                      <span className="text-lg font-bold text-green-600">
                        {aiClassification.confidence}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="classification"
                        checked={aiClassification.confirmed}
                        onChange={() => setAiClassification({ ...aiClassification, confirmed: true })}
                        className="w-4 h-4 text-green-600"
                      />
                      <span>✓ Xác nhận đúng</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="classification"
                        checked={!aiClassification.confirmed}
                        onChange={() => setAiClassification({ ...aiClassification, confirmed: false })}
                        className="w-4 h-4 text-green-600"
                      />
                      <span>○ Chọn loại khác</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Quay lại
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Tiếp tục
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <Card className="p-8">
          <div className="space-y-6">
            {/* Waste Type */}
            <div className="space-y-2">
              <Label>Loại rác *</Label>
              <Select
                value={formData.wasteType}
                onValueChange={(value) => setFormData({ ...formData, wasteType: value })}
              >
                <SelectTrigger className="bg-input-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {wasteTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className={type.color}>{type.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Vị trí *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="pl-10 bg-input-background"
                  placeholder="Nhập địa chỉ"
                />
              </div>
              <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                🗺️ Bản đồ (GPS auto-detect)
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Mô tả *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả chi tiết về rác cần thu gom..."
                rows={4}
                className="bg-input-background resize-none"
              />
              <div className="text-xs text-gray-500 text-right">
                {formData.description.length}/500
              </div>
            </div>

            {/* Weight Estimate */}
            <div className="space-y-2">
              <Label>Khối lượng ước tính</Label>
              <div className="pt-2 pb-4">
                <Slider
                  value={[formData.weight]}
                  onValueChange={(value) => setFormData({ ...formData, weight: value[0] })}
                  max={100}
                  step={1}
                  className="mb-2"
                />
                <div className="text-center font-semibold text-green-600">
                  {getWeightLabel(formData.weight)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                Quay lại
              </Button>
              <Button
                variant="outline"
                className="flex-1"
              >
                Lưu nháp
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Gửi báo cáo
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
