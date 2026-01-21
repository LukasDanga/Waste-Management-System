import { Check } from 'lucide-react';

interface ProgressStepsProps {
  step: number;
}

export function ProgressSteps({ step }: ProgressStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                s <= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s < step ? <Check className="h-5 w-5" /> : s}
            </div>
            {s < 3 && (
              <div className={`w-16 h-1 ${s < step ? 'bg-green-600' : 'bg-gray-200'}`} />
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
  );
}
