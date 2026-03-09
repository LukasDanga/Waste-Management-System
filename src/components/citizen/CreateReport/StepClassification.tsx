import { CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

interface WasteTypeOption {
  value: string;
  label: string;
  color: string;
}

interface StepClassificationProps {
  imagePreview: string | null;
  wasteTypes: WasteTypeOption[];
  selectedWasteType: string;
  onSelect: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepClassification({ imagePreview, wasteTypes, selectedWasteType, onSelect, onBack, onNext }: StepClassificationProps) {
  return (
    <Card className="p-8">
      <div className="space-y-6">
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />}

        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🗂️</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-4">Chọn loại rác phù hợp</h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {wasteTypes.map((type) => {
                  const isActive = type.value === selectedWasteType;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => onSelect(type.value)}
                      className={`flex items-center justify-between rounded-lg border p-4 text-left transition-colors ${
                        isActive ? 'border-green-600 bg-white shadow-sm' : 'border-gray-200 bg-white hover:border-green-300'
                      }`}
                    >
                      <div>
                        <div className={`font-semibold ${type.color}`}>{type.label}</div>
                        <div className="text-sm text-gray-500">Nhấn để xác nhận loại rác</div>
                      </div>
                      {isActive && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </button>
                  );
                })}
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
