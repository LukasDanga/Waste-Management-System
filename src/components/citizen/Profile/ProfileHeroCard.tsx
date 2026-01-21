import { Camera } from 'lucide-react';

interface ProfileHeroCardProps {
  fullName: string;
  levelLabel: string;
  statsLabel: string;
  onAvatarClick?: () => void;
}

export function ProfileHeroCard({ fullName, levelLabel, statsLabel, onAvatarClick }: ProfileHeroCardProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-emerald-600">
            {fullName.charAt(0)}
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
            onClick={onAvatarClick}
          >
            <Camera className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-1">{fullName}</h2>
          <p className="text-emerald-100">{levelLabel}</p>
          <p className="text-emerald-100 mt-2">{statsLabel}</p>
        </div>
      </div>
    </div>
  );
}
