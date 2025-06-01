import React from 'react';
import { Clock, ShoppingBag, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../common/Button';
import { useUser } from '../../contexts/UserContext';

const MerchantPendingApproval: React.FC = () => {
  const { setMerchantAuthState, setUserType } = useUser();

  const handleBackToLogin = () => {
    setMerchantAuthState('login');
  };

  const handleBackToHome = () => {
    setUserType(null);
    setMerchantAuthState(null);
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
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-6 mb-6 shadow-lg">
            <Clock className="h-12 w-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">طلبك قيد المراجعة</h2>
          
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-6 mb-8">
            <AlertCircle className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <p className="text-yellow-200 text-lg mb-2">
              تم إرسال طلب تسجيلك كتاجر بنجاح!
            </p>
            <p className="text-yellow-100">
              فريقنا يقوم حالياً بمراجعة طلبك. ستتلقى إشعاراً عبر البريد الإلكتروني بمجرد الموافقة على حسابك.
            </p>
          </div>

          <div className="text-right mb-8" dir="rtl">
            <h3 className="text-xl font-semibold text-white mb-4">ماذا سيحدث بعد ذلك؟</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 flex-row-reverse">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">مراجعة الطلب</h4>
                  <p className="text-gray-300 text-sm">سيقوم فريقنا بالتحقق من معلومات نشاطك التجاري والمستندات المقدمة.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 flex-row-reverse">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">إشعار الموافقة</h4>
                  <p className="text-gray-300 text-sm">ستتلقى بريداً إلكترونياً عند الموافقة على طلبك أو إذا احتجنا إلى معلومات إضافية.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 flex-row-reverse">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">الوصول إلى لوحة التحكم</h4>
                  <p className="text-gray-300 text-sm">بعد الموافقة، يمكنك تسجيل الدخول والبدء في استخدام لوحة تحكم التاجر.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-6" dir="rtl">
            <h3 className="text-lg font-semibold text-white mb-4">مدة المراجعة</h3>
            <p className="text-gray-300 mb-6">
              عادةً ما تتم مراجعة الطلبات خلال <span className="text-yellow-400 font-semibold">24-48 ساعة</span> في أيام العمل.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={handleBackToLogin}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                العودة لتسجيل الدخول
              </Button>
              
              <Button
                onClick={handleBackToHome}
                variant="secondary"
                className="w-full bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                العودة إلى الصفحة الرئيسية
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              تحتاج للمساعدة؟ تواصل مع الدعم عبر البريد الإلكتروني{' '}
              <a href="mailto:support@modaa.com" className="text-yellow-400 hover:text-yellow-300">
                support@modaa.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantPendingApproval; 