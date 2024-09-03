import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider, useAuth } from './context/AuthContext'; // Ensure the path is correct
import { ThemeProvider } from './context/ThemeContext'; // Ensure you have ThemeProvider set up correctly
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import SideNavBar from './components/SideNavBar';
import './App.css';

function AppLayoutWithTheme() {
  const { tenant } = useAuth(); // Assuming your AuthContext provides the current tenant

  return (
    <ThemeProvider tenant={tenant}> {/* Wrap AppLayout with ThemeProvider */}
      <AppLayout />
    </ThemeProvider>
  );
}

function AppLayout() {
  return (
    <>
      <Header />
      <div className="app-body">
        <SideNavBar />
        <div className="app-content"></div>
        <main className="py-3">
          <Container>
            <ProtectedRoutes />
          </Container>
        </main>
      </div>
      <Footer />
      
    </>
  );
}

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={isLoggedIn ? <AppLayoutWithTheme /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

function AppWithAuthProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuthProvider;
