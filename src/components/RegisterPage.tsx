import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Recycle, Users, Building2, Truck, Mail, Calendar, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/useToast';
import type { UserRole } from '../types';

interface RegisterPageProps {
	onRegister: (data: any) => void;
	onBackToLogin: () => void;
}

type RegisterRole = Extract<UserRole, 'CITIZEN' | 'COLLECTOR' | 'ENTERPRISE'> | null;

interface RoleOption {
	value: RegisterRole;
	label: string;
	description: string;
	icon: any;
	color: string;
}

export function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
	const [selectedRole, setSelectedRole] = useState<RegisterRole>(null);
	const [showPassword, setShowPassword] = useState(false);
	const { success: toastSuccess, error: toastError } = useToast();
  
	// Common fields for all roles
	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [gender, setGender] = useState('');
	const [dob, setDob] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
  
	// Citizen & Collector specific fields
	const [displayName, setDisplayName] = useState('');
  
	// Enterprise specific fields
	const [companyName, setCompanyName] = useState('');
	const [tin, setTin] = useState('');
	const [address, setAddress] = useState('');
	const [contactInfo, setContactInfo] = useState('');

	const roleOptions: RoleOption[] = [
		{
			value: 'CITIZEN',
			label: 'Người dân',
			description: 'Báo cáo rác thải, nhận điểm thưởng và đóng góp cho môi trường',
			icon: Users,
			color: 'bg-blue-50 border-blue-200 hover:border-blue-400'
		},
		{
			value: 'COLLECTOR',
			label: 'Nhân viên thu gom',
			description: 'Thực hiện nhiệm vụ thu gom và xử lý rác thải',
			icon: Truck,
			color: 'bg-orange-50 border-orange-200 hover:border-orange-400'
		},
		{
			value: 'ENTERPRISE',
			label: 'Doanh nghiệp',
			description: 'Quản lý hoạt động thu gom và tái chế quy mô lớn',
			icon: Building2,
			color: 'bg-green-50 border-green-200 hover:border-green-400'
		}
	];

	const handleRoleSelect = (role: RegisterRole) => {
		setSelectedRole(role);
		// Reset form when changing role
		resetForm();
	};

	const resetForm = () => {
		setEmail('');
		setFullName('');
		setGender('');
		setDob('');
		setPassword('');
		setConfirmPassword('');
		setDisplayName('');
		setCompanyName('');
		setTin('');
		setAddress('');
		setContactInfo('');
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validation
		if (!email || !fullName || !gender || !dob || !password) {
			toastError('Vui lòng điền đầy đủ thông tin bắt buộc');
			return;
		}

		if (password !== confirmPassword) {
			toastError('Mật khẩu xác nhận không khớp');
			return;
		}

		if (password.length < 8) {
			toastError('Mật khẩu phải có ít nhất 8 ký tự');
			return;
		}

		let registerData: any = {
			email,
			fullName,
			gender,
			dob,
			password,
			role: selectedRole,
		};

		if (selectedRole === 'CITIZEN' || selectedRole === 'COLLECTOR') {
			if (!displayName) {
				toastError('Vui lòng nhập tên hiển thị');
				return;
			}
			registerData.displayName = displayName;
			registerData.avatarName = 'default_avatar';
		}

		if (selectedRole === 'ENTERPRISE') {
			if (!companyName || !tin || !address || !contactInfo) {
				toastError('Vui lòng điền đầy đủ thông tin doanh nghiệp');
				return;
			}
			registerData.name = companyName;
			registerData.tin = tin;
			registerData.address = address;
			registerData.contactInfo = contactInfo;
			registerData.avatarName = 'company_logo.png';
		}

		toastSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
		onRegister(registerData);
	};

	return (
		<div className="min-h-screen flex">
			{/* Left Side - Illustration */}
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 relative overflow-hidden">
				<div className="absolute inset-0 opacity-20">
					<ImageWithFallback
						src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMG5hdHVyZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY4MTkxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080"
						alt="Green nature background"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
					<div className="flex items-center gap-3 mb-8">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
							<Recycle className="h-10 w-10 text-green-600" />
						</div>
						<span className="text-4xl font-bold">EcoWaste</span>
					</div>
					<h2 className="text-3xl font-bold mb-4 text-center">
						Tham gia cùng chúng tôi
					</h2>
					<p className="text-lg text-center text-green-50 max-w-md">
						Đăng ký để trở thành một phần của cộng đồng bảo vệ môi trường
					</p>
				</div>
			</div>

			{/* Right Side - Register Form */}
			<div className="flex-1 flex items-center justify-center p-6 bg-gray-50 overflow-y-auto">
				<div className="w-full max-w-2xl space-y-6 py-8">
					{/* Logo for mobile */}
					<div className="flex lg:hidden items-center justify-center gap-2 mb-8">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
							<Recycle className="h-7 w-7 text-white" />
						</div>
						<span className="text-2xl font-bold">EcoWaste</span>
					</div>

					{/* Back to Login */}
					<button
						onClick={onBackToLogin}
						className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
					>
						<ArrowLeft className="h-4 w-4" />
						Quay lại đăng nhập
					</button>

					{/* Register Form Card */}
					<Card className="p-8 shadow-lg bg-white">
						<h2 className="text-2xl font-bold text-center mb-6">Đăng ký tài khoản</h2>

						{/* Role Selection */}
						{!selectedRole ? (
							<div className="space-y-4">
								<p className="text-center text-gray-600 mb-6">Vui lòng chọn loại tài khoản của bạn</p>
								<div className="grid gap-4">
									{roleOptions.map((option) => {
										const Icon = option.icon;
										return (
											<button
												key={option.value}
												onClick={() => handleRoleSelect(option.value)}
												className={`${option.color} border-2 rounded-lg p-5 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] text-left`}
											>
												<div className="flex items-start gap-4">
													<div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
														<Icon className="h-6 w-6 text-gray-700" />
													</div>
													<div className="flex-1">
														<div className="font-semibold text-lg mb-1">{option.label}</div>
														<div className="text-sm text-gray-600">
															{option.description}
														</div>
													</div>
													<ArrowRight className="h-5 w-5 text-gray-400 mt-2" />
												</div>
											</button>
										);
									})}
								</div>
							</div>
						) : (
							// Registration Form
							<form onSubmit={handleSubmit} className="space-y-4">
								{/* Selected Role Display */}
								<div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
									<div className="flex items-center gap-3">
										<CheckCircle className="h-5 w-5 text-green-600" />
										<div>
											<div className="text-sm text-gray-600">Loại tài khoản:</div>
											<div className="font-semibold text-green-700">
												{roleOptions.find(r => r.value === selectedRole)?.label}
											</div>
										</div>
									</div>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => setSelectedRole(null)}
									>
										Đổi loại
									</Button>
								</div>

								{/* Common Fields */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{/* Full Name */}
									<div className="space-y-2">
										<label className="text-sm font-medium">Họ và tên <span className="text-red-500">*</span></label>
										<div className="relative">
											<User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
											<Input
												type="text"
												placeholder="Nguyễn Văn A"
												value={fullName}
												onChange={(e) => setFullName(e.target.value)}
												className="pl-10"
												required
											/>
										</div>
									</div>

									{/* Email */}
									<div className="space-y-2">
										<label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
											<Input
												type="email"
												placeholder="email@example.com"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="pl-10"
												required
											/>
										</div>
									</div>

									{/* Gender */}
									<div className="space-y-2">
										<label className="text-sm font-medium">Giới tính <span className="text-red-500">*</span></label>
										<Select value={gender} onValueChange={setGender}>
											<SelectTrigger>
												<SelectValue placeholder="Chọn giới tính" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Male">Nam</SelectItem>
												<SelectItem value="Female">Nữ</SelectItem>
												<SelectItem value="Other">Khác</SelectItem>
											</SelectContent>
										</Select>
									</div>

									{/* Date of Birth */}
									<div className="space-y-2">
										<label className="text-sm font-medium">Ngày sinh <span className="text-red-500">*</span></label>
										<div className="relative">
											<Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
											<Input
												type="date"
												value={dob}
												onChange={(e) => setDob(e.target.value)}
												className="pl-10"
												required
											/>
										</div>
									</div>

									{/* Password */}
									<div className="space-y-2">
										<label className="text-sm font-medium">Mật khẩu <span className="text-red-500">*</span></label>
										<div className="relative">
											<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
											<Input
												type={showPassword ? 'text' : 'password'}
												placeholder="Tối thiểu 8 ký tự"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												className="pl-10 pr-10"
												required
											/>
											<button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
											>
												{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
											</button>
										</div>
									</div>

									{/* Confirm Password */}
									<div className="space-y-2">
										<label className="text-sm font-medium">Xác nhận mật khẩu <span className="text-red-500">*</span></label>
										<div className="relative">
											<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
											<Input
												type={showPassword ? 'text' : 'password'}
												placeholder="Nhập lại mật khẩu"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												className="pl-10"
												required
											/>
										</div>
									</div>
								</div>

								{/* Role-specific Fields */}
								{(selectedRole === 'CITIZEN' || selectedRole === 'COLLECTOR') && (
									<div className="space-y-2">
										<label className="text-sm font-medium">Tên hiển thị <span className="text-red-500">*</span></label>
										<Input
											type="text"
											placeholder="VanA98"
											value={displayName}
											onChange={(e) => setDisplayName(e.target.value)}
											required
										/>
									</div>
								)}

								{selectedRole === 'ENTERPRISE' && (
									<div className="space-y-4 pt-4 border-t">
										<h3 className="font-semibold text-gray-700">Thông tin doanh nghiệp</h3>
                    
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{/* Company Name */}
											<div className="space-y-2 md:col-span-2">
												<label className="text-sm font-medium">Tên doanh nghiệp <span className="text-red-500">*</span></label>
												<Input
													type="text"
													placeholder="Green Future Recycling Co., Ltd"
													value={companyName}
													onChange={(e) => setCompanyName(e.target.value)}
													required
												/>
											</div>

											{/* Tax ID Number */}
											<div className="space-y-2">
												<label className="text-sm font-medium">Mã số thuế <span className="text-red-500">*</span></label>
												<Input
													type="text"
													placeholder="0312345678"
													value={tin}
													onChange={(e) => setTin(e.target.value)}
													required
												/>
											</div>

											{/* Contact Info */}
											<div className="space-y-2">
												<label className="text-sm font-medium">Số điện thoại liên hệ <span className="text-red-500">*</span></label>
												<Input
													type="text"
													placeholder="+84-901-234-567"
													value={contactInfo}
													onChange={(e) => setContactInfo(e.target.value)}
													required
												/>
											</div>

											{/* Address */}
											<div className="space-y-2 md:col-span-2">
												<label className="text-sm font-medium">Địa chỉ <span className="text-red-500">*</span></label>
												<Input
													type="text"
													placeholder="123 Nguyễn Huệ, Quận 1, TP.HCM"
													value={address}
													onChange={(e) => setAddress(e.target.value)}
													required
												/>
											</div>
										</div>
									</div>
								)}

								{/* Submit Button */}
								<div className="flex gap-3 pt-4">
									<Button
										type="button"
										variant="outline"
										onClick={() => setSelectedRole(null)}
										className="w-1/3"
									>
										Quay lại
									</Button>
									<Button
										type="submit"
										className="flex-1 bg-green-600 hover:bg-green-700 text-white"
										size="lg"
									>
										Đăng ký
									</Button>
								</div>
							</form>
						)}
					</Card>

					{/* Login Link */}
					<div className="text-center text-sm text-gray-600">
						Đã có tài khoản?{' '}
						<button
							onClick={onBackToLogin}
							className="text-green-600 hover:text-green-700 font-semibold"
						>
							Đăng nhập ngay
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
