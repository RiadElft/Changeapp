import React, { useState } from 'react';
import Dashboard from '../components/customer/Dashboard';
import Card, { CardHeader, CardBody } from '../components/common/Card';
import Button from '../components/common/Button';
import { useUser } from '../contexts/UserContext';
import { useTransaction } from '../contexts/TransactionContext';
import { User, Mail, Phone, UserCheck, Coins, PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import { Customer } from '../types';
import axios from 'axios';

const CustomerView: React.FC = () => {
  const { setCurrentCustomer } = useUser();
  const { customers, addCustomer } = useTransaction();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    try {
      const res = await axios.get('http://localhost:4000/api/customers');
      const customers = res.data;
      const customer = customers.find((c: any) => c.email.toLowerCase() === email.toLowerCase());
      if (customer) {
        setCurrentCustomer(customer);
      } else {
        setError('No account found with this email. Please create a new account.');
      }
    } catch (e) {
      setError('Failed to connect to server.');
    }
  };

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('All fields are required');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    try {
      const res = await axios.post('http://localhost:4000/api/customers', { name, email, phone });
      setCurrentCustomer(res.data.customer);
    } catch (e: any) {
      if (e.response && e.response.status === 409) {
        setError('An account with this email already exists');
      } else {
        setError('Failed to register.');
      }
    }
  };

  const { currentCustomer } = useUser();
  
  if (currentCustomer) {
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
            <Coins className="h-16 w-16 text-blue-300 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          </div>
          <div className="absolute top-40 right-20 opacity-10">
            <TrendingUp className="h-12 w-12 text-green-300 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          </div>
          <div className="absolute bottom-40 left-20 opacity-10">
            <PiggyBank className="h-20 w-20 text-blue-300 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
          </div>
          <div className="absolute bottom-20 right-10 opacity-10">
            <Wallet className="h-14 w-14 text-green-300 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
          </div>
        </div>

        <div className="py-8 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-6 mb-6 shadow-lg">
                <UserCheck className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome, {currentCustomer.name}!
              </h1>
              <p className="text-xl text-gray-300 max-w-xl mx-auto">
                View your saved change and track your deposits with <span className="text-blue-400 font-semibold">مودع</span>.
              </p>
            </div>
            
            <div 
              className="rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <Coins className="h-16 w-16 text-blue-300 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        </div>
        <div className="absolute top-40 right-20 opacity-10">
          <TrendingUp className="h-12 w-12 text-green-300 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        </div>
        <div className="absolute bottom-40 left-20 opacity-10">
          <PiggyBank className="h-20 w-20 text-blue-300 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Wallet className="h-14 w-14 text-green-300 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
        </div>
      </div>

      <div className="py-8 px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-6 mb-6 shadow-lg">
              <User className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Customer Portal</h1>
            <p className="text-xl text-gray-300">
              {isRegistering 
                ? `Create a new account to track your saved change with مودع` 
                : `Sign in to view your saved change with مودع`}
            </p>
          </div>
          
          <div 
            className="rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div 
              className="px-6 py-4 border-b border-gray-700/50"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)'
              }}
            >
              <h2 className="text-xl font-semibold text-white">
                {isRegistering ? 'Create Account' : 'Sign In'}
              </h2>
            </div>
            <div className="p-6">
              {!isRegistering ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  
                  {error && <p className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-800">{error}</p>}
                  
                  <div className="flex flex-col space-y-3 pt-2">
                    <Button 
                      onClick={handleLogin}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
                    >
                      Sign In
                    </Button>
                    <Button 
                      variant="text" 
                      onClick={() => {
                        setIsRegistering(true);
                        setError('');
                      }}
                      className="text-gray-300 hover:text-blue-400"
                    >
                      Don't have an account? Create one
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="register-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  {error && <p className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-800">{error}</p>}
                  
                  <div className="flex flex-col space-y-3 pt-2">
                    <Button 
                      onClick={handleRegister}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
                    >
                      Create Account
                    </Button>
                    <Button 
                      variant="text" 
                      onClick={() => {
                        setIsRegistering(false);
                        setError('');
                      }}
                      className="text-gray-300 hover:text-blue-400"
                    >
                      Already have an account? Sign in
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;