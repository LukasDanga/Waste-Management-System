export type ComplaintSeverity = 'high' | 'medium' | 'low';
export type ComplaintStatus = 'new' | 'in-progress' | 'resolved' | 'closed';

export interface Complaint {
  id: string;
  complaintId: string;
  sender: {
    name: string;
    role: string;
  };
  relatedTo: string;
  against: string;
  issue: string;
  severity: ComplaintSeverity;
  status: ComplaintStatus;
  createdAt: string;
  description?: string;
  /** Ảnh đính kèm (tên file hoặc URL) */
  imageName?: string;
  /** Ghi chú của admin khi đã xử lý */
  adminNote?: string | null;
}
