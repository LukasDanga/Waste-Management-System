import { API_CONFIG } from '../../config/api.config';

export interface RegisterCitizenRequest {
  email: string;
  fullName: string;
  gender: string;
  dob: string; // ISO string with time
  password: string;
  displayName: string;
  avatarName: string;
}

export interface RegisterEnterpriseRequest {
  email: string;
  fullName: string;
  gender: string;
  dob: string; // ISO date string
  password: string;
  name: string;
  tin: string;
  avatarName: string;
  address: string;
  contactInfo: string;
}

export interface CreateReportRequest {
  wasteType: string;
  description: string;
  latitude: number;
  longitude: number;
  imageName: string;
}

export interface WasteTypeItem {
  type: string;
  description: string;
}

export interface CitizenReportItem {
  collectionReportID: string;
  wasteType: string;
  description: string;
  gps: {
    latitude: number;
    longitude: number;
  };
  regionCode: string;
  imageName: string;
  status: number;
  reportAt: string;
  citizenProfileID: string;
  citizenName?: string;
}

export interface CitizenProfileResponse {
  collectionReports: CitizenReportItem[];
  complaintReports: any[];
  rewardHistories: any[];
}

export interface ProfilePagingParams {
  CollectionReportPageIndex?: number;
  CollectionReportPageSize?: number;
  ComplaintReportPageIndex?: number;
  ComplaintReportPageSize?: number;
  RewardHistoryPageIndex?: number;
  RewardHistoryPageSize?: number;
}

export interface ComplaintReportRequest {
  collectionReportID: string;
  title: string;
  description: string;
  imageName: string;
}

const getAuthHeaders = (): Record<string, string> => {
  const rawToken = localStorage.getItem('ecowaste_access_token');
  const token = rawToken ? rawToken.replace(/^"|"$/g, '') : '';
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export async function registerCitizen(payload: RegisterCitizenRequest) {
  const res = await fetch(`${API_CONFIG.BASE_URL}/citizen/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Đăng ký thất bại';
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

export async function registerEnterprise(payload: RegisterEnterpriseRequest) {
  const res = await fetch(`${API_CONFIG.BASE_URL}/enterprise/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Đăng ký thất bại';
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

export async function fetchWasteTypes(): Promise<WasteTypeItem[]> {
  const res = await fetch(`${API_CONFIG.BASE_URL}/enterprise/enterprises/waste-type`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    let message = 'Không tải được danh sách loại rác';
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
  return list.map((item: any) => ({
    type: item?.type || item?.code || '',
    description: item?.description || item?.name || '',
  })).filter((i) => i.type);
}

export async function fetchCitizenReports(params?: { regionCode?: string; wasteType?: string; description?: string; }) {
  const query = new URLSearchParams();
  if (params?.regionCode) query.set('RegionCode', params.regionCode);
  if (params?.wasteType) query.set('WasteType', params.wasteType);
  if (params?.description) query.set('Description', params.description);

  const url = `${API_CONFIG.BASE_URL}/citizen/citizens/collection-report${query.toString() ? `?${query.toString()}` : ''}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    let message = 'Không tải được danh sách báo cáo';
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
  if (!Array.isArray(list)) return [] as CitizenReportItem[];
  return list as CitizenReportItem[];
}

export async function fetchCitizenProfile(params?: ProfilePagingParams): Promise<CitizenProfileResponse> {
  const query = new URLSearchParams();
  const defaults: ProfilePagingParams = {
    CollectionReportPageIndex: 0,
    CollectionReportPageSize: 10,
    ComplaintReportPageIndex: 0,
    ComplaintReportPageSize: 10,
    RewardHistoryPageIndex: 0,
    RewardHistoryPageSize: 10,
  };

  const finalParams = { ...defaults, ...params };
  Object.entries(finalParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) query.set(key, String(value));
  });

  const url = `${API_CONFIG.BASE_URL}/citizen/citizens/my-profile${query.toString() ? `?${query.toString()}` : ''}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    let message = 'Không tải được thông tin người dùng';
    try {
      const body = await res.json();
      message = body?.message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  const data = await res.json();
  const payload = data?.payload || data?.data || data;
  return {
    collectionReports: Array.isArray(payload?.collectionReports) ? payload.collectionReports : [],
    complaintReports: Array.isArray(payload?.complaintReports) ? payload.complaintReports : [],
    rewardHistories: Array.isArray(payload?.rewardHistories) ? payload.rewardHistories : [],
  };
}

export async function uploadReportImage(file: File, purpose = 'CollectionReport') {
  const fieldCandidates = ['file', 'image', 'images', 'fileUpload'];
  let lastError = 'Tải ảnh lên thất bại';

  for (const field of fieldCandidates) {
    const formData = new FormData();
    formData.append(field, file);
    formData.append('purpose', purpose);

    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/media/image/images`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
        },
        body: formData,
      });

      if (!res.ok) {
        try {
          const body = await res.json();
          lastError = `${field}: ${body?.message || body?.error || `${res.status} ${res.statusText}`}`;
        } catch {
          try {
            const text = await res.text();
            lastError = `${field}: ${text || `${res.status} ${res.statusText}`}`;
          } catch {
            lastError = `${field}: ${res.status} ${res.statusText}`;
          }
        }
        continue;
      }

      const data = await res.json();
      const name = data?.payload?.imageName || data?.payload?.name || data?.payload || data?.name;
      if (!name) {
        lastError = `${field}: Không nhận được tên ảnh`;
        continue;
      }
      return String(name);
    } catch (err) {
      lastError = `${field}: ${err instanceof Error ? err.message : 'Tải ảnh lên thất bại'}`;
    }
  }

  throw new Error(lastError);
}

export async function createCitizenReport(payload: CreateReportRequest) {
  const res = await fetch(`${API_CONFIG.BASE_URL}/citizen/citizens/collection-report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Tạo báo cáo thất bại';
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

export async function createComplaintReport(payload: ComplaintReportRequest) {
  const res = await fetch(`${API_CONFIG.BASE_URL}/citizen/citizens/complaint-report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Gửi khiếu nại thất bại';
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
