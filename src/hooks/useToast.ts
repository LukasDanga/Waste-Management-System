/**
 * EcoWaste - useToast Hook
 * Custom hook for toast notifications
 */

import { toast } from 'sonner@2.0.3';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';

export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  };

  const success = (message: string = SUCCESS_MESSAGES.SUCCESS_MESSAGE) => {
    toast.success(message);
  };

  const error = (message: string = ERROR_MESSAGES.SERVER_ERROR) => {
    toast.error(message);
  };

  const info = (message: string) => {
    toast(message);
  };

  const warning = (message: string) => {
    toast.warning(message);
  };

  const loading = (message: string = 'Đang xử lý...') => {
    return toast.loading(message);
  };

  const promise = <T,>(
    promise: Promise<T>,
    {
      loading: loadingMessage = 'Đang xử lý...',
      success: successMessage = SUCCESS_MESSAGES.SUCCESS_MESSAGE,
      error: errorMessage = ERROR_MESSAGES.SERVER_ERROR,
    }
  ) => {
    return toast.promise(promise, {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    });
  };

  return {
    showToast,
    success,
    error,
    info,
    warning,
    loading,
    promise,
  };
};

// Predefined toast messages for common actions
export const toastMessages = {
  // Auth
  loginSuccess: () => toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS),
  logoutSuccess: () => toast.success(SUCCESS_MESSAGES.LOGOUT_SUCCESS),
  registerSuccess: () => toast.success(SUCCESS_MESSAGES.REGISTER_SUCCESS),
  sessionExpired: () => toast.error(ERROR_MESSAGES.SESSION_EXPIRED),
  invalidCredentials: () => toast.error(ERROR_MESSAGES.INVALID_CREDENTIALS),

  // CRUD operations
  createSuccess: (item: string = 'mục') => toast.success(`Tạo ${item} thành công!`),
  updateSuccess: (item: string = 'mục') => toast.success(`Cập nhật ${item} thành công!`),
  deleteSuccess: (item: string = 'mục') => toast.success(`Xóa ${item} thành công!`),
  saveSuccess: () => toast.success(SUCCESS_MESSAGES.SAVE_SUCCESS),

  // Errors
  networkError: () => toast.error(ERROR_MESSAGES.NETWORK_ERROR),
  serverError: () => toast.error(ERROR_MESSAGES.SERVER_ERROR),
  validationError: () => toast.error(ERROR_MESSAGES.VALIDATION_ERROR),
  unauthorized: () => toast.error(ERROR_MESSAGES.UNAUTHORIZED),
  notFound: () => toast.error(ERROR_MESSAGES.NOT_FOUND),

  // File operations
  fileTooLarge: () => toast.error(ERROR_MESSAGES.FILE_TOO_LARGE),
  invalidFileType: () => toast.error(ERROR_MESSAGES.INVALID_FILE_TYPE),
  uploadSuccess: () => toast.success('Tải lên thành công!'),
  uploadError: () => toast.error('Tải lên thất bại!'),

  // Report operations
  reportCreated: () => toast.success('Báo cáo đã được tạo thành công!'),
  reportUpdated: () => toast.success('Báo cáo đã được cập nhật!'),
  reportDeleted: () => toast.success('Báo cáo đã được xóa!'),
  reportAssigned: () => toast.success('Báo cáo đã được phân công!'),

  // Task operations
  taskAccepted: () => toast.success('Đã nhận công việc!'),
  taskCompleted: () => toast.success('Công việc đã hoàn thành!'),
  taskUpdated: () => toast.success('Công việc đã được cập nhật!'),

  // Points & Rewards
  pointsEarned: (points: number) => toast.success(`Bạn đã nhận được ${points} điểm!`),
  rewardRedeemed: () => toast.success('Đổi thưởng thành công!'),
  
  // Clipboard
  copiedToClipboard: () => toast.success('Đã sao chép vào clipboard!'),
  copyFailed: () => toast.error('Không thể sao chép!'),
};
