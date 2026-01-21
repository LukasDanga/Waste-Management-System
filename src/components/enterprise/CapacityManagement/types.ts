export interface WasteType {
  type: string;
  label: string;
  registered: boolean;
  capacity: number;
  currentUsage: number;
  unit: string;
}

export interface ServiceArea {
  id: string;
  label: string;
  checked: boolean;
}
