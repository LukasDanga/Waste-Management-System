import { Camera, ChevronRight, Upload, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

interface StepImageUploadProps {
  imagePreview: string | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  onNext: () => void;
}

export function StepImageUpload({ imagePreview, onUpload, onRemove, onNext }: StepImageUploadProps) {
  return (
    <Card className="p-8">
      <div className="space-y-4">
        {imagePreview ? (
          <div className="space-y-4">
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
              <button
                onClick={onRemove}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Button onClick={onNext} className="w-full bg-green-600 hover:bg-green-700">
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
              <Button type="button" className="pointer-events-none border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100">
                <Camera className="mr-2 h-5 w-5" />
                Chọn ảnh
              </Button>
            </label>
            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={onUpload} />
          </div>
        )}
      </div>
    </Card>
  );
}
