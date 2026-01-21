import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { ProgressSteps } from './ProgressSteps';
import { StepImageUpload } from './StepImageUpload';
import { StepClassification } from './StepClassification';
import { StepDetails } from './StepDetails';
import type { AiClassification, ReportFormData } from './types';

interface CreateReportProps {
  onNavigate: (section: string) => void;
}

const WASTE_TYPES = [
  { value: 'organic', label: '🌿 Rác hữu cơ (Organic)', color: 'text-green-600' },
  { value: 'recyclable', label: '♻️ Rác tái chế (Recyclable)', color: 'text-blue-600' },
  { value: 'hazardous', label: '⚠️ Rác nguy hại (Hazardous)', color: 'text-red-600' },
  { value: 'general', label: '🗑️ Rác thông thường (General)', color: 'text-gray-600' },
];

export function CreateReport({ onNavigate }: CreateReportProps) {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiClassification, setAiClassification] = useState<AiClassification>({
    type: 'Rác tái chế (Plastic)',
    confidence: 87,
    confirmed: false,
  });
  const [formData, setFormData] = useState<ReportFormData>({
    wasteType: 'recyclable',
    location: 'Đang lấy vị trí...',
    description: '',
    weight: 50,
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setStep(2);
        setTimeout(() => {
          setAiClassification({
            type: 'Rác tái chế (Plastic)',
            confidence: 87,
            confirmed: false,
          });
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    alert('Báo cáo đã được gửi thành công!');
    onNavigate('my-reports');
  };

  const handleSaveDraft = () => {
    alert('Đã lưu nháp (mô phỏng)');
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <ProgressSteps step={step} />

      {step === 1 && (
        <StepImageUpload
          imagePreview={imagePreview}
          onUpload={handleImageUpload}
          onRemove={() => {
            setImagePreview(null);
            setStep(1);
          }}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepClassification
          imagePreview={imagePreview}
          aiClassification={aiClassification}
          onConfirmChange={(confirmed) =>
            setAiClassification({ ...aiClassification, confirmed })
          }
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <StepDetails
          formData={formData}
          onChange={(data) => setFormData({ ...formData, ...data })}
          wasteTypes={WASTE_TYPES}
          onBack={() => setStep(2)}
          onSaveDraft={handleSaveDraft}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );

}
