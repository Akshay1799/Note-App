// Navbar.jsx

import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-gray-200 flex items-center justify-center w-5xl mx-auto 0 py-2 rounded-2xl mt-2'>
        <ul className='flex gap-6'>
            <Link to={'/login'}>Login</Link>
            <Link to={'/signup'}>Signup</Link>
            <Link to={'/resetPassword'}>ResetPassword</Link>
            <Link to={'/forgetPassword'}>ForgetPassword</Link>
            <Link to={'/notes'}>Notes</Link>
        </ul>
    </nav>
  )
}

export default Navbar