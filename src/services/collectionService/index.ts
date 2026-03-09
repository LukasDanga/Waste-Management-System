import { API_CONFIG } from "../../config/api.config";

export interface CollectionTask {
  collectionTaskID: string;
  collectionReportID: string;
  note: string | null;
  imageName: string | null;
  amountEstimated: number;
  status: number;
  assignedAt: string;
  startedAt: string;
  completedAt: string | null;
  collectorProfileID: string;
}

export interface MyCollectionTasksResponse {
  success: boolean;
  payload: CollectionTask[];
  timestamp: string;
}

export interface GetMyCollectionTasksParams {
  PageIndex: number;
  PageLength: number;
  SortBy?: string;
  AssignedAt?: string;
  StartAt?: string;
  Status?: string;
}

const getAuthHeaders = (): Record<string, string> => {
  const rawToken = localStorage.getItem("ecowaste_access_token");
  const token = rawToken ? rawToken.replace(/^"|"$/g, "") : "";
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export async function getMyCollectionTasks(
  params: GetMyCollectionTasksParams,
): Promise<MyCollectionTasksResponse> {
  const query = new URLSearchParams();
  query.set("SortBy", params.SortBy ?? "");
  query.set("PageIndex", String(params.PageIndex));
  query.set("PageLength", String(params.PageLength));
  query.set("AssignedAt", params.AssignedAt ?? "");
  query.set("StartAt", params.StartAt ?? "");
  query.set("Status", params.Status ?? "");

  const res = await fetch(
    `${API_CONFIG.BASE_URL}/collection/collections/my-collection-task?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const msg: string = error?.message ?? "";
    if (
      res.status === 500 &&
      msg.toLowerCase().includes("not found or empty")
    ) {
      return {
        success: true,
        payload: [],
        timestamp: new Date().toISOString(),
      };
    }
    throw new Error(msg || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export interface SubmitProofRequest {
  collectionTaskID: string;
  imageName: string;
  amountEstimated: number;
  note: string;
}

export interface SubmitProofResponse {
  success: boolean;
  payload: string;
  timestamp: string;
}

export async function submitProof(
  payload: SubmitProofRequest,
): Promise<SubmitProofResponse> {
  const res = await fetch(
    `${API_CONFIG.BASE_URL}/collection/collections/submit-proof`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      error?.message || `Request failed with status ${res.status}`,
    );
  }

  return res.json();
}
