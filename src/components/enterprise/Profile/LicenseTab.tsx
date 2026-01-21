import { FileText, Upload } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import type { LicenseItem } from './types';

interface LicenseTabProps {
  licenses: LicenseItem[];
  onUpload: () => void;
}

export function LicenseTab({ licenses, onUpload }: LicenseTabProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Giấy phép & Chứng chỉ</h3>

      <div className="space-y-4">
        {licenses.map((license) => (
          <div key={license.number} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-gray-900">{license.title}</p>
                  <p className="text-sm text-gray-500">Số: {license.number}</p>
                </div>
              </div>
              <Badge className={license.status === 'valid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}>
                {license.status === 'valid' ? 'Còn hiệu lực' : 'Hết hạn'}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Ngày cấp: {license.issuedDate} • Nơi cấp: {license.issuer}
              {license.note ? ` • ${license.note}` : ''}
            </p>
          </div>
        ))}

        <Button className="w-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-50" onClick={onUpload}>
          <Upload className="w-4 h-4 mr-2" />
          Tải lên giấy phép mới
        </Button>
      </div>
    </div>
  );
}
