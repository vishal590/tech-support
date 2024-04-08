import React from 'react';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateTicket from './components/CreateTicket';
import IndividualTicket from './components/IndividualTicket';
import Layout from './components/Layout';
import ChangeTechSupport from './components/ChangeTechSupport';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <PublicRoute
                  element={<Dashboard />}
                />
              }
            />
            <Route
              path="/create-ticket"
              element={
                <PublicRoute
                  element={<CreateTicket />}
                />
              }
            />
            <Route
              path="/ticket/:id"
              element={
                <PublicRoute
                  element={<IndividualTicket />}
                />
              }
            />
            <Route
              path="/dashboard/tech-support"
              element={
                <PrivateRoute
                  element={<ChangeTechSupport />}
                />
              }
            />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
