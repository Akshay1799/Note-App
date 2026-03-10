import React from 'react'
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="auth-bg min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="relative z-10 w-full animate-slide-up">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout