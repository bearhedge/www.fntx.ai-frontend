import { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages';
import ForgotPassword from './pages/auth/forgot';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ResetPassword from './pages/auth/reset';
import Dashboard from './pages/Dashboard';
import OnBoarding from './pages/onboarding';
import System from './pages/system';

// Simulated functions to check user state
const isAuthenticated = (): boolean => {
  // Replace with actual logic, e.g., check for a token in localStorage or cookies
  return !!localStorage.getItem('token');
};

const hasCompletedOnboarding = (): boolean => {
  // Replace with actual logic, e.g., check user profile or onboarding status
  return localStorage.getItem('onboarding') === 'true';
};

interface RouteType {
  path: string;
  component: FC;
  type: 'public' | 'private' | 'onboarding';
}

// Define routes
const routes: RouteType[] = [
  { path: '/', component: Home, type: 'public' },
  { path: '/dashboard', component: Dashboard, type: 'public' },
  { path: '/system', component: System, type: 'public' },
  { path: '/login', component: Login, type: 'public' },
  { path: '/register', component: Register, type: 'public' },
  { path: '/forgot', component: ForgotPassword, type: 'public' },
  { path: '/reset-password', component: ResetPassword, type: 'public' },
  { path: '/onboarding', component: OnBoarding, type: 'public' },
];

// Wrapper for route guards
const ProtectedRoute: FC<{ route: RouteType }> = ({ route }) => {
  const { type, component: Component, path } = route;

  if (type === 'public') {
    // Public routes are accessible to everyone
    return <Component />;
  }

  if (type === 'private') {
    // Private routes require authentication
    return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />;
  }

  if (type === 'onboarding') {
    // Onboarding routes require authentication and onboarding completion
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    if (!hasCompletedOnboarding()) {
      return <Navigate to="/onboarding" replace />;
    }
    return <Component />;
  }

  return <Navigate to="/" replace />;
};

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<ProtectedRoute route={route} />}
        />
      ))}
    </Routes>
  );
}

export default App;
