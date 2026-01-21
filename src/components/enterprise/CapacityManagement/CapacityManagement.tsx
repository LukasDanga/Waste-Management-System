import { CompanyInfoCard } from './CompanyInfoCard';
import { CapacityForm } from './CapacityForm';
import { ServiceAreasSection } from './ServiceAreasSection';
import { WasteTypesSection } from './WasteTypesSection';
import type { ServiceArea, WasteType } from './types';

export function CapacityManagement() {
  const wasteTypes: WasteType[] = [
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

  const serviceAreas: ServiceArea[] = [
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

      <CompanyInfoCard
        name="Green Recycle Co., Ltd"
        license="#ENV-2024-001"
        issueDate="15/01/2024"
        expiryDate="15/01/2029"
      />

      <WasteTypesSection wasteTypes={wasteTypes} />

      <ServiceAreasSection serviceAreas={serviceAreas} />

      <CapacityForm />
    </div>
  );
}
