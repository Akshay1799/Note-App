import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/axios'
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState("")

  const{setUser} = useAuth();

  const navigate = useNavigate();

  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!formData.email || !formData.password){
      setError('Email and password are required!')
      return;
    }

    try {
      setisLoading(true);
      setError("")

      const res = await api.post("/api/auth/login", formData);
      setUser(res.data.user)
      navigate('/notes')

    } catch (error) {
      setError(error.response?.data?.message || 'Login failed please try again')
    } finally {
      setisLoading(false)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
    
            {error && <p className='text-red-500 flex my-2'>{error}</p>}
    
          <form onSubmit={handleSubmit} className='bg-white shadow-xs  shadow-black flex flex-col justify-center mx-auto w-full max-w-md  px-5 py-4 gap-4 rounded-xl '>
            <h2 className='flex justify-center font-bold text-2xl my-4 text-black '>Login</h2>
            <div className='relative flex justify-center items-center'>
              <label htmlFor="email">
                <MdOutlineEmail className='text-black absolute ml-4 mt-3 text-lg' />
                <input name='email' value={formData.email} onChange={handleChange} id='email' type='email' placeholder='Email' className='w-xs pl-12 py-2 text-black rounded-2xl border border-blue-300 outline-none' />
              </label>
            </div>
            <div className='relative flex justify-center items-center'>
              <label htmlFor="Password">
                <MdLockOutline className='text-black absolute ml-4 mt-3 text-lg' />
                <input name='password' value={formData.password} onChange={handleChange} id='Password' type="password" placeholder='Password' className='text-black outline-none border border-blue-300 w-xs pl-12 py-2 rounded-2xl' />
              </label>
            </div>
            <button disabled={isLoading} type='submit' className='mt-3 hover:ease-in hover:duration-100 hover:cursor-pointer  px-4 py-2  rounded-2xl mx-auto 0 bg-blue-400 shadow-xs shadow-gray-500 '>
              <span className='text-shadow-2xs font-bold text-white'>{isLoading?"Logging in..." : "Login"}</span>
            </button>
          </form>
        </div>
  )
}

export default Login