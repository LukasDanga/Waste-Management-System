import { ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import type { AiClassification } from './types';

interface StepClassificationProps {
  imagePreview: string | null;
  aiClassification: AiClassification;
  onConfirmChange: (confirmed: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepClassification({ imagePreview, aiClassification, onConfirmChange, onBack, onNext }: StepClassificationProps) {
  return (
    <Card className="p-8">
      <div className="space-y-6">
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />}

        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🤖</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-4">AI Gợi ý phân loại</h3>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Kết quả:</span>
                  <span className="text-lg font-bold text-blue-600">{aiClassification.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Độ tin cậy:</span>
                  <span className="text-lg font-bold text-green-600">{aiClassification.confidence}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="classification"
                    checked={aiClassification.confirmed}
                    onChange={() => onConfirmChange(true)}
                    className="w-4 h-4 text-green-600"
                  />
                  <span>✓ Xác nhận đúng</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="classification"
                    checked={!aiClassification.confirmed}
                    onChange={() => onConfirmChange(false)}
                    className="w-4 h-4 text-green-600"
                  />
                  <span>○ Chọn loại khác</span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button onClick={onBack} className="flex-1 border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100">
            Quay lại
          </Button>
          <Button onClick={onNext} className="flex-1 bg-green-600 hover:bg-green-700">
            Tiếp tục
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
