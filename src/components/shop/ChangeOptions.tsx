import React, { useState } from 'react';
import { useTransaction } from '../../contexts/TransactionContext';
import { useUser } from '../../contexts/UserContext';
import Card, { CardHeader, CardBody } from '../common/Card';
import Button from '../common/Button';
import CustomerForm from './CustomerForm';
import { ArrowLeft, Banknote, Heart, PiggyBank, CreditCard } from 'lucide-react';
import { ChangeOption } from '../../types';
import axios from 'axios';

const ChangeOptions: React.FC = () => {
  const { currentTransaction, updateTransactionStatus } = useTransaction();
  const { userType } = useUser();
  const [selectedOption, setSelectedOption] = useState<ChangeOption | null>(null);
  const [showPayoutConfirmation, setShowPayoutConfirmation] = useState(false);
  const [ccp, setCcp] = useState('');
  const [cardInfo, setCardInfo] = useState('');

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

  const handlePayoutRequest = async () => {
    try {
      await axios.post('http://localhost:4000/api/payout-requests', {
        ccp,
        cardInfo,
        amount: currentTransaction.change,
        merchantId: currentTransaction.merchantId || undefined,
      });
      setShowPayoutConfirmation(true);
    } catch (e) {
      alert('Failed to send payout request.');
    }
    setSelectedOption(null);
    setCcp('');
    setCardInfo('');
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
              
              <Button
                onClick={() => handleOptionSelect('payout')}
                variant="outline"
                fullWidth
                className="flex items-center justify-between py-3"
              >
                <span className="font-medium">Request Admin Payout</span>
                <CreditCard className="text-blue-500" />
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
      ) : selectedOption === 'payout' ? (
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center">
              <button onClick={handleBack} className="mr-2 text-white hover:text-gray-200">
                <ArrowLeft size={18} />
              </button>
              <h2 className="text-xl font-semibold">Request Admin Payout</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p className="text-gray-700">
                Enter your CCP or Card info to request the admin to pay the remaining change amount of <span className="font-bold text-yellow-600">${currentTransaction.change.toFixed(2)}</span>.
              </p>
              <input
                type="text"
                placeholder="CCP Number"
                className="w-full border rounded-lg px-3 py-2 mb-2"
                value={ccp}
                onChange={e => setCcp(e.target.value)}
              />
              <input
                type="text"
                placeholder="Card Info (optional)"
                className="w-full border rounded-lg px-3 py-2 mb-2"
                value={cardInfo}
                onChange={e => setCardInfo(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handlePayoutRequest} disabled={!ccp && !cardInfo}>OK</Button>
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
      {showPayoutConfirmation && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
          Payout request sent to admin!
        </div>
      )}
    </div>
  );
};

export default ChangeOptions;