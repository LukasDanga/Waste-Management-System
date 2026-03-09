import { Building2, FileCheck } from 'lucide-react';
import { Card } from '../../ui/card';

interface CompanyInfoCardProps {
  name: string;
  license: string;
  issueDate: string;
  expiryDate: string;
}

export function CompanyInfoCard({ name, license, issueDate, expiryDate }: CompanyInfoCardProps) {
  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
      <div className="flex items-start gap-4">
        <div className="p-4 bg-blue-600 rounded-lg">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">NĂNG LỰC XỬ LÝ HIỆN TẠI</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tên doanh nghiệp</p>
              <p className="font-semibold text-lg">{name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Giấy phép hoạt động</p>
              <p className="font-semibold text-lg">{license}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ngày cấp</p>
              <p className="font-semibold">{issueDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Hiệu lực đến</p>
              <p className="font-semibold">{expiryDate}</p>
            </div>
          </div>
        </div>
        <FileCheck className="h-12 w-12 text-green-600" />
      </div>
    </Card>
  );
}
