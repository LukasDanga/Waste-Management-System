import { Card } from '../../ui/card';
import { Progress } from '../../ui/progress';

interface TierInfo {
  label: string;
  points: number;
  icon: string;
}

interface SummaryCardProps {
  totalPoints: number;
  rankName: string;
  rankIcon: string;
  nextRankMessage: string;
  progressValue: number;
  tiers: TierInfo[];
}

export function SummaryCard({
  totalPoints,
  rankName,
  rankIcon,
  nextRankMessage,
  progressValue,
  tiers,
}: SummaryCardProps) {
  return (
    <Card className="p-8 mb-6 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-yellow-200">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">{rankIcon}</div>
        <h2 className="text-2xl font-bold mb-2">TỔNG ĐIỂM CỦA BẠN</h2>
        <div className="text-5xl font-bold text-yellow-600 mb-6">{totalPoints.toLocaleString()} điểm</div>

        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Hạng: {rankIcon} {rankName}
            </span>
            <span className="text-sm text-gray-600">{nextRankMessage}</span>
          </div>
          <Progress value={progressValue} className="h-3" />
          <div className="flex flex-wrap items-center justify-between mt-2 text-xs text-gray-500 gap-y-1">
            {tiers.map((tier) => (
              <span key={tier.label}>
                {tier.icon} {tier.label}: {tier.points.toLocaleString()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
