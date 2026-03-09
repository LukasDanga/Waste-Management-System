export interface PointRule {
  id: number;
  name: string;
  wasteType: 'all' | 'organic' | 'recyclable' | 'hazardous' | 'general';
  wasteTypeLabel: string;
  condition: string;
  points: number;
  status: 'active' | 'inactive';
  appliedFrom: string;
}
