import { useState } from 'react';
import { AlertsPanel } from './AlertsPanel';
import { FiltersPanel } from './FiltersPanel';
import { MapView } from './MapView';
import { ReportList } from './ReportList';
import { reports } from './mockData';
import type { Report } from './types';

export function ReportMonitoring() {
  const [areaFilter, setAreaFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');


  const filteredReports = reports.filter(report => {
    const matchesArea = areaFilter === 'all' || report.location.includes(areaFilter);
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesArea && matchesType && matchesStatus;
  });

  const urgentReports = reports.filter(r => r.status === 'urgent');
  const overdueReports = reports.filter(r => r.status === 'pending' && parseInt(r.time) > 6);
  const rejectedMultiple = reports.filter(r => r.status === 'rejected');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Giám sát báo cáo</h1>
        <p className="text-gray-600">Theo dõi và giám sát tất cả báo cáo trong hệ thống</p>
      </div>

      {/* Alerts */}
      <AlertsPanel
        urgentCount={urgentReports.length}
        overdueCount={overdueReports.length}
        rejectedCount={rejectedMultiple.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2">
          <MapView />
          <FiltersPanel
            areaFilter={areaFilter}
            typeFilter={typeFilter}
            statusFilter={statusFilter}
            onAreaChange={setAreaFilter}
            onTypeChange={setTypeFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        <div className="lg:col-span-1">
          <ReportList reports={filteredReports} />
        </div>
      </div>
    </div>
  );
}
