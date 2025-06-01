import React, { useState } from 'react';
import { ShoppingBag, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../common/Button';
import { MerchantLoginData } from '../../types';
import { useMerchantAuth } from '../../contexts/MerchantAuthContext';
import { useUser } from '../../contexts/UserContext';

const MerchantLoginForm: React.FC = () => {
  const { loginMerchant } = useMerchantAuth();
  const { setMerchantAuthState, setCurrentMerchant } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<MerchantLoginData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<MerchantLoginData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<MerchantLoginData> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof MerchantLoginData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const result = await loginMerchant(formData);
      
      if (result.success && result.merchant) {
        setMessage({ type: 'success', text: result.message });
        setCurrentMerchant(result.merchant);
        // Switch to authenticated state after a delay
        setTimeout(() => {
          setMerchantAuthState('authenticated');
        }, 1000);
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
    <div className="max-w-md mx-auto">
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
            <h2 className="text-3xl font-bold text-white mb-2">تسجيل دخول التاجر</h2>
            <p className="text-gray-300">ادخل الى لوحة تحكم التاجر</p>
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
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                البريد الإلكتروني
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                كلمة المرور
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
                  placeholder="ادخل كلمة المرور"
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
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>

            {/* Signup Link */}
            <div className="text-center">
              <p className="text-gray-300">
                ليس لديك حساب تاجر؟{' '}
                <button
                  type="button"
                  onClick={() => setMerchantAuthState('signup')}
                  className="text-yellow-400 hover:text-yellow-300 font-medium"
                >
                  سجل هنا
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MerchantLoginForm; 