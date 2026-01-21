export interface AiClassification {
  type: string;
  confidence: number;
  confirmed: boolean;
}

export interface ReportFormData {
  wasteType: string;
  location: string;
  description: string;
  weight: number;
}
