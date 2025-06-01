import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import { TransactionProvider } from './contexts/TransactionContext';
import { PayoutRequestProvider } from './contexts/PayoutRequestContext';
import { MerchantAuthProvider } from './contexts/MerchantAuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopView from './pages/ShopView';
import AdminView from './pages/AdminView';
import MerchantAuth from './components/merchant/MerchantAuth';

const AppContent: React.FC = () => {
  const { userType, merchantAuthState } = useUser();

  return (
    <PayoutRequestProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/shop" 
              element={
                userType === 'shop' ? (
                  merchantAuthState === 'authenticated' ? (
                    <ShopView />
                  ) : (
                    <MerchantAuth />
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/admin" 
              element={
                userType === 'admin' ? (
                  <AdminView />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </PayoutRequestProvider>
  );
};

function App() {
  return (
    <Router>
      <UserProvider>
        <MerchantAuthProvider>
          <TransactionProvider>
            <AppContent />
          </TransactionProvider>
        </MerchantAuthProvider>
      </UserProvider>
    </Router>
  );
}

export default App;