export type TaskStatus = 'pending' | 'on-the-way' | 'completed';

export interface Task {
  id: string;
  reportId: string;
  address: string;
  type: string;
  weight: string;
  scheduledTime?: string;
  distance: string;
  status: TaskStatus;
  image?: string;
}

export interface MyTasksProps {
  onNavigate: (page: string, taskId?: string) => void;
}
