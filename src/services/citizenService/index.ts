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

export async function uploadReportImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_CONFIG.BASE_URL}/media/image/images`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Tải ảnh lên thất bại');
  }

  const data = await res.json();
  // Expecting API to return { payload: { name: string } } or similar
  const name = data?.payload?.name || data?.payload || data?.name;
  if (!name) throw new Error('Không nhận được tên ảnh');
  return String(name);
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
