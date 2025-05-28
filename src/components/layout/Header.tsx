import React from 'react';
import { Coins, ShoppingBag, User, Shield } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Header: React.FC = () => {
  const { userType, setUserType } = useUser();

  return (
    <header 
      className="text-white shadow-lg border-b border-gray-700/50"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Coins size={28} className="text-green-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">مودع</h1>
        </div>
        
        <nav>
          <div className="flex space-x-4">
            {userType === null && (
              <>
                {/* Merchant Button */}
                <button 
                  onClick={() => setUserType('shop')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                >
                  <ShoppingBag size={16} />
                  <span>Connect as Merchant</span>
                </button>
                
                {/* Client Button */}
                <button 
                  onClick={() => setUserType('customer')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  <User size={16} />
                  <span>Connect as Client</span>
                </button>

                {/* Admin Button */}
                <button 
                  onClick={() => setUserType('admin')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  <Shield size={16} />
                  <span>Admin Access</span>
                </button>
              </>
            )}
            
            {userType !== null && (
              <button 
                onClick={() => setUserType(null)}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <span>Logout</span>
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;