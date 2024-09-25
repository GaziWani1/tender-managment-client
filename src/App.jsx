import { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import UserPennel from './pages/UserPennel';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './lib/ProtectedRoute';
import RoleBasedRoute from './lib/RoleBasedRoutes';
import Loading from './components/Loading';
import { UserProvider } from './context/UserContaxt';
import Tender from './pages/Tender';
import CustomToaster from './components/CustomToaster';
import AvialableTender from './pages/AvialableTender';
import ManageBid from './pages/ManageBid';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user; // Check if user is logged in
  const userRole = user?.role; // Get user role
  return (
    <Router>
      <UserProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  userRole === 'admin' ? (
                    <Navigate to="/admin/tender" />
                  ) : (
                    <Navigate to="/user/tender" />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route path="/register" element={<SignIn />} />
            <Route path="/login" element={<Login />} />

            <Route path="/user" element={<PrivateRoute />}>
              <Route index  element={<Navigate to="tender" replace />} />
              <Route path="tender" element={<AvialableTender />} />
              <Route path="managebid" element={<ManageBid />} />
            </Route>
            <Route
              path="/admin"
              element={<RoleBasedRoute allowedRoles={['admin']} />}
            >
              <Route index element={<Navigate to="tender" replace />} />
              <Route path="tender" element={<Tender />} />
            </Route>
          </Routes>
        <CustomToaster />
        </Suspense>
      </UserProvider>
    </Router>
  );
};

export default App;
