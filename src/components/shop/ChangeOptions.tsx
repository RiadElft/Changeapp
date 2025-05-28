import React, { useState } from 'react';
import { useTransaction } from '../../contexts/TransactionContext';
import { useUser } from '../../contexts/UserContext';
import Card, { CardHeader, CardBody } from '../common/Card';
import Button from '../common/Button';
import CustomerForm from './CustomerForm';
import { ArrowLeft, Banknote, Heart, PiggyBank } from 'lucide-react';
import { ChangeOption } from '../../types';

const ChangeOptions: React.FC = () => {
  const { currentTransaction, updateTransactionStatus } = useTransaction();
  const { userType } = useUser();
  const [selectedOption, setSelectedOption] = useState<ChangeOption | null>(null);

  if (!currentTransaction || userType !== 'shop') {
    return null;
  }

  const handleOptionSelect = (option: ChangeOption) => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  const handleReturnCash = () => {
    updateTransactionStatus(currentTransaction.id, 'completed');
    setSelectedOption(null);
  };

  const handleDonateConfirm = () => {
    updateTransactionStatus(currentTransaction.id, 'completed');
    setSelectedOption(null);
  };

  return (
    <div className="mt-6 w-full max-w-md mx-auto">
      {!selectedOption ? (
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <h2 className="text-xl font-semibold">Change Options</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p className="text-gray-700 mb-4">
                What would you like to do with the change amount of <span className="font-bold text-yellow-600">${currentTransaction.change.toFixed(2)}</span>?
              </p>
              
              <Button 
                onClick={() => handleOptionSelect('return')}
                variant="outline"
                fullWidth
                className="flex items-center justify-between py-3"
              >
                <span className="font-medium">Return Cash</span>
                <Banknote className="text-gray-500" />
              </Button>
              
              <Button 
                onClick={() => handleOptionSelect('donate')}
                variant="outline"
                fullWidth
                className="flex items-center justify-between py-3"
              >
                <span className="font-medium">Donate to Charity</span>
                <Heart className="text-red-500" />
              </Button>
              
              <Button 
                onClick={() => handleOptionSelect('deposit')}
                variant="primary"
                fullWidth
                className="flex items-center justify-between py-3"
              >
                <span className="font-medium">Deposit to Customer Account</span>
                <PiggyBank className="text-white" />
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : selectedOption === 'return' ? (
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center">
              <button onClick={handleBack} className="mr-2 text-white hover:text-gray-200">
                <ArrowLeft size={18} />
              </button>
              <h2 className="text-xl font-semibold">Return Cash</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p className="text-gray-700">
                Please return <span className="font-bold text-yellow-600">${currentTransaction.change.toFixed(2)}</span> to the customer.
              </p>
              
              <div className="flex justify-end">
                <Button onClick={handleReturnCash}>Confirm Return</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : selectedOption === 'donate' ? (
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center">
              <button onClick={handleBack} className="mr-2 text-white hover:text-gray-200">
                <ArrowLeft size={18} />
              </button>
              <h2 className="text-xl font-semibold">Donate to Charity</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p className="text-gray-700">
                Donate <span className="font-bold text-yellow-600">${currentTransaction.change.toFixed(2)}</span> to our partner charity.
              </p>
              
              <div className="flex justify-end">
                <Button onClick={handleDonateConfirm}>Confirm Donation</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <CustomerForm 
          amount={currentTransaction.change}
          onBack={handleBack} 
        />
      )}
    </div>
  );
};

export default ChangeOptions;