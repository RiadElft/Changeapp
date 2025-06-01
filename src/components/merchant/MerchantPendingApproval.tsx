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
          
          <h2 className="text-3xl font-bold text-white mb-4">Application Under Review</h2>
          
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-6 mb-8">
            <AlertCircle className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <p className="text-yellow-200 text-lg mb-2">
              Your merchant application has been submitted successfully!
            </p>
            <p className="text-yellow-100">
              Our team is currently reviewing your application. You'll receive an email notification once your account has been approved.
            </p>
          </div>

          <div className="text-left mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">What happens next?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">Application Review</h4>
                  <p className="text-gray-300 text-sm">Our team will verify your business information and documentation.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">Approval Notification</h4>
                  <p className="text-gray-300 text-sm">You'll receive an email once your application is approved or if we need additional information.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">Access Dashboard</h4>
                  <p className="text-gray-300 text-sm">Once approved, you can log in and start using the merchant dashboard.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Review Timeline</h3>
            <p className="text-gray-300 mb-6">
              Applications are typically reviewed within <span className="text-yellow-400 font-semibold">24-48 hours</span> during business days.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={handleBackToLogin}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Back to Login
              </Button>
              
              <Button
                onClick={handleBackToHome}
                variant="secondary"
                className="w-full bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Back to Home
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Need help? Contact support at{' '}
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