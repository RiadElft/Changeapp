import React, { useState } from 'react';
import { useTransaction } from '../../contexts/TransactionContext';
import Card, { CardHeader, CardBody } from '../common/Card';
import Button from '../common/Button';
import { ArrowLeft, UserPlus, User, Search } from 'lucide-react';
import { Customer, Deposit } from '../../types';
import axios from 'axios';

interface CustomerFormProps {
  amount: number;
  onBack: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ amount, onBack }) => {
  const { 
    currentTransaction, 
    customers, 
    addCustomer, 
    updateCustomerBalance, 
    addDeposit,
    updateTransactionStatus 
  } = useTransaction();
  
  const [formType, setFormType] = useState<'search' | 'create'>('search');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchError, setSearchError] = useState('');
  const [formError, setFormError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSearch = () => {
    if (!searchEmail.trim()) {
      setSearchError('Please enter an email address');
      return;
    }
    
    const foundCustomer = customers.find(c => c.email.toLowerCase() === searchEmail.toLowerCase());
    
    if (foundCustomer) {
      setSelectedCustomer(foundCustomer);
      setSearchError('');
    } else {
      setSearchError('No customer found with that email. Please create a new account.');
    }
  };

  const handleCreateCustomer = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFormError('All fields are required');
      return;
    }
    
    if (!email.includes('@')) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    const customerExists = customers.some(c => c.email.toLowerCase() === email.toLowerCase());
    
    if (customerExists) {
      setFormError('A customer with this email already exists');
      return;
    }
    
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      balance: 0,
    };
    
    addCustomer(newCustomer);
    setSelectedCustomer(newCustomer);
    setFormError('');
  };

  const handleConfirmDeposit = async () => {
    if (!selectedCustomer || !currentTransaction) return;

    const deposit: Deposit = {
      id: Date.now().toString(),
      customerId: selectedCustomer.id,
      amount,
      timestamp: new Date(),
      transactionId: currentTransaction.id,
    };

    try {
      await axios.patch(`http://localhost:4000/api/customers/${selectedCustomer.id}/balance`, { amount });
      addDeposit(deposit);
      updateCustomerBalance(selectedCustomer.id, amount);
      updateTransactionStatus(currentTransaction.id, 'completed');
      setIsSuccess(true);
    } catch (e) {
      setFormError('Failed to update customer balance.');
    }
  };

  if (isSuccess) {
    return (
      <Card>
        <CardHeader className="bg-green-700 text-white">
          <h2 className="text-xl font-semibold">Deposit Successful</h2>
        </CardHeader>
        <CardBody>
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Change Deposited Successfully!</h3>
            <p className="text-gray-600 mb-4">
              ${amount.toFixed(2)} has been added to {selectedCustomer?.name}'s account.
            </p>
            <Button onClick={onBack}>Done</Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="bg-blue-600 text-white">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-2 text-white hover:text-gray-200">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-xl font-semibold">
            {formType === 'search' ? 'Find Customer' : 'Create Customer Account'}
          </h2>
        </div>
      </CardHeader>
      
      <CardBody>
        {!selectedCustomer ? (
          <div>
            <div className="flex mb-4">
              <Button
                variant={formType === 'search' ? 'primary' : 'outline'}
                className="flex-1 mr-2"
                onClick={() => setFormType('search')}
              >
                Find Existing
              </Button>
              <Button
                variant={formType === 'create' ? 'primary' : 'outline'}
                className="flex-1"
                onClick={() => setFormType('create')}
              >
                Create New
              </Button>
            </div>
            
            {formType === 'search' ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="search-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Email
                  </label>
                  <div className="relative">
                    <input
                      id="search-email"
                      type="email"
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="customer@example.com"
                    />
                    <button 
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Search size={20} />
                    </button>
                  </div>
                  {searchError && <p className="text-red-600 text-sm mt-1">{searchError}</p>}
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSearch}>
                    <div className="flex items-center">
                      <Search size={18} className="mr-2" />
                      Search
                    </div>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                {formError && <p className="text-red-600 text-sm">{formError}</p>}
                
                <div className="flex justify-end">
                  <Button onClick={handleCreateCustomer}>
                    <div className="flex items-center">
                      <UserPlus size={18} className="mr-2" />
                      Create Account
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedCustomer.name}</h3>
                  <p className="text-gray-600">{selectedCustomer.email}</p>
                  <p className="text-gray-600">{selectedCustomer.phone}</p>
                  <p className="text-blue-600 font-medium mt-1">
                    Current Balance: ${selectedCustomer.balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-400 rounded-lg">
              <p className="text-yellow-800">
                Deposit amount: <span className="font-bold">${amount.toFixed(2)}</span>
              </p>
              <p className="text-yellow-800 text-sm mt-1">
                New balance will be: ${(selectedCustomer.balance + amount).toFixed(2)}
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmDeposit}>
                Confirm Deposit
              </Button>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

// This icon component is needed for the success state
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default CustomerForm;