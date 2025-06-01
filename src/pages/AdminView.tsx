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
  Calendar,
  UserCheck,
  UserX
} from 'lucide-react';
import { Merchant, AdminStats, Transaction, Customer } from '../types';
import { usePayoutRequests } from '../contexts/PayoutRequestContext';
import { useMerchantAuth } from '../contexts/MerchantAuthContext';

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const { merchants, updateMerchantStatus, getPendingMerchants } = useMerchantAuth();
  const pendingMerchants = getPendingMerchants();
  
  // Remove mock data - use real data only
  const adminStats: AdminStats = {
    totalMerchants: merchants.length,
    activeMerchants: merchants.filter(m => m.status === 'approved').length,
    totalCustomers: 0, // Replace with real customer count if available
    totalTransactions: 0, // Replace with real transaction count if available
    totalChangeAmount: 0, // Replace with real change amount if available
    monthlyRevenue: 0, // Replace with real revenue if available
    pendingTransactions: 0 // Replace with real pending transactions if available
  };

  // Remove mock recentTransactions - use real transactions if available
  const recentTransactions: Transaction[] = [];

  const { payoutRequests, updatePayoutStatus } = usePayoutRequests();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'merchants', label: 'Merchants', icon: Store },
    { id: 'merchant-approvals', label: 'Merchant Approvals', icon: UserCheck, badge: pendingMerchants.length },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'payouts', label: 'Payout Requests', icon: DollarSign },
  ];

  const pendingPayoutCount = payoutRequests.filter(r => r.status === 'pending').length;

  const handleApproveMerchant = (merchantId: string) => {
    updateMerchantStatus(merchantId, 'approved');
  };

  const handleRejectMerchant = (merchantId: string) => {
    updateMerchantStatus(merchantId, 'rejected');
  };

  const handleSuspendMerchant = (merchantId: string) => {
    updateMerchantStatus(merchantId, 'suspended');
  };

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

  const MerchantCard: React.FC<{ merchant: Merchant; showActions?: boolean }> = ({ merchant, showActions = true }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{merchant.name}</h3>
          <p className="text-gray-600">{merchant.email}</p>
          <p className="text-gray-600">{merchant.phone}</p>
          <p className="text-gray-600 text-sm mt-1">{merchant.address}</p>
          <p className="text-gray-600 text-sm">نوع النشاط: {merchant.businessType}</p>
          {merchant.businessLicense && (
            <p className="text-gray-600 text-sm">الرخصة: {merchant.businessLicense}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          merchant.status === 'approved' 
            ? 'bg-green-100 text-green-800' 
            : merchant.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : merchant.status === 'rejected'
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {merchant.status === 'approved' ? 'مقبول' : 
           merchant.status === 'pending' ? 'قيد المراجعة' : 
           merchant.status === 'rejected' ? 'مرفوض' : 'معلق'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">إجمالي المعاملات</p>
          <p className="text-lg font-semibold">{merchant.totalTransactions}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">إجمالي الفكة</p>
          <p className="text-lg font-semibold">{merchant.totalChangeGenerated.toFixed(2)} دج</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          تاريخ التسجيل: {merchant.registrationDate.toLocaleDateString()}
        </span>
        {showActions && (
          <div className="flex gap-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="عرض التفاصيل">
              <Eye className="w-4 h-4" />
            </button>
            {merchant.status === 'pending' && (
              <>
                <button 
                  onClick={() => handleApproveMerchant(merchant.id)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded"
                  title="قبول"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleRejectMerchant(merchant.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="رفض"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </>
            )}
            {merchant.status === 'approved' && (
              <button 
                onClick={() => handleSuspendMerchant(merchant.id)}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded"
                title="تعليق"
              >
                <UserX className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
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
        {transaction.amount.toFixed(2)} دج
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.change.toFixed(2)} دج
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
          {transaction.status === 'completed' ? 'مكتمل' : 
           transaction.status === 'pending' ? 'قيد التنفيذ' : 'ملغي'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900 ml-2">عرض</button>
        <button className="text-green-600 hover:text-green-900">تحديث</button>
      </td>
    </tr>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="إجمالي التجار"
                value={adminStats.totalMerchants}
                icon={Store}
                trend="+12% هذا الشهر"
                color="#3B82F6"
              />
              <StatCard
                title="التجار النشطون"
                value={adminStats.activeMerchants}
                icon={CheckCircle}
                trend="+8% هذا الشهر"
                color="#10B981"
              />
              <StatCard
                title="إجمالي العملاء"
                value={adminStats.totalCustomers.toLocaleString()}
                icon={Users}
                trend="+15% هذا الشهر"
                color="#8B5CF6"
              />
              <StatCard
                title="إيرادات الشهر"
                value={`${adminStats.monthlyRevenue.toFixed(2)} دج`}
                icon={DollarSign}
                trend="+23% هذا الشهر"
                color="#F59E0B"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">أحدث المعاملات</h3>
                <div className="space-y-3">
                  {recentTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{transaction.merchantName}</p>
                        <p className="text-sm text-gray-600">{transaction.change.toFixed(2)} دج فكة</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">إحصائيات سريعة</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>إجمالي المعاملات</span>
                    <span className="font-semibold">{adminStats.totalTransactions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>إجمالي الفكة</span>
                    <span className="font-semibold">{adminStats.totalChangeAmount.toFixed(2)} دج</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المعاملات المعلقة</span>
                    <span className="font-semibold text-yellow-600">{adminStats.pendingTransactions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط الفكة لكل معاملة</span>
                    <span className="font-semibold">{(adminStats.totalChangeAmount / adminStats.totalTransactions).toFixed(2)} دج</span>
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
              <h2 className="text-2xl font-bold">إدارة التجار</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                إضافة تاجر جديد
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث عن تاجر..."
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
                  <option value="all">كل الحالات</option>
                  <option value="approved">مقبول</option>
                  <option value="pending">قيد المراجعة</option>
                  <option value="rejected">مرفوض</option>
                  <option value="suspended">معلق</option>
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

      case 'merchant-approvals':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">موافقات التجار</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {pendingMerchants.length} طلب قيد المراجعة
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {pendingMerchants.length} قيد المراجعة
                </span>
              </div>
            </div>

            {pendingMerchants.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8">
                <div className="text-center py-12">
                  <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">لا توجد طلبات قيد المراجعة</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    تم مراجعة جميع طلبات التجار.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                    <h3 className="text-sm font-medium text-yellow-800">
                      يتطلب المراجعة
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-yellow-700">
                    الطلبات التالية بانتظار مراجعتك. يرجى التحقق من معلومات النشاط قبل القبول.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pendingMerchants.map((merchant) => (
                    <div key={merchant.id} className="bg-white rounded-lg shadow-lg p-6 border-2 border-yellow-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900">{merchant.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{merchant.businessType}</p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          قيد المراجعة
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700">البريد الإلكتروني</p>
                            <p className="text-sm text-gray-600">{merchant.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">رقم الهاتف</p>
                            <p className="text-sm text-gray-600">{merchant.phone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">عنوان النشاط</p>
                          <p className="text-sm text-gray-600">{merchant.address}</p>
                        </div>

                        {merchant.businessLicense && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">رخصة النشاط</p>
                            <p className="text-sm text-gray-600">{merchant.businessLicense}</p>
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-gray-700">تاريخ التسجيل</p>
                          <p className="text-sm text-gray-600">{merchant.registrationDate.toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApproveMerchant(merchant.id)}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          قبول
                        </button>
                        <button
                          onClick={() => handleRejectMerchant(merchant.id)}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          رفض
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">إدارة المعاملات</h2>
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  تصدير
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  تصفية
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم المعاملة
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التاجر
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المبلغ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الفكة
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التاريخ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      إجراءات
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
              <h2 className="text-2xl font-bold">إدارة العملاء</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                عرض تفاصيل العملاء
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">إدارة العملاء</h3>
                <p className="mt-1 text-sm text-gray-500">
                  عرض وإدارة بيانات العملاء والأرصدة
                </p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    عرض قائمة العملاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">إعدادات النظام</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">إعدادات الرسوم</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">الرسوم الشهرية الأساسية</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">نسبة العمولة (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="2.5"
                    />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    حفظ الإعدادات
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">إعدادات الإشعارات</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">إشعارات المعاملات الجديدة</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">إشعارات التقارير الشهرية</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">إشعارات التجار الجدد</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    حفظ الإعدادات
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payouts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">طلبات السحب</h2>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الرقم</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CCP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">معلومات البطاقة</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الطلب</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payoutRequests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-400">لا توجد طلبات سحب</td>
                    </tr>
                  ) : (
                    payoutRequests.map((req) => (
                      <tr key={req.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.ccp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.cardInfo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(req.createdAt).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {req.status === 'paid' && <span className="text-green-600 font-semibold">تم الدفع</span>}
                          {req.status === 'not_paid' && <span className="text-red-600 font-semibold">لم يتم الدفع</span>}
                          {req.status === 'pending' && <span className="text-yellow-600 font-semibold">قيد التنفيذ</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2 disabled:opacity-50"
                            disabled={req.status === 'paid'}
                            onClick={() => updatePayoutStatus(req.id, 'paid')}
                          >تحديد كمدفوع</button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                            disabled={req.status === 'not_paid'}
                            onClick={() => updatePayoutStatus(req.id, 'not_paid')}
                          >تحديد كغير مدفوع</button>
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
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم المشرف</h1>
              <p className="text-gray-600">إدارة شاملة لنظام تجميع الفكة</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                مشرف النظام
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-8 flex-row-reverse">
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
                  {tab.id === 'dashboard' && 'لوحة المعلومات'}
                  {tab.id === 'merchants' && 'إدارة التجار'}
                  {tab.id === 'merchant-approvals' && 'موافقات التجار'}
                  {tab.id === 'transactions' && 'المعاملات'}
                  {tab.id === 'customers' && 'العملاء'}
                  {tab.id === 'settings' && 'الإعدادات'}
                  {tab.id === 'payouts' && 'طلبات السحب'}
                  {tab.id === 'payouts' && pendingPayoutCount > 0 && (
                    <span className="ml-2 inline-block bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {pendingPayoutCount}
                    </span>
                  )}
                  {tab.id === 'merchant-approvals' && pendingMerchants.length > 0 && (
                    <span className="ml-2 inline-block bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {pendingMerchants.length}
                    </span>
                  )}
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