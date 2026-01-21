export interface RequestItem {
  id: string;
  location: string;
  district: string;
  type: 'organic' | 'recyclable' | 'general';
  typeLabel: string;
  weight: string;
  timeAgo: string;
  priority: 'high' | 'medium' | 'low';
  priorityLabel: string;
  aiReason: string | null;
  reporter: string;
  status: 'pending' | 'accepted' | 'assigned' | 'completed' | 'rejected';
  image: string;
  collector?: string;
  completedTime?: string;
}

export interface FiltersState {
  area: string;
  type: string;
  weight: string;
}
