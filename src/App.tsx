import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

interface RouteType {
  path: string;
  component: FC;
}

const routes: RouteType[] = [
  { path: '/', component: Dashboard },
];

function App() {
  return (
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
  );
}
export default App