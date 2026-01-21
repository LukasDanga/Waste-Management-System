import { useState } from 'react';
import { FileText, TrendingUp, Users, Building2, MapPin, Coins } from 'lucide-react';
import { ReportTemplates } from './ReportTemplates';
import { CustomReportBuilder } from './CustomReportBuilder';
import { ScheduledReports } from './ScheduledReports';
import type { ReportTemplate, ScheduledReport } from './types';
import { getColorClasses } from './colorUtils';

export function ComprehensiveReports() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('7days');
  const [format, setFormat] = useState('pdf');
  
  const templates: ReportTemplate[] = [
    {
      id: '1',
      name: 'Báo cáo hoạt động tổng thể',
      description: 'Tổng quan về tất cả hoạt động hệ thống',
      icon: TrendingUp,
      color: 'blue',
    },
    {
      id: '2',
      name: 'Báo cáo theo doanh nghiệp',
      description: 'Hiệu suất của từng doanh nghiệp',
      icon: Building2,
      color: 'green',
    },
    {
      id: '3',
      name: 'Báo cáo theo khu vực',
      description: 'Phân tích theo địa lý',
      icon: MapPin,
      color: 'orange',
    },
    {
      id: '4',
      name: 'Báo cáo môi trường',
      description: 'Tác động môi trường và khối lượng rác',
      icon: FileText,
      color: 'teal',
    },
    {
      id: '5',
      name: 'Báo cáo tài chính (điểm thưởng)',
      description: 'Thống kê điểm thưởng và đổi thưởng',
      icon: Coins,
      color: 'purple',
    },
  ];

  const scheduledReports: ScheduledReport[] = [
    {
      id: '1',
      name: 'Báo cáo tuần',
      frequency: 'Thứ 2 hàng tuần',
      recipients: 'admin@ecowaste.vn, manager@ecowaste.vn',
      lastRun: '08/01/2026',
    },
    {
      id: '2',
      name: 'Báo cáo tháng',
      frequency: 'Ngày 1 hàng tháng',
      recipients: 'admin@ecowaste.vn',
      lastRun: '01/01/2026',
    },
  ];

  const handleGenerateReport = () => {
    alert(`Đang tạo báo cáo ${format.toUpperCase()}...`);
  };

  const handleSaveTemplate = () => {
    alert('Đã lưu mẫu báo cáo!');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Báo cáo tổng hợp</h1>
        <p className="text-gray-600">Tạo và quản lý các báo cáo thống kê</p>
      </div>

      <ReportTemplates
        templates={templates}
        selectedTemplateId={selectedTemplate}
        onSelect={setSelectedTemplate}
      />

      <CustomReportBuilder
        reportType={reportType}
        onReportTypeChange={setReportType}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        format={format}
        onFormatChange={setFormat}
        onGenerate={handleGenerateReport}
        onSaveTemplate={handleSaveTemplate}
      />

      <ScheduledReports
        reports={scheduledReports}
        onCreateSchedule={() => alert('Tạo lịch báo cáo mới')}
        onEdit={(report) => alert(`Chỉnh sửa lịch: ${report.name}`)}
        onDownload={(report) => alert(`Tải xuống: ${report.name}`)}
      />
    </div>
  );
}
