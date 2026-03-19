import { Card } from '../../ui/card';
import { ChevronRight, MapPin, LocateFixed, MessageSquareWarning } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { CitizenReportItem } from '../../../services/citizenService';
import { API_CONFIG } from '../../../config/api.config';
import { formatDateTime } from './types';

interface ReportCardProps {
  report: CitizenReportItem;
  onClick?: () => void;
  onViewLocation?: (report: CitizenReportItem) => void;
  onViewComplaint?: (report: CitizenReportItem) => void;
}

const WASTE_LABELS: Record<string, { emoji: string; label: string }> = {
  ORGANIC: { emoji: '🌿', label: 'Rác hữu cơ' },
  PLASTIC: { emoji: '♻️', label: 'Rác nhựa' },
  METAL: { emoji: '🛠️', label: 'Kim loại' },
  GLASS: { emoji: '🍾', label: 'Thủy tinh' },
  PAPER: { emoji: '📄', label: 'Giấy' },
  ELECTRONIC: { emoji: '💻', label: 'Rác điện tử' },
};

const FALLBACK_REMOTE = 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&q=80';

const getImageBase = () => {
  const base = API_CONFIG.IMAGE_BASE_URL || API_CONFIG.BASE_URL || '';
  return base.replace(/\/+$/, '');
};

const resolveImageUrl = (imageName?: string) => {
  const base = getImageBase();
  if (!base) return FALLBACK_REMOTE;
  if (!imageName) return `${base}/placeholder.webp`;
  if (/^https?:\/\//i.test(imageName)) return imageName;
  return `${base}/${imageName}`;
};

export function ReportCard({ report, onClick, onViewLocation, onViewComplaint }: ReportCardProps) {
  const wasteInfo = WASTE_LABELS[report.wasteType] || { emoji: '🗑️', label: report.wasteType || 'Không xác định' };
  const locationText = report.regionCode || `${report.gps?.latitude}, ${report.gps?.longitude}`;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img
            src={resolveImageUrl(report.imageName)}
            alt={wasteInfo.label}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 truncate">
              <span className="text-xl">{wasteInfo.emoji}</span>
              <h3 className="font-bold text-lg truncate">{wasteInfo.label}</h3>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-gray-600 flex items-center gap-1 truncate">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span className="truncate">{locationText}</span>
            </p>
            <p className="text-gray-500 flex items-center gap-1">🕐 {formatDateTime(report.reportAt)}</p>
            <StatusBadge status={report.status} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-9 w-9 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 text-gray-500 hover:text-yellow-700"
            title="Khiếu nại"
            onClick={(e) => {
              e.stopPropagation();
              onViewComplaint?.(report);
            }}
          >
            <MessageSquareWarning className="h-4 w-4 mx-auto" />
          </button>
          <button
            type="button"
            className="h-9 w-9 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-500 hover:text-green-700"
            title="Xem vị trí"
            onClick={(e) => {
              e.stopPropagation();
              onViewLocation?.(report);
            }}
          >
            <LocateFixed className="h-4 w-4 mx-auto" />
          </button>
          <ChevronRight className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </Card>
  );
}
