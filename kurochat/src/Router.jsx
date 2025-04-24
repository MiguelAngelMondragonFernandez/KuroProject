import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import NavAdmin from './components/admin/NavAdmin';
import ProfileAdmin from './components/admin/ProfileAdmin';
import UsersAdmin from './components/admin/UsersAdmin';
import View from './Chat/View';
import RecoveryPassword from './auth/RecoveryPassword';
import ResetPassword from './auth/ResetPassword';

function Router({ updateLast }) {
  const [update, setUpdate] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!user;
  const isAdmin = user?.is_staff === true;

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  React.useEffect(() => {
    updateLast();
  }, [update]);

  return (
    <div style={{
      backgroundColor: isAdminRoute ? "#F2E1C2" : "#242424",
      minHeight: "100vh",
      transition: "background-color 0.3s ease",
    }}>
      <Routes>

        {/* Rutas públicas (redirigen si ya hay sesión) */}
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/chats" replace /> :
          <Login userData={saveUser} update={handleUpdate} />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/chats" replace /> : <Register />
        } />
        <Route path="/recovery" element={
          isAuthenticated ? <Navigate to="/chats" replace /> : <RecoveryPassword />
        } />
        <Route path="/reset/:token" element={
          isAuthenticated ? <Navigate to="/chats" replace /> : <ResetPassword />
        } />

        <Route path="/chats" element={
          isAuthenticated ? <View /> : <Navigate to="/" replace />
        } />

        <Route path="/admin" element={
          isAuthenticated && isAdmin ? <NavAdmin /> : <Navigate to="/" replace />
        }>
          <Route index element={<UsersAdmin />} />
          <Route path="perfil" element={<ProfileAdmin />} />
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? "/chats" : "/"} replace />} />
      </Routes>
    </div>
  );
}

export default Router;
