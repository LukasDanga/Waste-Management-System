export type TaskStatus = "pending" | "on-the-way" | "completed";

// Status code mapping from API: 1=pending, 2=on-the-way, 3=completed
export const STATUS_CODE_MAP: Record<number, TaskStatus> = {
  1: "pending",
  2: "on-the-way",
  3: "completed",
};

export const STATUS_CODE_REVERSE: Record<TaskStatus, number> = {
  pending: 1,
  "on-the-way": 2,
  completed: 3,
};

export interface Task {
  collectionTaskID: string;
  collectionReportID: string;
  note: string | null;
  imageName: string | null;
  amountEstimated: number;
  statusCode: number;
  status: TaskStatus;
  assignedAt: string;
  startedAt: string;
  completedAt: string | null;
  collectorProfileID: string;
}

export interface MyTasksProps {
  onNavigate: (page: string, taskId?: string, task?: Task) => void;
}
