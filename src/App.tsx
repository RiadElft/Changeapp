import React from 'react';
import { UserProvider, useUser } from './contexts/UserContext';
import { TransactionProvider } from './contexts/TransactionContext';
import { PayoutRequestProvider } from './contexts/PayoutRequestContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopView from './pages/ShopView';
import CustomerView from './pages/CustomerView';
import AdminView from './pages/AdminView';

const AppContent: React.FC = () => {
  const { userType } = useUser();

  return (
    <PayoutRequestProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {userType === null && <HomePage />}
          {userType === 'shop' && <ShopView />}
          {userType === 'customer' && <CustomerView />}
          {userType === 'admin' && <AdminView />}
        </main>
        <Footer />
      </div>
    </PayoutRequestProvider>
  );
};

function App() {
  return (
    <UserProvider>
      <TransactionProvider>
        <AppContent />
      </TransactionProvider>
    </UserProvider>
  );
}

export default App;