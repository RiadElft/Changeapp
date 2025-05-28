import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Customer, UserContextType } from '../types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<'shop' | 'customer' | 'admin' | null>(null);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        currentCustomer,
        setCurrentCustomer,
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