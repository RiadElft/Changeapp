import React from 'react';
import Card, { CardHeader, CardBody } from '../common/Card';
import { useTransaction } from '../../contexts/TransactionContext';
import { useUser } from '../../contexts/UserContext';
import DepositHistory from './DepositHistory';
import { Wallet, TrendingUp, Clipboard } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentCustomer } = useUser();
  const { deposits } = useTransaction();

  if (!currentCustomer) return null;

  const customerDeposits = deposits.filter(
    deposit => deposit.customerId === currentCustomer.id
  );

  const totalSaved = customerDeposits.reduce(
    (total, deposit) => total + deposit.amount,
    0
  );

  // Get the last 30 days of activity
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentDeposits = customerDeposits.filter(
    deposit => deposit.timestamp > thirtyDaysAgo
  );
  
  const recentTotal = recentDeposits.reduce(
    (total, deposit) => total + deposit.amount,
    0
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-green-700 to-green-800 text-white">
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-green-100 mb-1">Current Balance</p>
                <h3 className="text-2xl font-bold">${currentCustomer.balance.toFixed(2)}</h3>
              </div>
              <div className="bg-green-600 rounded-full p-2">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 mb-1">Total Saved</p>
                <h3 className="text-2xl font-bold text-gray-800">${totalSaved.toFixed(2)}</h3>
              </div>
              <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 mb-1">Last 30 Days</p>
                <h3 className="text-2xl font-bold text-gray-800">${recentTotal.toFixed(2)}</h3>
              </div>
              <div className="bg-yellow-100 text-yellow-600 rounded-full p-2">
                <Clipboard className="h-6 w-6" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="bg-blue-600 text-white">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </CardHeader>
        <CardBody>
          <DepositHistory deposits={customerDeposits.slice(0, 10)} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;