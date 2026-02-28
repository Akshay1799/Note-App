import { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/axios';

const Signup = () => {

  const [formdata, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [errors, setErrors] = useState({})

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    const updatedForm = {
      ...formdata,
      [name]: value
    }
    setFormData(updatedForm)
    setErrors(validate(updatedForm))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.name || !formdata.email || !formdata.password) {
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
    } finally {
      setIsLoading(false);
    }


  }

  const validate = (value) => {
    const newErrors = {};

    if (!value.name.trim()) {
      newErrors.name = "Name is required"
    } else if (value.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!value.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!value.password) {
      newErrors.password = "Password is required";
    } else if (value.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[a-z]/.test(value.password)) {
      newErrors.password = "Must include a lowercase letter";
    } else if (!/[A-Z]/.test(value.password)) {
      newErrors.password = "Must include an uppercase letter";
    } else if (!/[0-9]/.test(value.password)) {
      newErrors.password = "Must include a number";
    } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value.password)) {
      newErrors.password = "Must include a special character";
    }
    if (!value.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password"
    } else if (value.confirmPassword !== value.password) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    return newErrors
  }

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formdata.name &&
    formdata.email &&
    formdata.password && formdata.confirmPassword

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>

      {isError && <p className='text-red-500 flex my-2'>{isError}</p>}

      <form onSubmit={handleSubmit} className='bg-white shadow-lg  flex flex-col justify-center mx-auto w-full max-w-md  px-5 py-4 gap-4 rounded-xl '>
        <h2 className='flex justify-center font-bold text-2xl my-4 text-black text-shadow-xs'>Register</h2>
        <div className='relative flex flex-col justify-center items-center'>
          <label htmlFor="username"><FaRegUser className='text-black absolute ml-4 mt-3 text-lg' />
            <input name='name' value={formdata.name} onChange={handleChange} id='username' type="text" placeholder='Name' className='text-black w-xs pl-12 py-2 border border-blue-300 rounded-2xl outline-none' />
          </label>
          {errors.name && (
            <p className='w-full ml-26 text-red-500 text-sm mt-1'>{errors.name}</p>
          )}
        </div>
        <div className='relative flex flex-col justify-center items-center'>
          <label htmlFor="email"><MdOutlineEmail className='text-black absolute ml-4 mt-3 text-lg' />
            <input name='email' value={formdata.email} onChange={handleChange} id='email' type='email' placeholder='Email' className='w-xs pl-12 py-2 text-black rounded-2xl border border-blue-300 outline-none' />
          </label>
          {errors.email && (
            <p className='w-full ml-26 text-red-500 text-sm mt-1'>{errors.email}</p>
          )}
        </div>
        <div className='relative flex flex-col justify-center items-center'>
          <label htmlFor="Password"><MdLockOutline className='text-black absolute ml-4 mt-3 text-lg' />
            <input name='password' value={formdata.password} onChange={handleChange} id='Password' type="password" placeholder='Password' className='text-black outline-none border border-blue-300 w-xs pl-12 py-2 rounded-2xl' />
          </label>
          {errors.password && (
            <>
              <p className='w-full ml-26 text-red-500 text-sm mt-1'>{errors.password}</p>
              <ul className="w-full ml-26 text-xs text-gray-500 mt-1">
                <li>• At least 8 characters</li>
                <li>• One uppercase letter</li>
                <li>• One lowercase letter</li>
                <li>• One number</li>
                <li>• One special character</li>
              </ul>
            </>
          )}
        </div>
        <div className='relative flex flex-col justify-center items-center'>
          <label htmlFor="confirmPassword"><MdLockOutline className='text-black absolute ml-4 mt-3 text-lg' />
            <input name='confirmPassword' value={formdata.confirmPassword} onChange={handleChange} id='Password' type="password" placeholder='Confirm password' className='text-black outline-none border border-blue-300 w-xs pl-12 py-2 rounded-2xl' />
          </label>
          {errors.confirmPassword && (
            <p className='w-full ml-26 text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>
          )}
        </div>
        <button disabled={!isFormValid || isLoading} type='submit' className='mt-3 hover:ease-in hover:duration-100 hover:cursor-pointer  px-4 py-2  rounded-2xl mx-auto 0 bg-blue-400 shadow-xs shadow-gray-500 '>
          <span className='text-shadow-2xs font-bold text-white'>{isLoading ? "Signing up..." : "Sign up"}</span>
        </button>
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup;