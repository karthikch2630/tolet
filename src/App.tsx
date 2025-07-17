import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import PropertyListings from './pages/PropertyListings';
import PropertyDetails from './pages/PropertyDetails';
import PostProperty from './pages/PostProperty';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Chat from './pages/Chat';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <ChatProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="min-h-screen">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/properties" element={<PropertyListings />} />
                  <Route path="/property/:id" element={<PropertyDetails />} />
                  <Route path="/post-property" element={<PostProperty />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ChatProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;