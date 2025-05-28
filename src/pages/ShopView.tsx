import React from 'react';
import TransactionDisplay from '../components/shop/TransactionDisplay';
import ChangeOptions from '../components/shop/ChangeOptions';
import { useTransaction } from '../contexts/TransactionContext';
import { ShoppingBag, Coins, TrendingUp, Wallet } from 'lucide-react';

const ShopView: React.FC = () => {
  const { currentTransaction } = useTransaction();

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.95) 100%),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      {/* Floating Elements for Financial Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10">
          <Coins className="h-16 w-16 text-yellow-300 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        </div>
        <div className="absolute top-40 right-20 opacity-10">
          <TrendingUp className="h-12 w-12 text-green-300 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        </div>
        <div className="absolute bottom-40 left-20 opacity-10">
          <ShoppingBag className="h-20 w-20 text-yellow-300 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Wallet className="h-14 w-14 text-green-300 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
        </div>
      </div>

      <div className="py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-6 mb-6 shadow-lg">
              <ShoppingBag className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Merchant Dashboard
            </h1>
            <p className="text-xl text-gray-300 max-w-xl mx-auto">
              Manage transactions and help customers save their change with <span className="text-yellow-400 font-semibold">مودع</span>.
            </p>
          </div>
          
          <div className="space-y-6">
            <div 
              className="rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <TransactionDisplay />
            </div>
            
            {currentTransaction && (
              <div 
                className="rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <ChangeOptions />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopView;