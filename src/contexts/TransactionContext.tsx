import React, { createContext, useState, useContext, ReactNode } from 'react';
import { 
  Transaction, 
  Deposit, 
  Customer,
  TransactionContextType
} from '../types';

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addDeposit = (deposit: Deposit) => {
    setDeposits((prev) => [...prev, deposit]);
  };

  const addCustomer = (customer: Customer) => {
    setCustomers((prev) => [...prev, customer]);
  };

  const updateCustomerBalance = (customerId: string, amount: number) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? { ...customer, balance: customer.balance + amount }
          : customer
      )
    );
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const updateTransactionStatus = (id: string, status: Transaction['status']) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? { ...transaction, status } : transaction
      )
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        currentTransaction,
        setCurrentTransaction,
        deposits,
        addDeposit,
        customers,
        addCustomer,
        updateCustomerBalance,
        transactions,
        addTransaction,
        updateTransactionStatus,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};