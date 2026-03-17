export interface RequestItem {
  collectionReportID: string;
  id: string;
  regionCode: string;
  type: string;
  typeLabel: string;
  timeAgo: string;
  reportAt: string;
  priority: "high" | "medium" | "low";
  priorityLabel: string;
  aiReason: string | null;
  reporter: string;
  citizenProfileID: string;
  description: string;
  statusCode: number; // 0=pending, 1=accepted/assigned, 2=rejected
  status: "pending" | "accepted" | "rejected";
  image: string;
  imageName: string;
  gps?: { latitude: number; longitude: number };
}

export interface FiltersState {
  area: string;
  type: string;
}
