// frontend\src\App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './features/auth/authSlice';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Interview from './pages/Interview';
import History from './pages/History';
import { useEffect } from 'react';
import InterviewGuide from './pages/InterviewGuide';
import SpeakingTips from './pages/SpeakingTips';

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Read token from oauth-success redirect
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      dispatch(setToken());
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <main>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/interview" element={user ? <Interview /> : <Navigate to="/" />} />
          <Route path="/history" element={user ? <History /> : <Navigate to="/" />} />
          <Route path="/guide" element={<InterviewGuide />} />
          <Route path="/speaking-tips" element={<SpeakingTips />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;