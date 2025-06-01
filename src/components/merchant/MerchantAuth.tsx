import React from 'react';
import { useUser } from '../../contexts/UserContext';
import MerchantLoginForm from './MerchantLoginForm';
import MerchantSignupForm from './MerchantSignupForm';
import MerchantPendingApproval from './MerchantPendingApproval';

const MerchantAuth: React.FC = () => {
  const { merchantAuthState } = useUser();

  const renderContent = () => {
    switch (merchantAuthState) {
      case 'login':
        return <MerchantLoginForm />;
      case 'signup':
        return <MerchantSignupForm />;
      case 'pending_approval':
        return <MerchantPendingApproval />;
      default:
        return <MerchantLoginForm />;
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden py-8 px-4"
      style={{
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.95) 100%),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10">
          <div className="h-16 w-16 text-yellow-300 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            💰
          </div>
        </div>
        <div className="absolute top-40 right-20 opacity-10">
          <div className="h-12 w-12 text-green-300 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}>
            📊
          </div>
        </div>
        <div className="absolute bottom-40 left-20 opacity-10">
          <div className="h-20 w-20 text-yellow-300 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}>
            🛍️
          </div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <div className="h-14 w-14 text-green-300 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}>
            💳
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default MerchantAuth; 