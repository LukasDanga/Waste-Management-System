/**
 * EcoWaste - Validation Schemas
 * Form validation schemas using Zod or custom validators
 */

import { VALIDATION, REGEX_PATTERNS } from '../constants';

// ==================== AUTH VALIDATORS ====================

export const validateLogin = (username: string, password: string): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!username || username.trim().length === 0) {
    errors.username = 'Tên đăng nhập không được để trống';
  } else if (username.length < VALIDATION.MIN_USERNAME_LENGTH) {
    errors.username = `Tên đăng nhập phải có ít nhất ${VALIDATION.MIN_USERNAME_LENGTH} ký tự`;
  } else if (username.length > VALIDATION.MAX_USERNAME_LENGTH) {
    errors.username = `Tên đăng nhập không được quá ${VALIDATION.MAX_USERNAME_LENGTH} ký tự`;
  }

  if (!password || password.trim().length === 0) {
    errors.password = 'Mật khẩu không được để trống';
  } else if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    errors.password = `Mật khẩu phải có ít nhất ${VALIDATION.MIN_PASSWORD_LENGTH} ký tự`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'Email không được để trống' };
  }

  if (!REGEX_PATTERNS.EMAIL.test(email)) {
    return { valid: false, error: 'Email không hợp lệ' };
  }

  return { valid: true };
};

export const validatePhone = (phone: string): { valid: boolean; error?: string } => {
  if (!phone || phone.trim().length === 0) {
    return { valid: false, error: 'Số điện thoại không được để trống' };
  }

  if (!REGEX_PATTERNS.PHONE.test(phone)) {
    return { valid: false, error: 'Số điện thoại không hợp lệ' };
  }

  return { valid: true };
};

export const validatePassword = (password: string): { valid: boolean; error?: string; strength?: string } => {
  if (!password || password.trim().length === 0) {
    return { valid: false, error: 'Mật khẩu không được để trống' };
  }

  if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    return { valid: false, error: `Mật khẩu phải có ít nhất ${VALIDATION.MIN_PASSWORD_LENGTH} ký tự` };
  }

  if (password.length > VALIDATION.MAX_PASSWORD_LENGTH) {
    return { valid: false, error: `Mật khẩu không được quá ${VALIDATION.MAX_PASSWORD_LENGTH} ký tự` };
  }

  // Calculate strength
  let strength = 'weak';
  if (password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
    strength = 'medium';
  }
  if (password.length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
    strength = 'strong';
  }

  return { valid: true, strength };
};

// ==================== REPORT VALIDATORS ====================

export const validateReportTitle = (title: string): { valid: boolean; error?: string } => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Tiêu đề không được để trống' };
  }

  if (title.length < 5) {
    return { valid: false, error: 'Tiêu đề phải có ít nhất 5 ký tự' };
  }

  if (title.length > 100) {
    return { valid: false, error: 'Tiêu đề không được quá 100 ký tự' };
  }

  return { valid: true };
};

export const validateReportDescription = (description: string): { valid: boolean; error?: string } => {
  if (!description || description.trim().length === 0) {
    return { valid: false, error: 'Mô tả không được để trống' };
  }

  if (description.length < 10) {
    return { valid: false, error: 'Mô tả phải có ít nhất 10 ký tự' };
  }

  if (description.length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
    return { valid: false, error: `Mô tả không được quá ${VALIDATION.MAX_DESCRIPTION_LENGTH} ký tự` };
  }

  return { valid: true };
};

export const validateLocation = (address: string, lat?: number, lng?: number): { valid: boolean; error?: string } => {
  if (!address || address.trim().length === 0) {
    return { valid: false, error: 'Địa chỉ không được để trống' };
  }

  if (lat !== undefined && lng !== undefined) {
    if (lat < -90 || lat > 90) {
      return { valid: false, error: 'Vĩ độ không hợp lệ' };
    }
    if (lng < -180 || lng > 180) {
      return { valid: false, error: 'Kinh độ không hợp lệ' };
    }
  }

  return { valid: true };
};

// ==================== FILE VALIDATORS ====================

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > VALIDATION.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File quá lớn. Kích thước tối đa ${VALIDATION.MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  // Check file type
  if (!VALIDATION.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Định dạng file không được hỗ trợ. Chỉ chấp nhận: JPG, PNG, WEBP',
    };
  }

  return { valid: true };
};

export const validateImageFiles = (files: File[]): { valid: boolean; error?: string } => {
  if (!files || files.length === 0) {
    return { valid: false, error: 'Vui lòng chọn ít nhất 1 ảnh' };
  }

  if (files.length > VALIDATION.MAX_IMAGES_PER_REPORT) {
    return {
      valid: false,
      error: `Chỉ được tải lên tối đa ${VALIDATION.MAX_IMAGES_PER_REPORT} ảnh`,
    };
  }

  for (const file of files) {
    const result = validateImageFile(file);
    if (!result.valid) {
      return result;
    }
  }

  return { valid: true };
};

// ==================== PROFILE VALIDATORS ====================

export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  if (!username || username.trim().length === 0) {
    return { valid: false, error: 'Tên đăng nhập không được để trống' };
  }

  if (username.length < VALIDATION.MIN_USERNAME_LENGTH) {
    return { valid: false, error: `Tên đăng nhập phải có ít nhất ${VALIDATION.MIN_USERNAME_LENGTH} ký tự` };
  }

  if (username.length > VALIDATION.MAX_USERNAME_LENGTH) {
    return { valid: false, error: `Tên đăng nhập không được quá ${VALIDATION.MAX_USERNAME_LENGTH} ký tự` };
  }

  if (!REGEX_PATTERNS.USERNAME.test(username)) {
    return { valid: false, error: 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới' };
  }

  return { valid: true };
};

export const validateName = (name: string): { valid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Họ tên không được để trống' };
  }

  if (name.length < 2) {
    return { valid: false, error: 'Họ tên phải có ít nhất 2 ký tự' };
  }

  if (name.length > 100) {
    return { valid: false, error: 'Họ tên không được quá 100 ký tự' };
  }

  return { valid: true };
};

// ==================== COMPOSITE VALIDATORS ====================

export const validateCreateReport = (data: {
  title: string;
  description: string;
  wasteType: string;
  address: string;
  images: File[];
}): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  const titleResult = validateReportTitle(data.title);
  if (!titleResult.valid) {
    errors.title = titleResult.error!;
  }

  const descriptionResult = validateReportDescription(data.description);
  if (!descriptionResult.valid) {
    errors.description = descriptionResult.error!;
  }

  if (!data.wasteType) {
    errors.wasteType = 'Vui lòng chọn loại rác';
  }

  const locationResult = validateLocation(data.address);
  if (!locationResult.valid) {
    errors.address = locationResult.error!;
  }

  const imagesResult = validateImageFiles(data.images);
  if (!imagesResult.valid) {
    errors.images = imagesResult.error!;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegister = (data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
}): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  const usernameResult = validateUsername(data.username);
  if (!usernameResult.valid) {
    errors.username = usernameResult.error!;
  }

  const emailResult = validateEmail(data.email);
  if (!emailResult.valid) {
    errors.email = emailResult.error!;
  }

  const passwordResult = validatePassword(data.password);
  if (!passwordResult.valid) {
    errors.password = passwordResult.error!;
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
  }

  const nameResult = validateName(data.name);
  if (!nameResult.valid) {
    errors.name = nameResult.error!;
  }

  if (data.phone) {
    const phoneResult = validatePhone(data.phone);
    if (!phoneResult.valid) {
      errors.phone = phoneResult.error!;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

// ==================== SANITIZATION ====================

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

export const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');
};
