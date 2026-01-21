export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

export interface ScheduledReport {
  id: string;
  name: string;
  frequency: string;
  recipients: string;
  lastRun: string;
}
