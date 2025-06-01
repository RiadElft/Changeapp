import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useUser } from '../contexts/UserContext';
import { ShoppingBag, Store, TrendingUp, Wallet, DollarSign, BarChart3, Coins, Users, Shield, CheckCircle, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const { setUserType, setMerchantAuthState } = useUser();
  const navigate = useNavigate();

  const handleSignUp = () => {
    setUserType('shop');
    setMerchantAuthState('signup');
    navigate('/shop');
  };

  const handleSignIn = () => {
    setUserType('shop');
    setMerchantAuthState('login');
    navigate('/shop');
  };

  const handleAdminAccess = () => {
    setUserType('admin');
    navigate('/admin');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.9) 50%, rgba(51, 65, 85, 0.95) 100%),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      {/* Floating Elements for Financial Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10">
          <Coins className="h-16 w-16 text-green-300 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        </div>
        <div className="absolute top-40 right-20 opacity-10">
          <TrendingUp className="h-12 w-12 text-yellow-300 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        </div>
        <div className="absolute bottom-40 left-20 opacity-10">
          <DollarSign className="h-20 w-20 text-green-300 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Wallet className="h-14 w-14 text-yellow-300 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-6 mb-8 shadow-2xl">
            <Store className="h-16 w-16 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="text-green-400 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Hassalapp</span>
            مرحبا بك في<br />
           
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          كل دينار يصنع الفرق، من اليوم الصرف ما يضيعش... يخدمك و يخدم عميلك
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={handleSignUp}
              size="lg"
              className="!bg-gradient-to-r !from-green-500 !to-emerald-600 hover:!from-green-600 hover:!to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25"
            >
              <ShoppingBag className="mr-3" size={20} />
              انضم الينا- سجل الآن 
            </Button>
            
            <Button 
              onClick={handleSignIn}
              variant="outline"
              size="lg"
              className="!bg-white/10 !border-2 !border-white/30 text-white hover:!bg-white/20 font-semibold px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              لديك حساب بالفعل؟ تسجيل الدخول
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div 
              className="p-6 rounded-xl border border-white/20 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="text-3xl font-bold text-green-400 mb-2">+1000</div>
              <div className="text-gray-300">شركة منضمة</div>
            </div>
            <div 
              className="p-6 rounded-xl border border-white/20 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">+50 ألف</div>
              <div className="text-gray-300">عميل سعيد</div>
            </div>
            <div 
              className="p-6 rounded-xl border border-white/20 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">+1 مليون</div>
              <div className="text-gray-300">معاملة معالجة</div>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          <span className="text-green-400">Hassalapp</span>  كيف يعمل 
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
            خطوات بسيطة لبدء مساعدة عملائك في التوفير ونمو أعمالك
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="relative">
                <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-6 mb-6 shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                سجل واحصل على الموافقة
              </h3>
              <p className="text-gray-300 leading-relaxed">
                سجل شركتك معنا و  سيقوم فريقنا بمراجعة واعتماد طلبك خلال 24-48 ساعة.
              </p>
            </div>
            
            <div 
              className="p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="relative">
                <div className="inline-flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 rounded-full p-6 mb-6 shadow-lg">
                  <Wallet className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                معالجة فكة العملاء
              </h3>
              <p className="text-gray-300 leading-relaxed">
                عندما يقوم العملاء بعمليات شراء، اعرض عليهم خيار توفير الفكة مع Hassalapp بدلاً من استلام الفكة النقدية.
              </p>
            </div>
            
            <div 
              className="p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="relative">
                <div className="inline-flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-6 mb-6 shadow-lg">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                اربح ونم معاً
              </h3>
              <p className="text-gray-300 leading-relaxed">
              خدمة صغيرة،تأثير كبير... و توسع مضمون
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            لماذا تختار <span className="text-green-400">Hassalapp</span>؟
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className="p-8 rounded-2xl border border-gray-700/50"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">لعملك</h3>
              <div className="space-y-4">
                
                  
                  
               
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">تقليل التعامل مع النقد وإدارة الفكة</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">جذب العملاء الذين يقدرون الصحة المالية</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">لوحة تحكم وأدوات تقارير سهلة الاستخدام</span>
                </div>
              </div>
            </div>

            <div 
              className="p-8 rounded-2xl border border-gray-700/50"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">لعملائك</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">طريقة سهلة لتوفير الفكة</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">بناء عادات التوفير تلقائياً</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">تتبع نمو مدخراتهم مع مرور الوقت</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">منصة آمنة وموثوقة</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div 
          className="text-center p-12 rounded-2xl border border-gray-700/50"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            هل أنت مستعد لتحويل عملك؟
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            انضم الينا و ساعد عملائك على التوفير ونمو إيراداتهم.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleSignUp}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25"
            >
               انضم إلينا اليوم مجاناً
            </Button>
            
            <Button 
              onClick={handleSignIn}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              عضو بالفعل؟ تسجيل الدخول
            </Button>
          </div>
        </div>

        {/* Hidden Admin Access */}
        <div className="text-center mt-8">
          <button 
            onClick={handleAdminAccess}
            className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
          >
            دخول المشرف
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;