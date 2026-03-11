import { API_CONFIG } from "../../config/api.config";
export interface BonusRule {
  [key: string]: unknown;
}

export interface PenaltyRule {
  [key: string]: unknown;
}

export interface RewardPolicy {
  rewardPolicyID: string;
  name: string;
  description: string;
  basePoint: number;
  effectiveDate: string;
  expiredDate: string;
  bonusRules: BonusRule[];
  penaltyRules: PenaltyRule[];
  enterpriseID: string;
}
export interface Capacity {
  capacityID: string;
  maxDailyCapacity: number;
  regionCode: string;
  unitOfMeasure: number; // DEFAULT: 0, do not change
  currentLoad: number;
  createdAt: string;
  closedAt: string;
  collectionAssignments: any[];
  wasteType: string;
  enterpriseID: string;
}

export interface UserInformation {
  userID: string;
  fullName: string;
  email: string;
  gender: string;
  dob: string;
  isActive: boolean;
  createdBy: string;
}

export interface EnterpriseMember {
  memberID: string;
  userID: string;
  assignedAt: string;
  unassignedAt: string;
  enterpriseID: string;
  userInformation: UserInformation;
}

export interface EnterpriseProfile {
  enterpriseID: string;
  userID: string;
  name: string;
  tin: string;
  avatarName: string;
  address: string;
  contactInfo: string;
  createdAt: string;
  isActive: boolean;
  rewardPolicies: RewardPolicy[];
  capacities: Capacity[];
  members: EnterpriseMember[];
}

export interface EnterpriseProfileResponse {
  success: boolean;
  payload: EnterpriseProfile;
  timestamp: string;
}
export interface CreateCollectorRequest {
  contactInfo: string;
  email: string;
  fullName: string;
  gender: string;
  dob: string;
  password: string;
}

export interface CreateRewardPolicyRequest {
  name: string;
  description: string;
  basePoint: number;
}

export interface CitizenArea {
  citizenAreaID: string;
  name: string;
  regionCode: string;
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  isActive: boolean;
}

export interface CreateCapacityRequest {
  maxDailyCapacity: number;
  regionCode: string;
  unitOfMeasure: number; // DEFAULT: 0, do not change
  wasteType: string;
}

const getAuthHeaders = (): Record<string, string> => {
  const rawToken = localStorage.getItem("ecowaste_access_token");
  const token = rawToken ? rawToken.replace(/^"|"$/g, "") : "";
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export async function createCollector(payload: CreateCollectorRequest) {
  const res = await fetch(
    `${API_CONFIG.BASE_URL}/enterprise/enterprises/member`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    let message = "Tạo collector thất bại";
    try {
      const body = await res.json();
      message = body?.message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function getMyProfile(): Promise<EnterpriseProfileResponse> {
  const res = await fetch(
    `${API_CONFIG.BASE_URL}/enterprise/enterprises/my-profile`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...getAuthHeaders(),
      },
    },
  );

  if (!res.ok) {
    let message = "Lấy thông tin doanh nghiệp thất bại";
    try {
      const body = await res.json();
      message = body?.message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  return res.json();
}
export async function createRewardPolicy(payload: CreateRewardPolicyRequest) {
  const res = await fetch(
    `${API_CONFIG.BASE_URL}/enterprise/enterprises/reward-policy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    let message = "Tạo chính sách điểm thưởng thất bại";
    try {
      const body = await res.json();
      message = body?.message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchAreas(): Promise<CitizenArea[]> {
  const res = await fetch(`${API_CONFIG.BASE_URL}/citizen/citizens/area`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    let message = "Không tải được danh sách khu vực";
    try {
      const body = await res.json();
      message = body?.message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  const data = await res.json();
  const list = data?.payload || data?.data || data;
  if (!Array.isArray(list)) return [];
  return list as CitizenArea[];
}

export async function createCapacity(payload: CreateCapacityRequest) {
  const res = await fetch(
    `${API_CONFIG.BASE_URL}/enterprise/enterprises/capacity`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    let message = "Tạo năng lực thu gom thất bại";
    try {
      const body = await res.json();
      message = body?.message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

export interface CreateCollectionAssignmentRequest {
  collectionReportID: string;
  capacityID: string;
  assigneeID: string; // userID của member
  priority: number; // High: 0, Medium: 1, Low: 2
  wasteType: string;
  isCorrected: boolean; // so sánh loại rác trong báo cáo citizen với loại thực tế
  note: string;
  bonusRuleIDs: string[];
  penaltyRuleIDs: string[];
}

export async function createCollectionAssignment(
  payload: CreateCollectionAssignmentRequest,
) {
  const res = await fetch(
    `${API_CONFIG.BASE_URL}/enterprise/enterprises/collection-assignment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    let message = "Tạo phân công thu gom thất bại";
    try {
      const body = await res.json();
      message = body?.message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}
