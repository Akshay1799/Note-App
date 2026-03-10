import React from 'react'
import { MdLockOutline } from "react-icons/md";

const ResetPassword = () => {
  return (
    <div className="auth-bg min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-slide-up">
        <form className="auth-card">

          <div className="flex flex-col items-center gap-1 mb-2">
            <h2 className="font-bold text-2xl gradient-text">Reset password</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 text-center">Choose a strong new password</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword" className="text-xs font-medium text-gray-500 dark:text-slate-400">New password</label>
            <div className="relative">
              <MdLockOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 text-lg pointer-events-none" />
              <input id="newPassword" type="password" placeholder="••••••••" className="form-input" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmNewPassword" className="text-xs font-medium text-gray-500 dark:text-slate-400">Confirm new password</label>
            <div className="relative">
              <MdLockOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 text-lg pointer-events-none" />
              <input id="confirmNewPassword" type="password" placeholder="••••••••" className="form-input" />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-3 text-base mt-1">
            Reset password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword