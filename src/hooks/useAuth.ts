/**
 * EcoWaste - useAuth Hook
 * Custom hook for authentication management
 */

import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api.service';
import { STORAGE_KEYS, DEMO_ACCOUNTS } from '../constants';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils/helpers';
import type { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      const token = getLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, null);
      const userData = getLocalStorage(STORAGE_KEYS.USER_DATA, null);

      if (token && userData) {
        setAuthState({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = useCallback(async (username: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Check if it's a demo account
      const isDemoAccount = Object.values(DEMO_ACCOUNTS).some(
        (account) => account.username === username && account.password === password
      );

      if (isDemoAccount) {
        // Mock login for demo accounts
        const demoAccount = Object.values(DEMO_ACCOUNTS).find(
          (account) => account.username === username
        );

        const mockUser: User = {
          id: `demo-${demoAccount?.role}`,
          username: username,
          email: `${username}@ecowaste.vn`,
          name: getDemoUserName(demoAccount?.role as UserRole),
          role: demoAccount?.role as UserRole,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'active',
        };

        const mockToken = `demo-token-${demoAccount?.role}`;

        setLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, mockToken);
        setLocalStorage(STORAGE_KEYS.USER_DATA, mockUser);

        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return { success: true, user: mockUser };
      }

      // Real API login (when backend is ready)
      const response = await authService.login({ username, password });

      if (response.success && response.data) {
        const { user, token } = response.data;

        setLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, token);
        setLocalStorage(STORAGE_KEYS.USER_DATA, user);

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return { success: true, user };
      }

      throw new Error(response.message || 'Đăng nhập thất bại');
    } catch (error: any) {
      const errorMessage = error.message || 'Tên đăng nhập hoặc mật khẩu không đúng';
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Call API logout (when backend is ready)
      // await authService.logout();

      removeLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
      removeLocalStorage(STORAGE_KEYS.REFRESH_TOKEN);
      removeLocalStorage(STORAGE_KEYS.USER_DATA);

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Logout error:', error);
      
      // Even if API call fails, clear local storage
      removeLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
      removeLocalStorage(STORAGE_KEYS.REFRESH_TOKEN);
      removeLocalStorage(STORAGE_KEYS.USER_DATA);

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      return { success: false, error: error.message };
    }
  }, []);

  // Update user function
  const updateUser = useCallback((userData: Partial<User>) => {
    setAuthState((prev) => {
      if (!prev.user) return prev;

      const updatedUser = { ...prev.user, ...userData };
      setLocalStorage(STORAGE_KEYS.USER_DATA, updatedUser);

      return {
        ...prev,
        user: updatedUser,
      };
    });
  }, []);

  // Check if user has role
  const hasRole = useCallback(
    (role: UserRole | UserRole[]) => {
      if (!authState.user) return false;

      if (Array.isArray(role)) {
        return role.includes(authState.user.role);
      }

      return authState.user.role === role;
    },
    [authState.user]
  );

  // Refresh token function
  const refreshToken = useCallback(async () => {
    try {
      const response = await authService.refreshToken();

      if (response.success && response.data) {
        const { token } = response.data;
        setLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, token);
        return { success: true };
      }

      throw new Error('Failed to refresh token');
    } catch (error: any) {
      // If refresh fails, logout user
      await logout();
      return { success: false, error: error.message };
    }
  }, [logout]);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
    updateUser,
    hasRole,
    refreshToken,
  };
};

// Helper function to get demo user name
const getDemoUserName = (role: UserRole): string => {
  const nameMap: Record<UserRole, string> = {
    citizen: 'Nguyễn Văn A',
    enterprise: 'Green Recycle Co., Ltd',
    collector: 'Nguyễn Văn B',
    admin: 'Quản Trị Viên',
  };

  return nameMap[role] || 'Demo User';
};
