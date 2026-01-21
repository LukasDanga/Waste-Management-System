import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Input } from '../../ui/input';
import { FileText } from 'lucide-react';

interface CustomReportBuilderProps {
  reportType: string;
  onReportTypeChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  format: string;
  onFormatChange: (value: string) => void;
  onGenerate: () => void;
  onSaveTemplate?: () => void;
}

export function CustomReportBuilder({
  reportType,
  onReportTypeChange,
  dateRange,
  onDateRangeChange,
  format,
  onFormatChange,
  onGenerate,
  onSaveTemplate,
}: CustomReportBuilderProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Tạo báo cáo tùy chỉnh</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="report-type">Loại báo cáo</Label>
          <Select value={reportType} onValueChange={onReportTypeChange}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Chọn loại báo cáo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activity">Hoạt động tổng thể</SelectItem>
              <SelectItem value="enterprise">Theo doanh nghiệp</SelectItem>
              <SelectItem value="region">Theo khu vực</SelectItem>
              <SelectItem value="environment">Môi trường</SelectItem>
              <SelectItem value="financial">Tài chính (điểm)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="date-range">Thời gian</Label>
          <Select value={dateRange} onValueChange={onDateRangeChange}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="7days">7 ngày qua</SelectItem>
              <SelectItem value="30days">30 ngày qua</SelectItem>
              <SelectItem value="thismonth">Tháng này</SelectItem>
              <SelectItem value="lastmonth">Tháng trước</SelectItem>
              <SelectItem value="custom">Tùy chỉnh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {dateRange === 'custom' && (
          <>
            <div>
              <Label htmlFor="start-date">Từ ngày</Label>
              <Input id="start-date" type="date" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="end-date">Đến ngày</Label>
              <Input id="end-date" type="date" className="mt-2" />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <Label className="mb-3 block">Bộ lọc</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="filter-citizen" />
              <Label htmlFor="filter-citizen" className="cursor-pointer">Người dân</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="filter-enterprise" />
              <Label htmlFor="filter-enterprise" className="cursor-pointer">Doanh nghiệp</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="filter-collector" />
              <Label htmlFor="filter-collector" className="cursor-pointer">Thu gom viên</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="filter-q1" />
              <Label htmlFor="filter-q1" className="cursor-pointer">Quận 1</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="filter-q3" />
              <Label htmlFor="filter-q3" className="cursor-pointer">Quận 3</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="filter-recycle" />
              <Label htmlFor="filter-recycle" className="cursor-pointer">Rác tái chế</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="filter-organic" />
              <Label htmlFor="filter-organic" className="cursor-pointer">Rác hữu cơ</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="filter-hazard" />
              <Label htmlFor="filter-hazard" className="cursor-pointer">Rác nguy hại</Label>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Label className="mb-3 block">Biểu đồ</Label>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="chart-bar" defaultChecked />
              <Label htmlFor="chart-bar" className="cursor-pointer">Cột</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="chart-pie" defaultChecked />
              <Label htmlFor="chart-pie" className="cursor-pointer">Tròn</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="chart-line" />
              <Label htmlFor="chart-line" className="cursor-pointer">Đường</Label>
            </div>
          </div>
        </div>

        <div>
          <Label>Định dạng</Label>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="format-pdf"
                name="format"
                value="pdf"
                checked={format === 'pdf'}
                onChange={(e) => onFormatChange(e.target.value)}
                className="cursor-pointer"
              />
              <Label htmlFor="format-pdf" className="cursor-pointer">PDF</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="format-excel"
                name="format"
                value="excel"
                checked={format === 'excel'}
                onChange={(e) => onFormatChange(e.target.value)}
                className="cursor-pointer"
              />
              <Label htmlFor="format-excel" className="cursor-pointer">Excel</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="format-both"
                name="format"
                value="both"
                checked={format === 'both'}
                onChange={(e) => onFormatChange(e.target.value)}
                className="cursor-pointer"
              />
              <Label htmlFor="format-both" className="cursor-pointer">Cả hai</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
        <Button onClick={onGenerate} className="bg-green-600 hover:bg-green-700">
          <FileText className="w-4 h-4 mr-2" />
          Tạo báo cáo
        </Button>
        <Button onClick={onSaveTemplate} className="border border-gray-300 text-gray-700 hover:bg-gray-50">
          Lưu mẫu
        </Button>
      </div>
    </div>
  );
}
