import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../common/Card';
import Button from '../common/Button';
import { useTransaction } from '../../contexts/TransactionContext';
import { Transaction } from '../../types';
import { DollarSign, Calculator } from 'lucide-react';

const TransactionDisplay: React.FC = () => {
  const { currentTransaction, setCurrentTransaction } = useTransaction();
  const [amount, setAmount] = useState<string>('');
  const [paid, setPaid] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    const amountValue = parseFloat(amount);
    const paidValue = parseFloat(paid);
    
    if (isNaN(amountValue) || isNaN(paidValue)) {
      setError('Please enter valid numbers');
      return;
    }
    
    if (paidValue < amountValue) {
      setError('Paid amount must be greater than or equal to the transaction amount');
      return;
    }
    
    setError('');
    const change = paidValue - amountValue;
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: amountValue,
      change,
      timestamp: new Date(),
      status: 'pending',
    };
    
    setCurrentTransaction(newTransaction);
  };

  const resetTransaction = () => {
    setCurrentTransaction(null);
    setAmount('');
    setPaid('');
    setError('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-blue-600 text-white">
        <h2 className="text-xl font-semibold flex items-center">
          <DollarSign className="mr-2" />
          Transaction Calculator
        </h2>
      </CardHeader>
      
      <CardBody>
        {!currentTransaction ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="amount\" className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Amount ($)
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label htmlFor="paid" className="block text-sm font-medium text-gray-700 mb-1">
                Amount Paid ($)
              </label>
              <input
                id="paid"
                type="number"
                step="0.01"
                min="0"
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
            
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transaction Amount:</span>
              <span className="font-medium">${currentTransaction.amount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-medium">${(currentTransaction.amount + currentTransaction.change).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 px-4 bg-yellow-100 rounded-md border border-yellow-400">
              <span className="font-medium text-yellow-800">Change Due:</span>
              <span className="font-bold text-yellow-800">${currentTransaction.change.toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardBody>
      
      <CardFooter className="flex justify-end">
        {!currentTransaction ? (
          <Button 
            onClick={handleCalculate}
            className="flex items-center"
          >
            <Calculator size={18} className="mr-2" />
            Calculate Change
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={resetTransaction}
          >
            New Transaction
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TransactionDisplay;