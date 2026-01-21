import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

export function FiltersBar() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-8">
      <div>
        <label className="text-sm font-medium mb-2 block">Khu vực</label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toàn thành phố</SelectItem>
            <SelectItem value="q1">Quận 1</SelectItem>
            <SelectItem value="q2">Quận 2</SelectItem>
            <SelectItem value="q3">Quận 3</SelectItem>
            <SelectItem value="q4">Quận 4</SelectItem>
            <SelectItem value="q5">Quận 5</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Thời gian</label>
        <Select defaultValue="month">
          <SelectTrigger className="bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Tuần này</SelectItem>
            <SelectItem value="month">Tháng này</SelectItem>
            <SelectItem value="year">Năm này</SelectItem>
            <SelectItem value="all">Tất cả</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
