import { useCallback, useEffect, useState } from 'react';
import { getMyProfile, type EnterpriseProfile } from '../../../services/enterpriseService';
import { CapacityForm } from './CapacityForm';
import { CompanyInfoCard } from './CompanyInfoCard';
import { ServiceAreasSection } from './ServiceAreasSection';
import type { ServiceArea, WasteType } from './types';
import { WasteTypesSection } from './WasteTypesSection';

export function CapacityManagement() {
  const [profile, setProfile] = useState<EnterpriseProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getMyProfile();
      setProfile(res.payload);
    } catch (e: any) {
      setError(e?.message || 'Không tải được thông tin doanh nghiệp');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Map capacities → WasteType[] (currentLoad từ API)
  const wasteTypes: WasteType[] = (profile?.capacities ?? []).map((cap) => ({
    type: cap.wasteType,
    label: cap.wasteType,
    registered: true,
    capacity: cap.maxDailyCapacity,
    currentUsage: cap.currentLoad,
    unit: 'kg/ngày',
  }));

  // Map capacities → ServiceArea[] (unique theo regionCode)
  const seen = new Set<string>();
  const serviceAreas: ServiceArea[] = (profile?.capacities ?? [])
    .filter((cap) => {
      if (seen.has(cap.regionCode)) return false;
      seen.add(cap.regionCode);
      return true;
    })
    .map((cap) => ({
      id: cap.regionCode,
      label: cap.regionCode,
      checked: true,
    }));

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Đang tải thông tin doanh nghiệp...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        ❌ {error}
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Năng lực xử lý</h1>
        <p className="text-gray-600">Quản lý năng lực và phạm vi hoạt động của doanh nghiệp</p>
      </div>

      <CompanyInfoCard
        name={profile?.name ?? '---'}
        license={profile?.tin ?? '---'}
        issueDate={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('vi-VN') : '---'}
        expiryDate="---"
      />

      {wasteTypes.length > 0 ? (
        <WasteTypesSection wasteTypes={wasteTypes} />
      ) : (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
          ⚠️ Chưa có năng lực thu gom nào được đăng ký.
        </div>
      )}

      {serviceAreas.length > 0 && (
        <ServiceAreasSection serviceAreas={serviceAreas} />
      )}

      <CapacityForm onSuccess={loadProfile} />
    </div>
  );
}
