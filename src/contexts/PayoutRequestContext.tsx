import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PayoutRequest {
  id: string;
  ccp: string;
  cardInfo: string;
  amount: number;
  status: 'pending' | 'paid' | 'not_paid';
  createdAt: string;
}

interface PayoutRequestContextType {
  payoutRequests: PayoutRequest[];
  addPayoutRequest: (req: Omit<PayoutRequest, 'id' | 'status' | 'createdAt'>) => void;
  updatePayoutStatus: (id: string, status: 'paid' | 'not_paid') => void;
}

const PayoutRequestContext = createContext<PayoutRequestContextType | undefined>(undefined);

export const PayoutRequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('payoutRequests');
    if (stored) setPayoutRequests(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('payoutRequests', JSON.stringify(payoutRequests));
  }, [payoutRequests]);

  const addPayoutRequest = (req: Omit<PayoutRequest, 'id' | 'status' | 'createdAt'>) => {
    setPayoutRequests(prev => [
      {
        ...req,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const updatePayoutStatus = (id: string, status: 'paid' | 'not_paid') => {
    setPayoutRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <PayoutRequestContext.Provider value={{ payoutRequests, addPayoutRequest, updatePayoutStatus }}>
      {children}
    </PayoutRequestContext.Provider>
  );
};

export const usePayoutRequests = () => {
  const ctx = useContext(PayoutRequestContext);
  if (!ctx) throw new Error('usePayoutRequests must be used within a PayoutRequestProvider');
  return ctx;
}; 