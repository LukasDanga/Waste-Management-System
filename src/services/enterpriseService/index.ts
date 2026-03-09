import { API_CONFIG } from '../../config/api.config';

export interface CreateCollectorRequest {
  contactInfo: string;
  email: string;
  fullName: string;
  gender: string;
  dob: string;
  password: string;
}

const getAuthHeaders = (): Record<string, string> => {
  const rawToken = localStorage.getItem('ecowaste_access_token');
  const token = rawToken ? rawToken.replace(/^"|"$/g, '') : '';
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export async function createCollector(payload: CreateCollectorRequest) {
  const res = await fetch(`${API_CONFIG.BASE_URL}/enterprise/enterprises/member`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Tạo collector thất bại';
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