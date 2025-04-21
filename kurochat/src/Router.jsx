import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import NavAdmin from './components/admin/NavAdmin'
import ProfileAdmin from './components/admin/ProfileAdmin'
import UsersAdmin from './components/admin/UsersAdmin'
import View from './Chat/View'
import RecoveryPassword from './auth/RecoveryPassword'
import ResetPassword from './auth/ResetPassword'

function Router() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
    <div style={{
        backgroundColor: isAdminRoute ? "#F2E1C2" : "#242424", 
        height: "100vh",
        transition: "background-color 0.3s ease",
      }}>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/recovery' element={<RecoveryPassword />} />
        <Route path='/reset/:token' element={<ResetPassword />} />
        <Route path='/chats' element={<View />} />

        <Route path="/admin" element={<NavAdmin />}>
          <Route index element={<UsersAdmin />} />
          <Route path="perfil" element={<ProfileAdmin />} />
        </Route>
      </Routes>
      </div>
    </>
  )
}

export default Router