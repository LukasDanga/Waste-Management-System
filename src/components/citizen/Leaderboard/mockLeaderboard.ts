import type { CitizenArea, LeaderboardEntry } from '@/services/citizenService';

/** ID cố định cho khu vực Thanh Hóa (mock) */
export const MOCK_THANH_HOA_AREA_ID = 'mock-thanh-hoa-area-id';

/** Khu vực Thanh Hóa - mock */
export const MOCK_AREA_THANH_HOA: CitizenArea = {
  citizenAreaID: MOCK_THANH_HOA_AREA_ID,
  name: 'Thanh Hóa',
  regionCode: 'VN-THO',
  isActive: true,
};

/** Bảng xếp hạng mock - 10 công dân khu vực Thanh Hóa */
export const MOCK_LEADERBOARD_THANH_HOA: LeaderboardEntry[] = [
  { rank: 1, citizenProfileID: 'mock-th-1', displayName: 'Nguyễn Văn An', avatarName: 'default_avatar', totalPoints: 320 },
  { rank: 2, citizenProfileID: 'mock-th-2', displayName: 'Trần Thị Bình', avatarName: 'default_avatar', totalPoints: 285 },
  { rank: 3, citizenProfileID: 'mock-th-3', displayName: 'Lê Minh Cường', avatarName: 'default_avatar', totalPoints: 250 },
  { rank: 4, citizenProfileID: 'mock-th-4', displayName: 'Phạm Thu Hà', avatarName: 'default_avatar', totalPoints: 218 },
  { rank: 5, citizenProfileID: 'mock-th-5', displayName: 'Hoàng Đức Dũng', avatarName: 'default_avatar', totalPoints: 195 },
  { rank: 6, citizenProfileID: 'mock-th-6', displayName: 'Vũ Thị Hương', avatarName: 'default_avatar', totalPoints: 172 },
  { rank: 7, citizenProfileID: 'mock-th-7', displayName: 'Đặng Quang Khải', avatarName: 'default_avatar', totalPoints: 148 },
  { rank: 8, citizenProfileID: 'mock-th-8', displayName: 'Bùi Minh Tuấn', avatarName: 'default_avatar', totalPoints: 125 },
  { rank: 9, citizenProfileID: 'mock-th-9', displayName: 'Đỗ Thị Lan', avatarName: 'default_avatar', totalPoints: 98 },
  { rank: 10, citizenProfileID: 'mock-th-10', displayName: 'Phan Văn Đạt', avatarName: 'default_avatar', totalPoints: 76 },
];
