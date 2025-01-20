import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Home } from './pages/Home';
import { HelperLogin } from './pages/auth/helper/HelperLogin';
import { HelperSignup } from './pages/auth/helper/HelperSignup';
import { RequesterLogin } from './pages/auth/requester/RequesterLogin';
import { RequesterSignup } from './pages/auth/requester/RequesterSignup';
import { HelperDashboard } from './pages/dashboard/helper/HelperDashboard';
import { RequesterDashboard } from './pages/dashboard/requester/RequesterDashboard';
import { HelperProfile } from './pages/profile/helper/HelperProfile';
import { RequesterProfile } from './pages/profile/requester/RequesterProfile';
import { RequestHistory } from './pages/profile/helper/RequestHistory';
import { RequesterHistory } from './pages/profile/requester/RequesterHistory';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
            {/* Helper Routes */}
            <Route path="helper/login" element={<HelperLogin />} />
            <Route path="helper/signup" element={<HelperSignup />} />
            <Route
              path="helper/dashboard"
              element={
                <ProtectedRoute>
                  <HelperDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="helper/profile"
              element={
                <ProtectedRoute>
                  <HelperProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="helper/profile/history"
              element={
                <ProtectedRoute>
                  <RequestHistory />
                </ProtectedRoute>
              }
            />
            
            {/* Requester Routes */}
            <Route path="requester/login" element={<RequesterLogin />} />
            <Route path="requester/signup" element={<RequesterSignup />} />
            <Route
              path="requester/dashboard"
              element={
                <ProtectedRoute>
                  <RequesterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="requester/profile"
              element={
                <ProtectedRoute>
                  <RequesterProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="requester/profile/history"
              element={
                <ProtectedRoute>
                  <RequesterHistory />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;