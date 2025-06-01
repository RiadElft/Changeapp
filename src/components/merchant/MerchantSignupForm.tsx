import React, { useState } from 'react';
import { ShoppingBag, User, Mail, Phone, MapPin, Building, FileText, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../common/Button';
import { MerchantSignupData } from '../../types';
import { useMerchantAuth } from '../../contexts/MerchantAuthContext';
import { useUser } from '../../contexts/UserContext';

const MerchantSignupForm: React.FC = () => {
  const { signupMerchant } = useMerchantAuth();
  const { setMerchantAuthState } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<MerchantSignupData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    businessLicense: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<MerchantSignupData>>({});

  const businessTypes = [
    { value: 'Restaurant', label: 'مطعم' },
    { value: 'Retail Store', label: 'محل تجزئة' },
    { value: 'Cafe', label: 'مقهى' },
    { value: 'Grocery Store', label: 'بقالة' },
    { value: 'Gas Station', label: 'محطة وقود' },
    { value: 'Pharmacy', label: 'صيدلية' },
    { value: 'Bakery', label: 'مخبز' },
    { value: 'Electronics Store', label: 'محل إلكترونيات' },
    { value: 'Clothing Store', label: 'محل ملابس' },
    { value: 'Other', label: 'أخرى' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<MerchantSignupData> = {};

    if (!formData.name.trim()) newErrors.name = 'Business name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof MerchantSignupData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const result = await signupMerchant(formData);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          businessType: '',
          businessLicense: '',
          password: '',
        });
        // Switch to pending approval state after a delay
        setTimeout(() => {
          setMerchantAuthState('pending_approval');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div 
        className="rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-4 mb-4 shadow-lg">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">تسجيل تاجر جديد</h2>
            <p className="text-gray-300">انضم الينا كشريك تاجر</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                : 'bg-red-500/20 border border-red-500/30 text-red-300'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                اسم النشاط *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400`}
                  placeholder="ادخل اسم النشاط"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                البريد الإلكتروني *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400`}
                  placeholder="ادخل البريد الإلكتروني"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                رقم الهاتف *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400`}
                  placeholder="ادخل رقم الهاتف"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                العنوان *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                    errors.address ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400`}
                  placeholder="ادخل العنوان الكامل"
                />
              </div>
              {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address}</p>}
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                نوع النشاط *
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border ${
                  errors.businessType ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white`}
              >
                <option value="">اختر نوع النشاط</option>
                {businessTypes.map(type => (
                  <option key={type.value} value={type.value} className="bg-gray-800 text-white">
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.businessType && <p className="mt-1 text-sm text-red-400">{errors.businessType}</p>}
            </div>

            {/* Business License (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                رقم رخصة النشاط (اختياري)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="businessLicense"
                  value={formData.businessLicense}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="ادخل رقم الرخصة إن وجد"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                كلمة المرور *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 border ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400`}
                  placeholder="أنشئ كلمة مرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب تاجر'}
            </Button>

            {/* Login Link */}
            <p className="text-gray-300">
              لديك حساب بالفعل؟{' '}
              <button
                type="button"
                onClick={() => setMerchantAuthState('login')}
                className="text-yellow-400 hover:text-yellow-300 font-medium"
              >
                تسجيل الدخول
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MerchantSignupForm; 