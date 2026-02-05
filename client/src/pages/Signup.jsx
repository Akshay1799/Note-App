import React from 'react'
import { FaRegUser  } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline  } from "react-icons/md";
const Signup = () => {
  return (
    <div className='mt-8 bg-amber-50 flex items-center'>
      <form className='bg-white flex flex-col justify-center mx-auto 0 shadow-xl w-xl  px-5 py-4 gap-4 rounded-xl'>
        <h2 className='flex justify-center font-bold text-2xl my-4 '>Register</h2>
        <div className='relative flex justify-center items-center'>
          <label htmlFor="username"><FaRegUser className='text-gray-500 absolute ml-4 -mt-2 text-lg' /></label>
          <input id='username' type="text"  placeholder='Name' className='w-xs pl-12 py-2 bg-gray-100 rounded-3xl' />
        </div>
        <div className='relative flex justify-center items-center'>
          <label htmlFor="email"><MdOutlineEmail className='text-gray-500 absolute ml-4 -mt-2 text-lg'/></label>
          <input id='email' type='email' placeholder='Email' className='w-xs pl-12 py-2 bg-gray-100 rounded-3xl ' />
        </div>
        <div className='relative flex justify-center items-center'>
          <label htmlFor="Password"><MdLockOutline className='text-gray-500 absolute ml-4 -mt-2 text-lg'/></label>
          <input id='Password' type="text" placeholder='Password' className='w-xs pl-12 py-2 bg-gray-100 rounded-3xl ' />
        </div>
        <button type='submit' className='mt-3 hover:ease-in hover:duration-100 hover:bg-white hover:border  hover:cursor-pointer bg-blue-300 px-4 py-2  rounded-2xl mx-auto 0'><span className='text-shadow-2xs font-bold'>Sign up</span></button>
      </form>
    </div>
  )
}

export default Signup;