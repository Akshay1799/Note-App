import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { api } from '../api/axios'
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState("")
  const [errors, setErrors] = useState({});

  const { setUser } = useAuth();

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    const updatedForm = {
      ...formData,
      [name]: value,
    }
    setFormData(updatedForm);

    setErrors(validate(updatedForm));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate(formData);
    setErrors(validationError)

    if (Object.keys(validationError).length > 0) {
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

  const validate = (values) => {
    const newErros = {};

    if (!values.email) {
      newErros.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErros.email = "Invalid email format"
    }
    if (!values.password) {
      newErros.password = "Password is required"
    } else if (values.password.length < 6) {
      newErros.password = "Password must be at least 6 characters"
    }

    return newErros
  }

  const isFormValid =
    formData.email &&
    formData.password &&
    Object.keys(validate(formData)).length === 0


  return (
    <div className='relative flex flex-col justify-center items-center w-full h-screen'>

      {error && <p className='text-red-500 flex my-2'>{error}</p>}

      <form onSubmit={handleSubmit} className='bg-white shadow-xs  shadow-black flex flex-col justify-center mx-auto w-full max-w-md  px-5 py-4 gap-4 rounded-xl '>
        <h2 className='flex justify-center font-bold text-2xl my-4 text-black '>Login</h2>
        <div className='relative flex flex-col items-center'>
          <label htmlFor="email" className='relative'>
            <MdOutlineEmail className='text-black absolute ml-4 mt-3 text-lg' />
            <input name='email' value={formData.email} onChange={handleChange} id='email' type='email' placeholder='Email' className='w-xs pl-12 py-2 text-black rounded-2xl border border-blue-300 outline-none' />
          </label>
          {errors.email && (
            <p className="w-full ml-26 text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className=' flex flex-col justify-center items-center'>
          <label htmlFor="Password">
            <MdLockOutline className='text-black absolute ml-4 mt-3 text-lg' />
            <input name='password' value={formData.password} onChange={handleChange} id='Password' type="password" placeholder='Password' className='text-black outline-none border border-blue-300 w-xs pl-12 py-2 rounded-2xl' />
          </label>
          {errors.password && (
            <p className="w-full ml-26 text-red-500 text-sm mt-1 mb-2">{errors.password}</p>
          )}
          <Link
            to="/forgetPassword"
            className=" w-full ml-26 mt-1 text-sm text-blue-500 hover:underline "
          >
            Forgot password?
          </Link>
        </div>
        <button disabled={!isFormValid || isLoading} type='submit' className='mt-3 hover:ease-in hover:duration-100 hover:bg-blue-500 hover:scale-95 hover:cursor-pointer  px-4 py-2  rounded-2xl mx-auto 0 bg-blue-400 shadow-xs '>
          <span className='text-shadow-2xs font-bold text-white'>{isLoading ? "Logging in..." : "Login"}</span>
        </button>
        <div className="text-center mt-4 space-y-2">
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login