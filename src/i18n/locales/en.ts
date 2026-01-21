/**
 * EcoWaste - English Translations
 */

export const en = {
  // Common
  common: {
    appName: 'EcoWaste',
    welcome: 'Welcome',
    loading: 'Loading...',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    export: 'Export',
    import: 'Import',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    add: 'Add',
    create: 'Create',
    update: 'Update',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    close: 'Close',
    yes: 'Yes',
    no: 'No',
    all: 'All',
    none: 'None',
    actions: 'Actions',
    details: 'Details',
    status: 'Status',
    date: 'Date',
    time: 'Time',
    total: 'Total',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
  },

  // Navigation
  nav: {
    home: 'Home',
    dashboard: 'Dashboard',
    reports: 'Reports',
    tasks: 'Tasks',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
  },

  // Auth
  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    email: 'Email',
    phone: 'Phone Number',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
    loginSuccess: 'Login successful!',
    logoutSuccess: 'Logout successful!',
    loginError: 'Invalid username or password',
    sessionExpired: 'Session expired',
    demoAccount: 'Demo Account',
    selectRole: 'Select Role',
  },

  // Roles
  roles: {
    citizen: 'Citizen',
    enterprise: 'Enterprise',
    collector: 'Collector',
    admin: 'Administrator',
  },

  // Waste Types
  wasteTypes: {
    recyclable: 'Recyclable',
    organic: 'Organic',
    hazardous: 'Hazardous',
    general: 'General',
    electronic: 'Electronic',
  },

  // Status
  status: {
    pending: 'Pending',
    assigned: 'Assigned',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    active: 'Active',
    inactive: 'Inactive',
    suspended: 'Suspended',
    verified: 'Verified',
    new: 'New',
    accepted: 'Accepted',
    failed: 'Failed',
    open: 'Open',
    investigating: 'Investigating',
    resolved: 'Resolved',
    rejected: 'Rejected',
  },

  // Priority
  priority: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  },

  // Citizen
  citizen: {
    dashboard: 'Dashboard',
    createReport: 'Create Report',
    myReports: 'My Reports',
    reportDetail: 'Report Detail',
    points: 'Points',
    leaderboard: 'Leaderboard',
    feedback: 'Feedback',
    totalPoints: 'Total Points',
    totalReports: 'Total Reports',
    rank: 'Rank',
    level: 'Level',
    badges: 'Badges',
    rewards: 'Rewards',
    redeemReward: 'Redeem Reward',
  },

  // Enterprise
  enterprise: {
    dashboard: 'Dashboard',
    requests: 'Collection Requests',
    requestDetail: 'Request Detail',
    collectors: 'Collectors',
    capacity: 'Capacity',
    analytics: 'Analytics',
    pointRules: 'Point Rules',
    totalCollections: 'Total Collections',
    activeCollectors: 'Active Collectors',
    completionRate: 'Completion Rate',
    rating: 'Rating',
  },

  // Collector
  collector: {
    dashboard: 'Dashboard',
    myTasks: 'My Tasks',
    taskDetail: 'Task Detail',
    workHistory: 'Work History',
    stats: 'Statistics',
    totalCompleted: 'Total Completed',
    todayTasks: 'Today\'s Tasks',
    acceptTask: 'Accept Task',
    completeTask: 'Complete',
    route: 'Route',
    navigation: 'Navigation',
  },

  // Admin
  admin: {
    dashboard: 'Dashboard',
    users: 'Users',
    enterprises: 'Enterprises',
    reportMonitoring: 'Report Monitoring',
    disputes: 'Disputes',
    permissions: 'Permissions',
    settings: 'System Settings',
    reports: 'Comprehensive Reports',
    totalUsers: 'Total Users',
    totalReports: 'Total Reports',
    wasteCollected: 'Waste Collected',
    recyclingRate: 'Recycling Rate',
  },

  // Report
  report: {
    title: 'Title',
    description: 'Description',
    type: 'Waste Type',
    location: 'Location',
    address: 'Address',
    images: 'Images',
    estimatedWeight: 'Estimated Weight',
    actualWeight: 'Actual Weight',
    scheduledDate: 'Scheduled Date',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    assignedTo: 'Assigned To',
    pointsAwarded: 'Points Awarded',
    aiClassification: 'AI Classification',
    confidence: 'Confidence',
    suggestions: 'Suggestions',
  },

  // Messages
  messages: {
    loginSuccess: 'Login successful!',
    logoutSuccess: 'Logout successful!',
    createSuccess: 'Created successfully!',
    updateSuccess: 'Updated successfully!',
    deleteSuccess: 'Deleted successfully!',
    saveSuccess: 'Saved successfully!',
    error: 'An error occurred',
    networkError: 'Network error',
    validationError: 'Invalid data',
    unauthorized: 'Unauthorized access',
    notFound: 'Data not found',
    confirmDelete: 'Are you sure you want to delete?',
    confirmAction: 'Are you sure you want to proceed?',
  },

  // Homepage
  homepage: {
    hero: {
      title: 'Smart Waste Management System',
      subtitle: 'Comprehensive solution for waste management and recycling',
      cta: 'Get Started',
    },
    features: {
      title: 'Key Features',
      aiClassification: 'AI Classification',
      aiDescription: 'Automatically identify and classify waste',
      realTimeTracking: 'Real-Time Tracking',
      realTimeDescription: 'Monitor collection location and progress',
      gamification: 'Reward System',
      gamificationDescription: 'Earn points and rewards for participation',
    },
    stats: {
      users: 'Users',
      reports: 'Reports',
      wasteCollected: 'Waste Collected',
      enterprises: 'Enterprises',
    },
  },

  // Validation
  validation: {
    required: 'This field is required',
    invalidEmail: 'Invalid email',
    invalidPhone: 'Invalid phone number',
    minLength: 'Minimum {{count}} characters',
    maxLength: 'Maximum {{count}} characters',
    passwordMismatch: 'Passwords do not match',
    fileTooLarge: 'File too large',
    invalidFileType: 'Invalid file type',
  },

  // Date & Time
  dateTime: {
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    lastWeek: 'Last Week',
    lastMonth: 'Last Month',
    minutesAgo: '{{count}} minutes ago',
    hoursAgo: '{{count}} hours ago',
    daysAgo: '{{count}} days ago',
    justNow: 'Just now',
  },

  // Units
  units: {
    kg: 'kg',
    ton: 'ton',
    points: 'points',
    times: 'times',
    percent: '%',
  },
};
