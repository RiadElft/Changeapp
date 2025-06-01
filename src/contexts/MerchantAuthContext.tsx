import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Merchant, MerchantSignupData, MerchantLoginData, AuthenticatedMerchant } from '../types';

interface MerchantAuthContextType {
  merchants: Merchant[];
  signupMerchant: (data: MerchantSignupData) => Promise<{ success: boolean; message: string; merchantId?: string }>;
  loginMerchant: (data: MerchantLoginData) => Promise<{ success: boolean; message: string; merchant?: AuthenticatedMerchant }>;
  updateMerchantStatus: (merchantId: string, status: Merchant['status']) => void;
  getPendingMerchants: () => Merchant[];
  getMerchantById: (id: string) => Merchant | undefined;
}

const MerchantAuthContext = createContext<MerchantAuthContextType | undefined>(undefined);

export const MerchantAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [merchants, setMerchants] = useState<Merchant[]>([
    // Sample approved merchant for testing
    {
      id: 'merchant-1',
      name: 'Sample Coffee Shop',
      email: 'coffee@example.com',
      phone: '+1234567890',
      address: '123 Coffee Street',
      businessType: 'Restaurant',
      businessLicense: 'LIC123456',
      registrationDate: new Date('2024-01-15'),
      status: 'approved',
      totalTransactions: 150,
      totalChangeGenerated: 245.75,
      monthlyFee: 25.00,
      password: 'password123', // In real app, this should be hashed
      lastLogin: new Date('2024-01-20')
    }
  ]);

  const signupMerchant = async (data: MerchantSignupData): Promise<{ success: boolean; message: string; merchantId?: string }> => {
    try {
      // Check if merchant already exists
      const existingMerchant = merchants.find(m => m.email === data.email);
      if (existingMerchant) {
        return { success: false, message: 'A merchant with this email already exists' };
      }

      // Create new merchant
      const newMerchant: Merchant = {
        id: `merchant-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        businessType: data.businessType,
        businessLicense: data.businessLicense,
        password: data.password, // In real app, this should be hashed
        registrationDate: new Date(),
        status: 'pending',
        totalTransactions: 0,
        totalChangeGenerated: 0,
        monthlyFee: 25.00, // Default monthly fee
      };

      setMerchants(prev => [...prev, newMerchant]);
      
      return { 
        success: true, 
        message: 'Merchant registration successful! Your application is pending admin approval.', 
        merchantId: newMerchant.id 
      };
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const loginMerchant = async (data: MerchantLoginData): Promise<{ success: boolean; message: string; merchant?: AuthenticatedMerchant }> => {
    try {
      const merchant = merchants.find(m => m.email === data.email && m.password === data.password);
      
      if (!merchant) {
        return { success: false, message: 'Invalid email or password' };
      }

      if (merchant.status === 'pending') {
        return { success: false, message: 'Your account is pending admin approval. Please wait for approval before logging in.' };
      }

      if (merchant.status === 'rejected') {
        return { success: false, message: 'Your merchant application has been rejected. Please contact support.' };
      }

      if (merchant.status === 'suspended') {
        return { success: false, message: 'Your account has been suspended. Please contact support.' };
      }

      // Update last login
      setMerchants(prev => prev.map(m => 
        m.id === merchant.id ? { ...m, lastLogin: new Date() } : m
      ));

      const authenticatedMerchant: AuthenticatedMerchant = {
        id: merchant.id,
        name: merchant.name,
        email: merchant.email,
        phone: merchant.phone,
        address: merchant.address,
        businessType: merchant.businessType,
        status: merchant.status,
        registrationDate: merchant.registrationDate,
        totalTransactions: merchant.totalTransactions,
        totalChangeGenerated: merchant.totalChangeGenerated,
        monthlyFee: merchant.monthlyFee,
      };

      return { success: true, message: 'Login successful!', merchant: authenticatedMerchant };
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const updateMerchantStatus = (merchantId: string, status: Merchant['status']) => {
    setMerchants(prev => prev.map(merchant => 
      merchant.id === merchantId ? { ...merchant, status } : merchant
    ));
  };

  const getPendingMerchants = () => {
    return merchants.filter(merchant => merchant.status === 'pending');
  };

  const getMerchantById = (id: string) => {
    return merchants.find(merchant => merchant.id === id);
  };

  return (
    <MerchantAuthContext.Provider value={{
      merchants,
      signupMerchant,
      loginMerchant,
      updateMerchantStatus,
      getPendingMerchants,
      getMerchantById,
    }}>
      {children}
    </MerchantAuthContext.Provider>
  );
};

export const useMerchantAuth = (): MerchantAuthContextType => {
  const context = useContext(MerchantAuthContext);
  if (context === undefined) {
    throw new Error('useMerchantAuth must be used within a MerchantAuthProvider');
  }
  return context;
}; 