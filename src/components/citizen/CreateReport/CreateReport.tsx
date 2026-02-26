import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { ProgressSteps } from './ProgressSteps';
import { StepImageUpload } from './StepImageUpload';
import { StepClassification } from './StepClassification';
import { StepDetails } from './StepDetails';
import type { ReportFormData } from './types';
import { createCitizenReport, fetchWasteTypes, uploadReportImage } from '../../../services/citizenService';
import { useToast } from '../../../hooks/useToast';

interface CreateReportProps {
  onNavigate: (section: string) => void;
}

interface WasteOption {
  value: string;
  label: string;
  color: string;
}

export function CreateReport({ onNavigate }: CreateReportProps) {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [wasteTypes, setWasteTypes] = useState<WasteOption[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { success: toastSuccess, error: toastError } = useToast();
  const [formData, setFormData] = useState<ReportFormData>({
    wasteType: 'PLASTIC',
    description: '',
    latitude: 16.45,
    longitude: 107.55,
    imageName: '',
  });

  useEffect(() => {
    const loadWasteTypes = async () => {
      setLoadingTypes(true);
      try {
        const data = await fetchWasteTypes();
        const options = data.map((item) => ({
          value: item.type,
          label: `${item.type} - ${item.description}`,
          color: 'text-blue-600',
        }));
        setWasteTypes(options);
        if (options.length && !options.find((o) => o.value === formData.wasteType)) {
          setFormData((prev) => ({ ...prev, wasteType: options[0].value }));
        }
      } catch (err) {
        toastError(err instanceof Error ? err.message : 'Không tải được loại rác');
      } finally {
        setLoadingTypes(false);
      }
    };

    loadWasteTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({ ...prev, imageName: file.name }));
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseImageUrl = () => {
    if (!imageUrl.trim()) {
      toastError('Vui lòng nhập URL ảnh');
      return;
    }
    setImageFile(null);
    setImagePreview(imageUrl.trim());
    setFormData((prev) => ({ ...prev, imageName: imageUrl.trim() }));
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!formData.description || formData.latitude == null || formData.longitude == null) {
      toastError('Vui lòng nhập mô tả và tọa độ');
      return;
    }
    if (!imageFile && !formData.imageName) {
      toastError('Vui lòng tải lên hoặc nhập URL hình ảnh');
      return;
    }

    setSubmitting(true);
    try {
      let imageName = formData.imageName;
      if (imageFile) {
        imageName = await uploadReportImage(imageFile);
        setFormData((prev) => ({ ...prev, imageName }));
      }
      if (!imageName) {
        toastError('Vui lòng cung cấp hình ảnh hợp lệ');
        setSubmitting(false);
        return;
      }

      const payload = {
        wasteType: formData.wasteType,
        description: formData.description,
        latitude: formData.latitude!,
        longitude: formData.longitude!,
        imageName: imageName!,
      };

      await createCitizenReport(payload);
      toastSuccess('Đã tạo báo cáo thành công');
      onNavigate('my-reports');
    } catch (err) {
      toastError(err instanceof Error ? err.message : 'Gửi báo cáo thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <ProgressSteps step={step} />

      {step === 1 && (
        <StepImageUpload
          imagePreview={imagePreview}
          onUpload={handleImageUpload}
          imageUrl={imageUrl}
          onImageUrlChange={setImageUrl}
          onUseImageUrl={handleUseImageUrl}
          onRemove={() => {
            setImagePreview(null);
            setImageFile(null);
            setImageUrl('');
            setFormData({ ...formData, imageName: '' });
            setStep(1);
          }}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepClassification
          imagePreview={imagePreview}
          wasteTypes={wasteTypes.length ? wasteTypes : [
            { value: 'PLASTIC', label: 'PLASTIC - Plastic bottles, bags, containers', color: 'text-blue-600' }
          ]}
          selectedWasteType={formData.wasteType}
          onSelect={(value) => setFormData({ ...formData, wasteType: value })}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <StepDetails
          formData={formData}
          onChange={(data) => setFormData({ ...formData, ...data })}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </div>
  );

}
