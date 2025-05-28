import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Store, 
  CreditCard, 
  Settings, 
  TrendingUp, 
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Search,
  Calendar
} from 'lucide-react';
import { Merchant, AdminStats, Transaction, Customer } from '../types';
import axios from 'axios';

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock data - in a real app, this would come from your backend
  const [adminStats] = useState<AdminStats>({
    totalMerchants: 145,
    activeMerchants: 132,
    totalCustomers: 2847,
    totalTransactions: 15432,
    totalChangeAmount: 12847.50,
    monthlyRevenue: 2156.75,
    pendingTransactions: 23
  });

  const [merchants] = useState<Merchant[]>([
    {
      id: '1',
      name: 'QuickMart Grocery',
      email: 'info@quickmart.com',
      phone: '+1-555-0123',
      address: '123 Main Street, Downtown',
      registrationDate: new Date('2024-01-15'),
      status: 'active',
      totalTransactions: 245,
      totalChangeGenerated: 1250.75,
      monthlyFee: 25.00
    },
    {
      id: '2',
      name: 'TechZone Electronics',
      email: 'contact@techzone.com',
      phone: '+1-555-0456',
      address: '456 Tech Plaza, Business District',
      registrationDate: new Date('2024-02-01'),
      status: 'active',
      totalTransactions: 1890,
      totalChangeGenerated: 8975.25,
      monthlyFee: 125.00
    },
    {
      id: '3',
      name: 'Fresh Fitness Center',
      email: 'admin@freshfitness.com',
      phone: '+1-555-0789',
      address: '789 Health Avenue, Wellness District',
      registrationDate: new Date('2024-01-28'),
      status: 'pending',
      totalTransactions: 0,
      totalChangeGenerated: 0,
      monthlyFee: 0
    }
  ]);

  const [recentTransactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 125.75,
      change: 4.25,
      timestamp: new Date(),
      status: 'completed',
      merchantId: '1',
      merchantName: 'QuickMart Grocery'
    },
    {
      id: '2',
      amount: 89.50,
      change: 10.50,
      timestamp: new Date(Date.now() - 3600000),
      status: 'pending',
      merchantId: '2',
      merchantName: 'TechZone Electronics'
    },
    {
      id: '3',
      amount: 234.00,
      change: 6.00,
      timestamp: new Date(Date.now() - 7200000),
      status: 'completed',
      merchantId: '1',
      merchantName: 'QuickMart Grocery'
    }
  ]);

  const [payoutRequests, setPayoutRequests] = useState<any[]>([]);
  const [customerList, setCustomerList] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'payouts') {
      axios.get('http://localhost:4000/api/payout-requests')
        .then(res => setPayoutRequests(res.data))
        .catch(() => setPayoutRequests([]));
    }
    if (activeTab === 'customers') {
      axios.get('http://localhost:4000/api/customers')
        .then(res => setCustomerList(res.data))
        .catch(() => setCustomerList([]));
    }
  }, [activeTab]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'merchants', label: 'Merchants', icon: Store },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'payouts', label: 'Payout Requests', icon: DollarSign },
  ];

  const StatCard: React.FC<{ 
    title: string; 
    value: string | number; 
    icon: React.ComponentType<{ className?: string }>; 
    trend?: string;
    color: string;
  }> = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-r-4" style={{ borderRightColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && <p className="text-sm text-green-600 mt-1">{trend}</p>}
        </div>
        <div className={`p-3 rounded-full`} style={{ backgroundColor: color + '20' }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const MerchantCard: React.FC<{ merchant: Merchant }> = ({ merchant }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{merchant.name}</h3>
          <p className="text-gray-600">{merchant.email}</p>
          <p className="text-gray-600">{merchant.phone}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          merchant.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : merchant.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {merchant.status === 'active' ? 'Active' : merchant.status === 'pending' ? 'Pending' : 'Suspended'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Total Transactions</p>
          <p className="text-lg font-semibold">{merchant.totalTransactions}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Change</p>
          <p className="text-lg font-semibold">{merchant.totalChangeGenerated.toFixed(2)} DA</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Monthly Fee: {merchant.monthlyFee.toFixed(2)} DA
        </span>
        <div className="flex gap-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-green-600 hover:bg-green-50 rounded">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.merchantName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.amount.toFixed(2)} DA
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.change.toFixed(2)} DA
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {transaction.timestamp.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          transaction.status === 'completed'
            ? 'bg-green-100 text-green-800'
            : transaction.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {transaction.status === 'completed' ? 'Completed' : 
           transaction.status === 'pending' ? 'Pending' : 'Cancelled'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900 ml-2">
          View
        </button>
        <button className="text-green-600 hover:text-green-900">
          Update
        </button>
      </td>
    </tr>
  );

  const handleUpdatePayoutStatus = async (id: string, status: 'paid' | 'not_paid') => {
    await axios.patch(`http://localhost:4000/api/payout-requests/${id}`, { status });
    // Refresh list
    const res = await axios.get('http://localhost:4000/api/payout-requests');
    setPayoutRequests(res.data);
  };

  const handleDeleteCustomer = async (id: string) => {
    await axios.delete(`http://localhost:4000/api/customers/${id}`);
    setCustomerList((prev) => prev.filter((c) => c.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Merchants"
                value={adminStats.totalMerchants}
                icon={Store}
                trend="+12% this month"
                color="#3B82F6"
              />
              <StatCard
                title="Active Merchants"
                value={adminStats.activeMerchants}
                icon={CheckCircle}
                trend="+8% this month"
                color="#10B981"
              />
              <StatCard
                title="Total Customers"
                value={adminStats.totalCustomers.toLocaleString()}
                icon={Users}
                trend="+15% this month"
                color="#8B5CF6"
              />
              <StatCard
                title="Monthly Revenue"
                value={`${adminStats.monthlyRevenue.toFixed(2)} DA`}
                icon={DollarSign}
                trend="+23% this month"
                color="#F59E0B"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {recentTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{transaction.merchantName}</p>
                        <p className="text-sm text-gray-600">{transaction.change.toFixed(2)} DA change</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Transactions</span>
                    <span className="font-semibold">{adminStats.totalTransactions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Change Amount</span>
                    <span className="font-semibold">{adminStats.totalChangeAmount.toFixed(2)} DA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Transactions</span>
                    <span className="font-semibold text-yellow-600">{adminStats.pendingTransactions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Change Per Transaction</span>
                    <span className="font-semibold">{(adminStats.totalChangeAmount / adminStats.totalTransactions).toFixed(2)} DA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'merchants':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Merchant Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add New Merchant
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search merchants..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <select
                  className="px-4 py-2 border rounded-lg"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {merchants
                  .filter(merchant => 
                    (filterStatus === 'all' || merchant.status === filterStatus) &&
                    merchant.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((merchant) => (
                    <MerchantCard key={merchant.id} merchant={merchant} />
                  ))}
              </div>
            </div>
          </div>
        );

      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Transaction Management</h2>
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Merchant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <TransactionRow key={transaction.id} transaction={transaction} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Customer Management</h2>
            </div>
            <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-400">No customers found</td>
                    </tr>
                  ) : (
                    customerList.map((customer) => (
                      <tr key={customer.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${customer.balance.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => handleDeleteCustomer(customer.id)}
                          >Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">System Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Fee Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Base Monthly Fee</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="2.5"
                    />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">New Transaction Notifications</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Monthly Report Notifications</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">New Merchant Notifications</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payouts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Payout Requests</h2>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CCP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card Info</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested At</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payoutRequests.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-gray-400">No payout requests</td>
                    </tr>
                  ) : (
                    payoutRequests.map((req) => (
                      <tr key={req.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.ccp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.cardInfo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.merchantId || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(req.createdAt).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {req.status === 'paid' && <span className="text-green-600 font-semibold">Paid</span>}
                          {req.status === 'not_paid' && <span className="text-red-600 font-semibold">Not Paid</span>}
                          {req.status === 'pending' && <span className="text-yellow-600 font-semibold">Pending</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2 disabled:opacity-50"
                            disabled={req.status === 'paid'}
                            onClick={() => handleUpdatePayoutStatus(req.id, 'paid')}
                          >Mark as Paid</button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                            disabled={req.status === 'not_paid'}
                            onClick={() => handleUpdatePayoutStatus(req.id, 'not_paid')}
                          >Mark as Not Paid</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">مودع Admin Dashboard</h1>
              <p className="text-gray-600">Comprehensive management for the change aggregation system</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                System Administrator
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mb-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminView; 