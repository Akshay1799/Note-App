import { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import {api} from '../api/axios';

const Signup = () => {

  const [formdata, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!formdata.name || !formdata.email || !formdata.password){
       setError("All fields are required!")
       return;
    }

    try {
      setIsLoading(true);
      setError('');

      await api.post("/api/auth/signup", formdata)

      navigate('/login')
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again.")
    } finally{
      setIsLoading(false);
    }

    
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>

        {isError && <p className='text-red-500 flex my-2'>{isError}</p>}

      <form onSubmit={handleSubmit} className=' shadow-xs  shadow-black flex flex-col justify-center mx-auto w-full max-w-md  px-5 py-4 gap-4 rounded-xl '>
        <h2 className='flex justify-center font-bold text-2xl my-4 text-black '>Register</h2>
        <div className='relative flex justify-center items-center'>
          <label htmlFor="username"><FaRegUser className='text-black absolute ml-4 mt-3 text-lg' />
            <input name='name' value={formdata.name} onChange={handleChange} id='username' type="text" placeholder='Name' className='text-black w-xs pl-12 py-2 border border-blue-300 rounded-2xl outline-none' />
          </label>
        </div>
        <div className='relative flex justify-center items-center'>
          <label htmlFor="email"><MdOutlineEmail className='text-black absolute ml-4 mt-3 text-lg' />
            <input name='email' value={formdata.email} onChange={handleChange} id='email' type='email' placeholder='Email' className='w-xs pl-12 py-2 text-black rounded-2xl border border-blue-300 outline-none' />
          </label>
        </div>
        <div className='relative flex justify-center items-center'>
          <label htmlFor="Password"><MdLockOutline className='text-black absolute ml-4 mt-3 text-lg' />
            <input name='password' value={formdata.password} onChange={handleChange} id='Password' type="password" placeholder='Password' className='text-black outline-none border border-blue-300 w-xs pl-12 py-2 rounded-2xl' />
          </label>
        </div>
        <button disabled={isLoading} type='submit' className='mt-3 hover:ease-in hover:duration-100 hover:cursor-pointer  px-4 py-2  rounded-2xl mx-auto 0 bg-blue-400 shadow-2xl shadow-gray-500 '>
          <span className='text-shadow-2xs font-bold text-white'>{isLoading?"Signing up..." : "Sign up"}</span>
        </button>
      </form>
    </div>
  )
}

export default Signup;