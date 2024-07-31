import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import AppProviders from './context/AppProviders';
import './App.css'
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AppProviders>
  );
};

export default App;