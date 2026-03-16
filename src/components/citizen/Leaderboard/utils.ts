import { API_CONFIG } from '@/config/api.config';

export function getAvatarUrl(avatarName: string | undefined): string {
  const base = (API_CONFIG.IMAGE_BASE_URL || API_CONFIG.BASE_URL || '').replace(/\/+$/, '');
  if (!avatarName || avatarName === 'default_avatar') return '';
  if (/^https?:\/\//i.test(avatarName)) return avatarName;
  return `${base}/${avatarName}`;
}

export function getDisplayInitial(name: string): string {
  const trimmed = (name || '').trim();
  if (!trimmed) return '?';
  const first = trimmed.charAt(0).toUpperCase();
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    const last = parts[parts.length - 1].charAt(0).toUpperCase();
    return first + last;
  }
  return first;
}
