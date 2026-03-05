import { AlertCircle, ArrowLeft, Calendar, CheckCircle, MapPin, Package, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { API_CONFIG } from '../../../config/api.config';
import {
    createCollectionAssignment,
    getMyProfile,
    type Capacity,
    type EnterpriseMember,
    type EnterpriseProfile,
} from '../../../services/enterpriseService';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import type { RequestItem } from './types';

interface RequestDetailProps {
  onNavigate: (section: string) => void;
  requestData?: RequestItem;
}

export function RequestDetail({ onNavigate, requestData }: RequestDetailProps) {
  const [profile, setProfile] = useState<EnterpriseProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [selectedMemberID, setSelectedMemberID] = useState('');
  const [selectedCapacityID, setSelectedCapacityID] = useState('');
  const [priority, setPriority] = useState<number>(1);
  const [wasteType, setWasteType] = useState(requestData?.type ?? '');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setProfileLoading(true);
    getMyProfile()
      .then((res) => setProfile(res.payload))
      .catch((err) => setProfileError(err.message ?? 'Không tải được hồ sơ doanh nghiệp'))
      .finally(() => setProfileLoading(false));
  }, []);

  if (!requestData) {
    return (
      <div className="p-8 text-center text-gray-500">
        Không có dữ liệu yêu cầu.
        <Button className="mt-4" onClick={() => onNavigate('requests')}>Quay lại</Button>
      </div>
    );
  }

  const isCorrected = wasteType.toUpperCase() !== (requestData.type ?? '').toUpperCase();

  const handleAssign = async () => {
    if (!selectedMemberID) { setSubmitError('Vui lòng chọn collector'); return; }
    if (!selectedCapacityID) { setSubmitError('Vui lòng chọn năng lực thu gom'); return; }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await createCollectionAssignment({
        collectionReportID: requestData.collectionReportID,
        capacityID: selectedCapacityID,
        assigneeID: selectedMemberID,
        priority,
        wasteType: wasteType || requestData.type,
        isCorrected,
        note,
        bonusRuleIDs: [],
        penaltyRuleIDs: [],
      });
      onNavigate('requests', { justAssignedId: requestData.collectionReportID });
    } catch (err: any) {
      setSubmitError(err.message ?? 'Phân công thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleString('vi-VN'); } catch { return iso; }
  };

  const imageUrl = requestData.image || `${API_CONFIG.IMAGE_BASE_URL}/${requestData.imageName}`;

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button onClick={() => onNavigate('requests')} className="mb-4 bg-transparent hover:bg-gray-100 text-gray-800">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Quay lại
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{requestData.id}</h1>
            <p className="text-gray-600">{formatDate(requestData.reportAt)}</p>
          </div>
          <Badge className={`px-4 py-2 text-base ${
            requestData.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
            : requestData.status === 'accepted' ? 'bg-blue-100 text-blue-700 border-blue-300'
            : 'bg-red-100 text-red-700 border-red-300'
          }`}>
            {requestData.status === 'pending' ? '⏳ Chờ phân công'
              : requestData.status === 'accepted' ? '👷 Đã phân công'
              : '❌ Từ chối'}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          <Card className="p-4">
            <img
              src={imageUrl}
              alt={requestData.typeLabel}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x300?text=No+Image'; }}
            />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Thông tin yêu cầu</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Loại rác (báo cáo)</p>
                  <p className="font-semibold">{requestData.typeLabel}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Khu vực</p>
                  <p className="font-semibold">{requestData.regionCode || '—'}</p>
                  {requestData.gps && (
                    <p className="text-xs text-gray-500 mt-1">
                      GPS: {requestData.gps.latitude.toFixed(5)}, {requestData.gps.longitude.toFixed(5)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Người báo cáo</p>
                  <p className="font-semibold">{requestData.reporter}</p>
                  <p className="text-xs text-gray-400 font-mono">{requestData.citizenProfileID}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Thời gian tạo</p>
                  <p className="font-semibold">{formatDate(requestData.reportAt)}</p>
                </div>
              </div>

              {requestData.description && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Mô tả chi tiết</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{requestData.description}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div>
          {requestData.status === 'rejected' && (
            <Card className="p-6 bg-red-50 border-red-200">
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="h-6 w-6" />
                <p className="font-semibold text-lg">Yêu cầu đã bị từ chối</p>
              </div>
              <p className="mt-2 text-gray-500 text-sm">Yêu cầu này không thể phân công.</p>
            </Card>
          )}

          {requestData.status === 'accepted' && (
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3 text-blue-600">
                <CheckCircle className="h-6 w-6" />
                <p className="font-semibold text-lg">Đã phân công</p>
              </div>
              <p className="mt-2 text-gray-500 text-sm">Yêu cầu này đã được phân công cho collector.</p>
            </Card>
          )}

          {requestData.status === 'pending' && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Phân công Collector</h2>

              {profileLoading && <p className="text-gray-500">Đang tải danh sách collector...</p>}
              {profileError && <p className="text-red-500">{profileError}</p>}

              {!profileLoading && !profileError && profile && (
                <div className="space-y-6">
                  {/* Collector selection */}
                  <div>
                    <p className="font-semibold mb-3">1. Chọn Collector</p>
                    {profile.members.length === 0 ? (
                      <p className="text-sm text-gray-500">Chưa có collector nào trong doanh nghiệp.</p>
                    ) : (
                      <RadioGroup value={selectedMemberID} onValueChange={setSelectedMemberID}>
                        <div className="space-y-3">
                          {profile.members.map((member: EnterpriseMember) => (
                            <label
                              key={member.memberID}
                              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedMemberID === member.userID
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <RadioGroupItem value={member.userID} id={member.memberID} className="mt-1" />
                              <div className="flex-1">
                                <p className="font-semibold text-sm font-mono">{member.userID.slice(0, 16)}…</p>
                                <p className="text-xs text-gray-500 mt-1">Tham gia: {formatDate(member.assignedAt)}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </RadioGroup>
                    )}
                  </div>

                  {/* Capacity selection */}
                  <div>
                    <p className="font-semibold mb-3">2. Chọn năng lực thu gom</p>
                    <Select value={selectedCapacityID} onValueChange={setSelectedCapacityID}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn capacity..." />
                      </SelectTrigger>
                      <SelectContent>
                        {profile.capacities.map((cap: Capacity) => (
                          <SelectItem key={cap.capacityID} value={cap.capacityID}>
                            {cap.wasteType} — {cap.regionCode} ({cap.currentLoad}/{cap.maxDailyCapacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Priority */}
                  <div>
                    <p className="font-semibold mb-3">3. Mức độ ưu tiên</p>
                    <Select value={String(priority)} onValueChange={(v) => setPriority(Number(v))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">🔴 Cao (High)</SelectItem>
                        <SelectItem value="1">🟡 Trung bình (Medium)</SelectItem>
                        <SelectItem value="2">🟢 Thấp (Low)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Actual waste type */}
                  <div>
                    <p className="font-semibold mb-2">4. Loại rác thực tế</p>
                    <input
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      value={wasteType}
                      onChange={(e) => setWasteType(e.target.value)}
                      placeholder="Nhập loại rác thực tế..."
                    />
                    {isCorrected && (
                      <p className="text-xs text-orange-600 mt-1">⚠️ Loại rác khác với báo cáo gốc ({requestData.type})</p>
                    )}
                  </div>

                  {/* Note */}
                  <div>
                    <p className="font-semibold mb-2">5. Ghi chú</p>
                    <Textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ghi chú cho collector..."
                      rows={3}
                    />
                  </div>

                  {submitError && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {submitError}
                    </div>
                  )}

                  <Button
                    onClick={handleAssign}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={submitting || !selectedMemberID || !selectedCapacityID}
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    {submitting ? 'Đang phân công...' : 'Xác nhận phân công'}
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
