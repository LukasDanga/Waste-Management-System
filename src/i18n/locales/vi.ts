/**
 * EcoWaste - Vietnamese Translations
 */

export const vi = {
  // Common
  common: {
    appName: 'EcoWaste',
    welcome: 'Chào mừng',
    loading: 'Đang tải...',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    sort: 'Sắp xếp',
    export: 'Xuất',
    import: 'Nhập',
    save: 'Lưu',
    cancel: 'Hủy',
    delete: 'Xóa',
    edit: 'Sửa',
    view: 'Xem',
    add: 'Thêm',
    create: 'Tạo mới',
    update: 'Cập nhật',
    confirm: 'Xác nhận',
    back: 'Quay lại',
    next: 'Tiếp theo',
    previous: 'Trước',
    submit: 'Gửi',
    close: 'Đóng',
    yes: 'Có',
    no: 'Không',
    all: 'Tất cả',
    none: 'Không có',
    actions: 'Thao tác',
    details: 'Chi tiết',
    status: 'Trạng thái',
    date: 'Ngày',
    time: 'Thời gian',
    total: 'Tổng',
    success: 'Thành công',
    error: 'Lỗi',
    warning: 'Cảnh báo',
    info: 'Thông tin',
  },

  // Navigation
  nav: {
    home: 'Trang chủ',
    dashboard: 'Bảng điều khiển',
    reports: 'Báo cáo',
    tasks: 'Công việc',
    profile: 'Hồ sơ',
    settings: 'Cài đặt',
    logout: 'Đăng xuất',
    login: 'Đăng nhập',
    register: 'Đăng ký',
  },

  // Auth
  auth: {
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    register: 'Đăng ký',
    username: 'Tên đăng nhập',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    email: 'Email',
    phone: 'Số điện thoại',
    forgotPassword: 'Quên mật khẩu?',
    rememberMe: 'Ghi nhớ đăng nhập',
    loginSuccess: 'Đăng nhập thành công!',
    logoutSuccess: 'Đăng xuất thành công!',
    loginError: 'Tên đăng nhập hoặc mật khẩu không đúng',
    sessionExpired: 'Phiên đăng nhập đã hết hạn',
    demoAccount: 'Tài khoản demo',
    selectRole: 'Chọn vai trò',
  },

  // Roles
  roles: {
    citizen: 'Người dân',
    enterprise: 'Doanh nghiệp',
    collector: 'Nhân viên thu gom',
    admin: 'Quản trị viên',
  },

  // Waste Types
  wasteTypes: {
    recyclable: 'Tái chế',
    organic: 'Hữu cơ',
    hazardous: 'Nguy hại',
    general: 'Sinh hoạt',
    electronic: 'Điện tử',
  },

  // Status
  status: {
    pending: 'Chờ xử lý',
    assigned: 'Đã phân công',
    in_progress: 'Đang thu gom',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
    active: 'Hoạt động',
    inactive: 'Không hoạt động',
    suspended: 'Đình chỉ',
    verified: 'Đã xác minh',
    new: 'Mới',
    accepted: 'Đã nhận',
    failed: 'Thất bại',
    open: 'Mở',
    investigating: 'Đang xử lý',
    resolved: 'Đã giải quyết',
    rejected: 'Đã từ chối',
  },

  // Priority
  priority: {
    low: 'Thấp',
    medium: 'Trung bình',
    high: 'Cao',
    urgent: 'Khẩn cấp',
  },

  // Citizen
  citizen: {
    dashboard: 'Bảng điều khiển',
    createReport: 'Tạo báo cáo',
    myReports: 'Báo cáo của tôi',
    reportDetail: 'Chi tiết báo cáo',
    points: 'Điểm thưởng',
    leaderboard: 'Bảng xếp hạng',
    feedback: 'Phản hồi',
    totalPoints: 'Tổng điểm',
    totalReports: 'Tổng báo cáo',
    rank: 'Hạng',
    level: 'Cấp độ',
    badges: 'Huy hiệu',
    rewards: 'Phần thưởng',
    redeemReward: 'Đổi thưởng',
  },

  // Enterprise
  enterprise: {
    dashboard: 'Bảng điều khiển',
    requests: 'Yêu cầu thu gom',
    requestDetail: 'Chi tiết yêu cầu',
    collectors: 'Nhân viên thu gom',
    capacity: 'Công suất',
    analytics: 'Phân tích',
    pointRules: 'Quy tắc điểm',
    totalCollections: 'Tổng thu gom',
    activeCollectors: 'NV đang hoạt động',
    completionRate: 'Tỷ lệ hoàn thành',
    rating: 'Đánh giá',
  },

  // Collector
  collector: {
    dashboard: 'Bảng điều khiển',
    myTasks: 'Công việc của tôi',
    taskDetail: 'Chi tiết công việc',
    workHistory: 'Lịch sử làm việc',
    stats: 'Thống kê',
    totalCompleted: 'Đã hoàn thành',
    todayTasks: 'Công việc hôm nay',
    acceptTask: 'Nhận công việc',
    completeTask: 'Hoàn thành',
    route: 'Lộ trình',
    navigation: 'Dẫn đường',
  },

  // Admin
  admin: {
    dashboard: 'Bảng điều khiển',
    users: 'Người dùng',
    enterprises: 'Doanh nghiệp',
    reportMonitoring: 'Giám sát báo cáo',
    disputes: 'Khiếu nại',
    permissions: 'Phân quyền',
    settings: 'Cài đặt hệ thống',
    reports: 'Báo cáo tổng hợp',
    totalUsers: 'Tổng người dùng',
    totalReports: 'Tổng báo cáo',
    wasteCollected: 'Rác thu gom',
    recyclingRate: 'Tỷ lệ tái chế',
  },

  // Report
  report: {
    title: 'Tiêu đề',
    description: 'Mô tả',
    type: 'Loại rác',
    location: 'Vị trí',
    address: 'Địa chỉ',
    images: 'Hình ảnh',
    estimatedWeight: 'Khối lượng ước tính',
    actualWeight: 'Khối lượng thực tế',
    scheduledDate: 'Ngày hẹn',
    createdAt: 'Ngày tạo',
    updatedAt: 'Cập nhật',
    assignedTo: 'Phân công cho',
    pointsAwarded: 'Điểm thưởng',
    aiClassification: 'Phân loại AI',
    confidence: 'Độ tin cậy',
    suggestions: 'Gợi ý',
  },

  // Messages
  messages: {
    loginSuccess: 'Đăng nhập thành công!',
    logoutSuccess: 'Đăng xuất thành công!',
    createSuccess: 'Tạo mới thành công!',
    updateSuccess: 'Cập nhật thành công!',
    deleteSuccess: 'Xóa thành công!',
    saveSuccess: 'Lưu thành công!',
    error: 'Đã có lỗi xảy ra',
    networkError: 'Lỗi kết nối mạng',
    validationError: 'Dữ liệu không hợp lệ',
    unauthorized: 'Bạn không có quyền truy cập',
    notFound: 'Không tìm thấy dữ liệu',
    confirmDelete: 'Bạn có chắc muốn xóa?',
    confirmAction: 'Bạn có chắc muốn thực hiện?',
  },

  // Homepage
  homepage: {
    hero: {
      title: 'Hệ thống quản lý rác thải thông minh',
      subtitle: 'Giải pháp toàn diện cho quản lý và tái chế rác thải',
      cta: 'Bắt đầu ngay',
    },
    features: {
      title: 'Tính năng nổi bật',
      aiClassification: 'Phân loại AI',
      aiDescription: 'Tự động nhận diện và phân loại rác thải',
      realTimeTracking: 'Theo dõi thời gian thực',
      realTimeDescription: 'Giám sát vị trí và tiến độ thu gom',
      gamification: 'Hệ thống điểm thưởng',
      gamificationDescription: 'Nhận điểm và phần thưởng khi tham gia',
    },
    stats: {
      users: 'Người dùng',
      reports: 'Báo cáo',
      wasteCollected: 'Rác thu gom',
      enterprises: 'Doanh nghiệp',
    },
  },

  // Validation
  validation: {
    required: 'Trường này là bắt buộc',
    invalidEmail: 'Email không hợp lệ',
    invalidPhone: 'Số điện thoại không hợp lệ',
    minLength: 'Tối thiểu {{count}} ký tự',
    maxLength: 'Tối đa {{count}} ký tự',
    passwordMismatch: 'Mật khẩu xác nhận không khớp',
    fileTooLarge: 'File quá lớn',
    invalidFileType: 'Định dạng file không hợp lệ',
  },

  // Date & Time
  dateTime: {
    today: 'Hôm nay',
    yesterday: 'Hôm qua',
    tomorrow: 'Ngày mai',
    thisWeek: 'Tuần này',
    thisMonth: 'Tháng này',
    lastWeek: 'Tuần trước',
    lastMonth: 'Tháng trước',
    minutesAgo: '{{count}} phút trước',
    hoursAgo: '{{count}} giờ trước',
    daysAgo: '{{count}} ngày trước',
    justNow: 'Vừa xong',
  },

  // Units
  units: {
    kg: 'kg',
    ton: 'tấn',
    points: 'điểm',
    times: 'lần',
    percent: '%',
  },
};
