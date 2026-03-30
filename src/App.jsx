import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AreaSelection from './pages/AreaSelection';
import ExamSession from './pages/ExamSession';
import AreaScore from './pages/AreaScore';
import Results from './pages/Results';
import Review from './pages/Review';
import DailyMissions from './pages/DailyMissions';
import QuickQuiz from './pages/QuickQuiz';
import DailyPractice from './pages/DailyPractice';
import Study from './pages/Study';
import History from './pages/History';
import Stats from './pages/Stats';
import AdminControl from './pages/AdminControl';

function ProtectedRoute({ children }) {
  const { currentUser, authLoading } = useAuth();
  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '3rem' }}>🎓</div>
        <p style={{ color: 'var(--text-muted)' }}>Cargando...</p>
      </div>
    );
  }
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="app-content">{children}</div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="app-container">
            <Routes>
              {/* Auth routes (no navbar) */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes (with navbar) */}
              <Route path="/" element={<ProtectedRoute><AppLayout><Home /></AppLayout></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><AppLayout><Profile /></AppLayout></ProtectedRoute>} />
              <Route path="/missions" element={<ProtectedRoute><AppLayout><DailyMissions /></AppLayout></ProtectedRoute>} />
              <Route path="/quick-quiz" element={<ProtectedRoute><AppLayout><QuickQuiz /></AppLayout></ProtectedRoute>} />
              <Route path="/daily-practice" element={<ProtectedRoute><AppLayout><DailyPractice /></AppLayout></ProtectedRoute>} />
              <Route path="/study" element={<ProtectedRoute><AppLayout><Study /></AppLayout></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><AppLayout><History /></AppLayout></ProtectedRoute>} />
              <Route path="/stats" element={<ProtectedRoute><AppLayout><Stats /></AppLayout></ProtectedRoute>} />
              <Route path="/admin-control" element={<ProtectedRoute><AppLayout><AdminControl /></AppLayout></ProtectedRoute>} />

              {/* Simulacro flow */}
              <Route path="/areas" element={<ProtectedRoute><AppLayout><AreaSelection /></AppLayout></ProtectedRoute>} />
              <Route path="/exam/:areaId" element={<ProtectedRoute><AppLayout><ExamSession /></AppLayout></ProtectedRoute>} />
              <Route path="/area-score/:areaId" element={<ProtectedRoute><AppLayout><AreaScore /></AppLayout></ProtectedRoute>} />
              <Route path="/results" element={<ProtectedRoute><AppLayout><Results /></AppLayout></ProtectedRoute>} />
              <Route path="/review" element={<ProtectedRoute><AppLayout><Review /></AppLayout></ProtectedRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
