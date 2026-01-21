import { ArrowRight, Users, Building2, Truck, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomepageProps {
  onNavigate: (page: string) => void;
}

export function Homepage({ onNavigate }: HomepageProps) {
  const features = [
    {
      icon: Users,
      title: 'Cho Người Dân',
      description: 'Báo cáo rác, nhận điểm thưởng',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Building2,
      title: 'Cho Doanh Nghiệp',
      description: 'Quản lý thu gom thông minh',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Truck,
      title: 'Cho Nhân Viên',
      description: 'Điều phối công việc hiệu quả',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Settings,
      title: 'Cho Quản Trị',
      description: 'Giám sát toàn hệ thống',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const stats = [
    { value: '12,456', label: 'Tổng báo cáo' },
    { value: '850', label: 'Tấn rác đã thu', unit: 'tấn' },
    { value: '5,280', label: 'Người dùng tích cực' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                Hệ Thống Quản Lý Rác Thải Thông Minh
              </h1>
              <p className="text-xl text-gray-600">
                Kết nối cộng đồng - Bảo vệ môi trường - Tái chế hiệu quả
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('login')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Bắt đầu ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1749805339958-4b1d0f16423d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBlbnZpcm9ubWVudCUyMGdyZWVufGVufDF8fHx8MTc2ODE5MTk0NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Recycling and environment"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Giải pháp cho mọi đối tượng
            </h2>
            <p className="text-lg text-gray-600">
              Hệ thống toàn diện phục vụ cộng đồng và doanh nghiệp
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-2">
                  <div className={`w-14 h-14 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">
                  {stat.value}
                  {stat.unit && <span className="text-2xl ml-2">{stat.unit}</span>}
                </div>
                <div className="text-green-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Thông tin liên hệ</h4>
              <p className="text-sm">Email: contact@ecowaste.vn</p>
              <p className="text-sm">Hotline: 1900 xxxx</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Chính sách</h4>
              <p className="text-sm">Điều khoản sử dụng</p>
              <p className="text-sm">Chính sách bảo mật</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Hỗ trợ</h4>
              <p className="text-sm">Hướng dẫn sử dụng</p>
              <p className="text-sm">Câu hỏi thường gặp</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © 2026 EcoWaste. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
