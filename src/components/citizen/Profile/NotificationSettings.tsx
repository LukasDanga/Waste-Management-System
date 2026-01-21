import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import type { NotificationPreferences } from './types';

interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onToggle: (key: keyof NotificationPreferences) => void;
  onSave?: () => void;
}

export function NotificationSettings({ preferences, onToggle, onSave }: NotificationSettingsProps) {
  const settings = [
    {
      key: 'reportUpdates' as const,
      title: 'Cập nhật báo cáo',
      description: 'Nhận thông báo khi báo cáo của bạn được xử lý',
    },
    {
      key: 'pointsRewards' as const,
      title: 'Điểm thưởng & Phần thưởng',
      description: 'Thông báo về điểm thưởng và phần thưởng mới',
    },
    {
      key: 'systemNews' as const,
      title: 'Tin tức hệ thống',
      description: 'Cập nhật về tính năng mới và thông báo hệ thống',
    },
    {
      key: 'emailNotifications' as const,
      title: 'Thông báo Email',
      description: 'Nhận thông báo qua email',
    },
    {
      key: 'smsNotifications' as const,
      title: 'Thông báo SMS',
      description: 'Nhận thông báo qua tin nhắn SMS',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Cài đặt thông báo</h3>

      <div className="space-y-6">
        {settings.map((setting, index) => (
          <div
            key={setting.key}
            className={`flex items-center justify-between pb-4 ${index < settings.length - 1 ? 'border-b' : ''}`}
          >
            <div>
              <p className="font-medium text-gray-900">{setting.title}</p>
              <p className="text-sm text-gray-500">{setting.description}</p>
            </div>
            <Switch checked={preferences[setting.key]} onCheckedChange={() => onToggle(setting.key)} />
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onSave}>
          Lưu cài đặt thông báo
        </Button>
      </div>
    </div>
  );
}
