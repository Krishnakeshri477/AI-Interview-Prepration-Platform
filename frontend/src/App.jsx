// frontend\src\App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Interview from './pages/Interview';
import History from './pages/History';
import Navbar from './components/Navbar';

function App() {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <main>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/interview" element={user ? <Interview /> : <Navigate to="/" />} />
          <Route path="/history" element={user ? <History /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;