import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Customer, UserContextType, AuthenticatedMerchant } from '../types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<'shop' | 'customer' | 'admin' | null>(null);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [currentMerchant, setCurrentMerchant] = useState<AuthenticatedMerchant | null>(null);
  const [merchantAuthState, setMerchantAuthState] = useState<'login' | 'signup' | 'authenticated' | 'pending_approval' | null>(null);

  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        currentCustomer,
        setCurrentCustomer,
        currentMerchant,
        setCurrentMerchant,
        merchantAuthState,
        setMerchantAuthState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};