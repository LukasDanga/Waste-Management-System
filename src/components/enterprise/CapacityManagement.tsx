import { Building2, FileCheck, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function CapacityManagement() {
  const wasteTypes = [
    {
      type: 'organic',
      label: '🌿 Rác hữu cơ',
      registered: true,
      capacity: 50,
      currentUsage: 25,
      unit: 'tấn/tháng'
    },
    {
      type: 'recyclable',
      label: '♻️ Rác tái chế',
      registered: true,
      capacity: 100,
      currentUsage: 82,
      unit: 'tấn/tháng'
    },
    {
      type: 'hazardous',
      label: '⚠️ Rác nguy hại',
      registered: false,
      capacity: 0,
      currentUsage: 0,
      unit: 'tấn/tháng'
    },
    {
      type: 'general',
      label: '🗑️ Rác thông thường',
      registered: true,
      capacity: 80,
      currentUsage: 45,
      unit: 'tấn/tháng'
    }
  ];

  const serviceAreas = [
    { id: 'q1', label: 'Quận 1', checked: true },
    { id: 'q3', label: 'Quận 3', checked: true },
    { id: 'q5', label: 'Quận 5', checked: false },
    { id: 'q7', label: 'Quận 7', checked: true },
    { id: 'q10', label: 'Quận 10', checked: false },
    { id: 'pn', label: 'Phú Nhuận', checked: false },
    { id: 'tb', label: 'Tân Bình', checked: true },
    { id: 'go', label: 'Gò Vấp', checked: false }
  ];

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Năng lực xử lý</h1>
        <p className="text-gray-600">Quản lý năng lực và phạm vi hoạt động của doanh nghiệp</p>
      </div>

      {/* Company Info */}
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
                <p className="font-semibold text-lg">Green Recycle Co., Ltd</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Giấy phép hoạt động</p>
                <p className="font-semibold text-lg">#ENV-2024-001</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Ngày cấp</p>
                <p className="font-semibold">15/01/2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Hiệu lực đến</p>
                <p className="font-semibold">15/01/2029</p>
              </div>
            </div>
          </div>
          <FileCheck className="h-12 w-12 text-green-600" />
        </div>
      </Card>

      {/* Waste Types Capacity */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-6">Loại rác được phép thu gom</h2>
        
        <div className="space-y-6">
          {wasteTypes.map((waste) => (
            <div key={waste.type} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={waste.registered}
                    disabled={!waste.registered}
                  />
                  <span className="font-semibold">{waste.label}</span>
                </div>
                {waste.registered ? (
                  <span className="text-sm font-semibold">
                    {waste.capacity} {waste.unit}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">Chưa đăng ký</span>
                )}
              </div>

              {waste.registered && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      Đã sử dụng: {waste.currentUsage}/{waste.capacity} tấn
                    </span>
                    <span className={`font-semibold ${
                      (waste.currentUsage / waste.capacity) * 100 > 80
                        ? 'text-red-600'
                        : (waste.currentUsage / waste.capacity) * 100 > 60
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}>
                      {Math.round((waste.currentUsage / waste.capacity) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(waste.currentUsage / waste.capacity) * 100} 
                    className="h-3"
                  />
                  {(waste.currentUsage / waste.capacity) * 100 > 80 && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>Sắp đạt giới hạn năng lực!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-gray-700">
            💡 <strong>Lưu ý:</strong> Để đăng ký xử lý thêm loại rác, vui lòng nộp hồ sơ theo quy định 
            của Sở Tài nguyên & Môi trường.
          </p>
        </div>
      </Card>

      {/* Service Areas */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          Khu vực hoạt động
        </h2>

        {/* Map Placeholder */}
        <div className="h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500">
          🗺️ Bản đồ khu vực hoạt động
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {serviceAreas.map((area) => (
            <label
              key={area.id}
              className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                area.checked
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Checkbox checked={area.checked} />
              <span className="font-medium">{area.label}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            📍 Hiện đang phục vụ <strong>4 quận/huyện</strong>. 
            Để mở rộng khu vực hoạt động, vui lòng liên hệ với chúng tôi.
          </p>
        </div>
      </Card>

      {/* Edit Form */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Cập nhật thông tin năng lực</h2>
        
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Tên doanh nghiệp *</Label>
              <Input 
                defaultValue="Green Recycle Co., Ltd" 
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Số giấy phép *</Label>
              <Input 
                defaultValue="#ENV-2024-001" 
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Số điện thoại *</Label>
              <Input 
                defaultValue="028 1234 5678" 
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Email *</Label>
              <Input 
                defaultValue="contact@greenrecycle.vn" 
                className="bg-input-background"
                type="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Địa chỉ trụ sở *</Label>
            <Input 
              defaultValue="123 Nguyễn Huệ, Quận 1, TP.HCM" 
              className="bg-input-background"
            />
          </div>

          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Cập nhật thông tin
            </Button>
            <Button variant="outline">
              Yêu cầu mở rộng năng lực
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
