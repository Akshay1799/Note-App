// Navbar.jsx

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const Navbar = () => {

  const { user, loading, logout } = useAuth();

  const navigate = useNavigate();
  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }

  return (
    <nav className='bg-gray-200 flex items-center justify-center w-xl mx-auto 0 py-2 rounded-2xl mt-2'>
      <ul className='flex gap-6'>
        {!user ? (
          <>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Link to={'/signup'}>Signup</Link>
            </li>
            <li>
              <Link to={'/forgetPassword'}>ForgetPassword</Link>
              </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'/notes'}>Notes</Link>
            </li>

            <li>
              <button onClick={handleLogout} className='hover:cursor-pointer'>Logout</button>
            </li>

          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar