export interface PointsHistoryItem {
  date: string;
  activity: string;
  points: string;
  total: string;
}

export interface PointRule {
  action: string;
  points: string;
}

export interface PointRuleCategory {
  category: string;
  rules: PointRule[];
}
