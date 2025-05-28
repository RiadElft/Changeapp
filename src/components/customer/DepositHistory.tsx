import React from 'react';
import { Deposit } from '../../types';
import { PiggyBank, Calendar } from 'lucide-react';

interface DepositHistoryProps {
  deposits: Deposit[];
}

const DepositHistory: React.FC<DepositHistoryProps> = ({ deposits }) => {
  // Sort deposits by timestamp, newest first
  const sortedDeposits = [...deposits].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (sortedDeposits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <PiggyBank className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p className="text-lg font-medium">No deposits yet</p>
        <p className="mt-1">Your deposit history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {sortedDeposits.map((deposit) => (
        <div key={deposit.id} className="py-4 flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-green-100 rounded-full p-2">
              <PiggyBank className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              Deposit Received
            </p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              <span>
                {formatDate(deposit.timestamp)}
              </span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 font-medium text-green-600">
            +${deposit.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default DepositHistory;