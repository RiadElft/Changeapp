export interface Transaction {
  id: string;
  amount: number;
  change: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'cancelled';
  merchantId?: string;
  merchantName?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: Date;
  status: 'active' | 'suspended' | 'pending';
  totalTransactions: number;
  totalChangeGenerated: number;
  monthlyFee: number;
}

export interface AdminStats {
  totalMerchants: number;
  activeMerchants: number;
  totalCustomers: number;
  totalTransactions: number;
  totalChangeAmount: number;
  monthlyRevenue: number;
  pendingTransactions: number;
}

export interface Deposit {
  id: string;
  customerId: string;
  amount: number;
  timestamp: Date;
  transactionId: string;
}

export type ChangeOption = 'return' | 'donate' | 'deposit';

export interface UserContextType {
  userType: 'shop' | 'customer' | 'admin' | null;
  setUserType: (type: 'shop' | 'customer' | 'admin' | null) => void;
  currentCustomer: Customer | null;
  setCurrentCustomer: (customer: Customer | null) => void;
}

export interface TransactionContextType {
  currentTransaction: Transaction | null;
  setCurrentTransaction: (transaction: Transaction | null) => void;
  deposits: Deposit[];
  addDeposit: (deposit: Deposit) => void;
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomerBalance: (customerId: string, amount: number) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void;
}