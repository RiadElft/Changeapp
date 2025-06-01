import React from 'react';
import { Coins, ShoppingBag, LogOut, ArrowRight } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Header: React.FC = () => {
  const { 
    userType, 
    setUserType, 
    merchantAuthState, 
    setMerchantAuthState, 
    currentMerchant, 
    setCurrentMerchant 
  } = useUser();

  const handleLogout = () => {
    setUserType(null);
    setMerchantAuthState(null);
    setCurrentMerchant(null);
  };

  const handleLogoClick = () => {
    if (userType !== null) {
      handleLogout();
    }
  };

  const getHeaderStyle = () => {
    if (userType === null) {
      // Warmer gradient for index page
      return {
        background: 'linear-gradient(135deg, #3f553d 0%, rgba(48, 110, 72, 0.9) 100%)',
        backdropFilter: 'blur(20px)'
      };
    }
    // Default gradient for other pages
    return {
      background: 'linear-gradient(135deg, #3f553d 0%, rgba(48, 110, 72, 0.9) 100%)',
      backdropFilter: 'blur(20px)'
    };
  };

  return (
    <header 
      className="text-white shadow-lg border-b border-gray-700/50"
      style={getHeaderStyle()}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer transition-all duration-300 hover:scale-105"
          onClick={handleLogoClick}
        >
          <img src="wallet.png" alt="Hassalapp" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-white">Hassalapp</h1>
        </div>
        
        <nav>
          <div className="flex items-center space-x-4">
            {/* Show merchant info when authenticated */}
            {userType === 'shop' && merchantAuthState === 'authenticated' && currentMerchant && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 px-4 py-2 rounded-lg">
                  <ShoppingBag size={16} className="text-yellow-400" />
                  <span className="text-white font-medium">{currentMerchant.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                >
                  <LogOut size={16} />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            )}
            
            {/* Show logout for other user types or unauthenticated merchants */}
            {userType !== null && !(userType === 'shop' && merchantAuthState === 'authenticated') && (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <LogOut size={16} />
                <span>العودة للرئيسية</span>
              </button>
            )}

            {/* Show Get Started button on home page */}
            {userType === null && (
              <button 
                className="flex items-center space-x-2 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/25 border border-white/20"
              >
                <span className="font-medium">ابدأ الآن</span>
                <ArrowRight size={16} className="animate-pulse" />
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;