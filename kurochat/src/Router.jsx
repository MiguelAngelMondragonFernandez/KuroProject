import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'

function Router() {
  return (
    <>
    <Routes>
        <Route path="/" element={<></>} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>} />
    </Routes>
    </>
  )
}

export default Router