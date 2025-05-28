import React from 'react';
import Button from '../components/common/Button';
import { useUser } from '../contexts/UserContext';
import { ShoppingBag, User, ArrowRight, Wallet, DollarSign, BarChart3, Coins, TrendingUp, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  const { setUserType } = useUser();

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(68, 116, 96, 0.95) 0%, rgba(19, 61, 29, 0.9) 50%, rgba(51, 65, 85, 0.95) 100%),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      {/* Floating Elements for Financial Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10">
          <Coins className="h-16 w-16 text-green-300 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        </div>
        <div className="absolute top-40 right-20 opacity-10">
          <TrendingUp className="h-12 w-12 text-blue-300 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        </div>
        <div className="absolute bottom-40 left-20 opacity-10">
          <DollarSign className="h-20 w-20 text-green-300 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Wallet className="h-14 w-14 text-blue-300 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-green-400 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">مودع</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Choose your role to get started with our change aggregation platform
          </p>
          
          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {/* Client/Customer Card */}
            <div 
              className="group relative p-6 rounded-2xl shadow-2xl border border-gray-700 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(59, 130, 246, 0.2)'
              }}
              onClick={() => setUserType('customer')}
            >
              {/* Expanding Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-2xl"></div>
              
              {/* Card Content */}
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-blue-500/25">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">I'm a Customer</h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors text-sm">
                  Save your spare change from purchases and watch your savings grow over time.
                </p>
                
                <Button 
                  size="sm" 
                  onClick={() => setUserType('customer')}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <User className="mr-2" size={16} />
                  Continue as Customer
                </Button>
              </div>
            </div>

            {/* Seller/Shop Owner Card */}
            <div 
              className="group relative p-6 rounded-2xl shadow-2xl border border-gray-700 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(172, 136, 39, 0.78) 0%, rgba(255, 200, 50, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(255, 188, 2, 0.2)'
              }}
              onClick={() => setUserType('shop')}
            >
              {/* Expanding Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-2xl"></div>
              
              {/* Card Content */}
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-yellow-500/25">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors">I'm a Merchant</h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors text-sm">
                  Report customer change and participate in the savings ecosystem.
                </p>
                
                <Button 
                  size="sm" 
                  onClick={() => setUserType('shop')}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 group-hover:shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300"
                >
                  <ShoppingBag className="mr-2" size={16} />
                  Continue as Merchant
                </Button>
              </div>
            </div>

            {/* Admin Card */}
            <div 
              className="group relative p-6 rounded-2xl shadow-2xl border border-gray-700 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(196, 181, 253, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(139, 92, 246, 0.2)'
              }}
              onClick={() => setUserType('admin')}
            >
              {/* Expanding Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-600/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-2xl"></div>
              
              {/* Card Content */}
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center bg-gradient-to-br from-purple-500 to-violet-600 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-purple-500/25">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">System Admin</h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors text-sm">
                  Manage the entire مودع platform, merchants, and financial operations.
                </p>
                
                <Button 
                  size="sm" 
                  onClick={() => setUserType('admin')}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-0 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <Shield className="mr-2" size={16} />
                  Admin Access
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            How <span className="text-green-400">مودع</span> Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="p-8 rounded-xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-4 mb-5 shadow-lg">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Track Change
              </h3>
              <p className="text-gray-300">
                Merchants calculate your change after each purchase and offer savings options.
              </p>
            </div>
            
            <div 
              className="p-8 rounded-xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="inline-flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 rounded-full p-4 mb-5 shadow-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Save Automatically
              </h3>
              <p className="text-gray-300">
                Choose to deposit your change into your مودع account with a single click.
              </p>
            </div>
            
            <div 
              className="p-8 rounded-xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="inline-flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-4 mb-5 shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Watch It Grow
              </h3>
              <p className="text-gray-300">
                Monitor your savings growth over time and see how small amounts add up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;