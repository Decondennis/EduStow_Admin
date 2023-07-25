import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserAdmin from './components/UserAdmin';
import NewsletterAdmin from './components/NewsletterAdmin';
import AdminDashboard from './components/AdminDashboard';
import UpdatePayment from './components/UpdatePayment';
import UserPaymentForm from './components/UserPaymentForm';
import SideBar from './components/SideBar'; 
import AdminTransaction from './components/AdminTransaction';
import UserTransactionHistory from './components/UserTransactionHistory';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/UserAdmin" element={<UserAdmin />} />
          <Route path="/NewsletterAdmin" element={<NewsletterAdmin />} />
          <Route path="/UpdatePayment" element={<UpdatePayment />} />
          <Route path="/UserPaymentForm" element={<UserPaymentForm />} />
          <Route path="/SideBar" element={<SideBar />} />
          {/* <Route path="/AdminTransaction" element={<AdminTransaction />} /> */}
          <Route path="/UserTransactionHistory" element={<UserTransactionHistory />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
