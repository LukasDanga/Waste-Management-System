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
  [key: string]: unknown;
}

export interface EnterpriseMember {
  memberID: string;
  userID: string;
  assignedAt: string;
  unassignedAt: string;
  enterpriseID: string;
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
