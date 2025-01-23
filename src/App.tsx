import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages';
import ForgotPassword from './pages/auth/forgot';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ResetPassword from './pages/auth/reset';
import Dashboard from './pages/Dashboard';
import HomeDashboard from './pages/Home';
import OnBoarding from './pages/onboarding';
import OptionStream from './pages/OptionStream';
import System from './pages/system';
import { setLoginUser } from './services/slices/authSlice';

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
  type: 'public' | 'private' | 'onboarding' | 'auth';
}

// Define routes
const routes: RouteType[] = [
  { path: '/', component: Home, type: 'public' },
  { path: '/dashboard', component: Dashboard, type: 'public' },
  { path: '/home', component: HomeDashboard, type: 'public' },
  { path: '/system', component: System, type: 'public' },
  { path: '/optionstream', component: OptionStream, type: 'public' },
  // { path: '/system/:id', component: System, type: 'public' },
  { path: '/signin', component: Login, type: 'auth' },
  { path: '/register', component: Register, type: 'auth' },
  { path: '/forgot-password', component: ForgotPassword, type: 'auth' },
  { path: '/reset-password', component: ResetPassword, type: 'auth' },
  { path: '/onboarding', component: OnBoarding, type: 'onboarding' },
];

// Wrapper for route guards
const ProtectedRoute: FC<{ route: RouteType }> = ({ route }) => {
  const { type, component: Component } = route;

  if (type === 'public') {
    // Public routes are accessible to everyone
    return <Component />;
  }
  if (type === 'auth') {
    // Public routes are accessible to everyone
    return !isAuthenticated() ?<Component />:<Navigate to="/" replace />;
  }
  if (type === 'private') {
    // Private routes require authentication
    return isAuthenticated() ? <Component /> : <Navigate to="/signin" replace />;
  }

  if (type === 'onboarding') {
    // Onboarding routes require authentication and onboarding completion
    if (!isAuthenticated()) {
      return <Navigate to="/signin" replace />;
    }
    if (!hasCompletedOnboarding()) {
      return <Navigate to="/onboarding" replace />;
    }
    return <Component />;
  }

  return <Navigate to="/" replace />;
};

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    let isLogin = false
    if(localStorage.token){
      isLogin = true
    }
    dispatch(setLoginUser(isLogin))
  },[])
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
