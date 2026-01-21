# EcoWaste - Internationalization (i18n)

## 📚 Tổng quan

Hệ thống đa ngôn ngữ của EcoWaste sử dụng `i18next` và `react-i18next` để hỗ trợ:
- 🇻🇳 Tiếng Việt (mặc định)
- 🇬🇧 Tiếng Anh

## 📁 Cấu trúc

```
/i18n
├── config.ts           # i18n configuration
├── locales/
│   ├── vi.ts          # Vietnamese translations
│   └── en.ts          # English translations
└── README.md          # This file
```

## 🚀 Sử dụng

### 1. Trong Components

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('homepage.hero.title')}</p>
    </div>
  );
}
```

### 2. Sử dụng Custom Hook

```typescript
import { useLanguage } from '@/hooks';

function MyComponent() {
  const { 
    t,                    // Translation function
    currentLanguage,      // 'vi' or 'en'
    isVietnamese,         // boolean
    isEnglish,            // boolean
    changeLanguage,       // (lang: 'vi' | 'en') => void
    toggleLanguage        // () => void
  } = useLanguage();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button onClick={toggleLanguage}>
        {currentLanguage === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
      </button>
    </div>
  );
}
```

### 3. Với Parameters

```typescript
// Vietnamese: "Tối thiểu 8 ký tự"
// English: "Minimum 8 characters"
t('validation.minLength', { count: 8 })

// Vietnamese: "5 phút trước"
// English: "5 minutes ago"
t('dateTime.minutesAgo', { count: 5 })
```

### 4. Language Switcher Component

Đã tạo sẵn 2 variants:

#### a. Dropdown Menu (Recommended)
```typescript
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

#### b. Simple Toggle Button
```typescript
import { LanguageToggle } from '@/components/LanguageSwitcher';

function Header() {
  return (
    <header>
      <LanguageToggle />
    </header>
  );
}
```

## 📝 Thêm Translation Keys Mới

### 1. Thêm vào file locales

**vi.ts:**
```typescript
export const vi = {
  // Existing keys...
  myNewSection: {
    title: 'Tiêu đề mới',
    description: 'Mô tả mới',
  },
};
```

**en.ts:**
```typescript
export const en = {
  // Existing keys...
  myNewSection: {
    title: 'New Title',
    description: 'New Description',
  },
};
```

### 2. Sử dụng trong component

```typescript
function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('myNewSection.title')}</h1>
      <p>{t('myNewSection.description')}</p>
    </div>
  );
}
```

## 🗂️ Translation Keys Có Sẵn

### Common
- `common.appName` - Tên ứng dụng
- `common.welcome` - Chào mừng
- `common.loading` - Đang tải...
- `common.save`, `common.cancel`, `common.delete`, etc.

### Navigation
- `nav.home` - Trang chủ
- `nav.dashboard` - Bảng điều khiển
- `nav.reports` - Báo cáo
- `nav.tasks` - Công việc

### Auth
- `auth.login` - Đăng nhập
- `auth.username` - Tên đăng nhập
- `auth.password` - Mật khẩu
- `auth.loginSuccess` - Đăng nhập thành công!

### Roles
- `roles.citizen` - Người dân
- `roles.enterprise` - Doanh nghiệp
- `roles.collector` - Nhân viên thu gom
- `roles.admin` - Quản trị viên

### Waste Types
- `wasteTypes.recyclable` - Tái chế
- `wasteTypes.organic` - Hữu cơ
- `wasteTypes.hazardous` - Nguy hại
- `wasteTypes.electronic` - Điện tử

### Status
- `status.pending` - Chờ xử lý
- `status.completed` - Hoàn thành
- `status.cancelled` - Đã hủy

### Priority
- `priority.low` - Thấp
- `priority.high` - Cao
- `priority.urgent` - Khẩn cấp

### Messages
- `messages.loginSuccess` - Đăng nhập thành công!
- `messages.error` - Đã có lỗi xảy ra
- `messages.confirmDelete` - Bạn có chắc muốn xóa?

### Validation
- `validation.required` - Trường này là bắt buộc
- `validation.invalidEmail` - Email không hợp lệ
- `validation.minLength` - Tối thiểu {{count}} ký tự

## 🎯 Best Practices

### 1. Luôn sử dụng translation keys
❌ **Bad:**
```typescript
<button>Đăng nhập</button>
```

✅ **Good:**
```typescript
<button>{t('auth.login')}</button>
```

### 2. Tổ chức keys theo modules
```typescript
const vi = {
  citizen: {
    dashboard: 'Bảng điều khiển',
    createReport: 'Tạo báo cáo',
  },
  enterprise: {
    dashboard: 'Bảng điều khiển',
    requests: 'Yêu cầu thu gom',
  },
};
```

### 3. Sử dụng parameters cho dynamic content
```typescript
// Bad
const message = currentLanguage === 'vi' 
  ? `Bạn có ${count} báo cáo`
  : `You have ${count} reports`;

// Good
const message = t('messages.reportCount', { count });
```

### 4. Fallback values
```typescript
// Nếu key không tồn tại, hiển thị fallback
t('nonexistent.key', 'Fallback text')
```

## 🔧 Cấu hình

### localStorage Key
Ngôn ngữ được lưu trong localStorage với key: `ecowaste_language`

### Ngôn ngữ mặc định
Tiếng Việt (`vi`)

### Fallback language
Tiếng Việt (`vi`)

## 📦 Thêm ngôn ngữ mới

1. Tạo file translation mới: `/i18n/locales/ja.ts` (ví dụ tiếng Nhật)

```typescript
export const ja = {
  common: {
    appName: 'EcoWaste',
    welcome: 'ようこそ',
    // ...
  },
};
```

2. Import vào config.ts:

```typescript
import { ja } from './locales/ja';

i18n.init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
    ja: { translation: ja },  // Add new language
  },
  // ...
});
```

3. Thêm vào LanguageSwitcher:

```typescript
const languages: Language[] = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },  // Add new language
];
```

## 🐛 Troubleshooting

### Translation không hiển thị
- Kiểm tra key có tồn tại trong cả 2 file vi.ts và en.ts
- Kiểm tra import i18n config trong App.tsx
- Xóa localStorage và reload trang

### Ngôn ngữ không lưu
- Kiểm tra localStorage có bật không
- Kiểm tra STORAGE_KEYS.LANGUAGE trong constants

### TypeScript errors
- Cài đặt types: `npm install --save-dev @types/i18next`
- Restart TypeScript server

## 📚 Tài liệu tham khảo

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
