import React, { useEffect, useState } from 'react'
import InputForm from '../components/InputForm'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '../redux/actions/authLayouts'

const FormLogin = () => {
  const dispatch = useDispatch();
  const { loading, accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [localError, setLocalError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (accessToken) {
      navigate('/dashboard');
    }
  }, [accessToken, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
      
  // Membuat instance FormData dan mengisi dengan data login
  const formPayload = new FormData();
  formPayload.append('username', formData.username); // Ambil data dari state formData
  formPayload.append('password', formData.password);
    try {
      const resultAction = await dispatch(loginAsync(formPayload)).unwrap(); // unwrap untuk mendapatkan hasil atau error dari thunk
      if (resultAction) {
        navigate('/dashboard');
      }
    } catch (err) {
      setLocalError(err.message || 'Login gagal.');
    }
  };
  return (
    <form className='w-full flex flex-col gap-4' onSubmit={handleLogin}>
      <InputForm
        type="text"
        name="username"
        placeholder="Enter your username"
        judulLabel="Username"
        value={formData.username}
        onChange={handleChange} />
      <InputForm
        type="password"
        name="password"
        placeholder="****"
        judulLabel="Password"
        value={formData.password}
        onChange={handleChange} />
      <Button
        style="bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm mt-2" type="submit"> {loading ? 'Logging in.. ' : 'Sign In'}</Button>
      {localError && (
        <p className="text-red-500 text-center mt-5">{localError}</p>
      )}
      <p className='text-sm text-gray-500 mt-2 text-center'>
        Don't have an account?
        <Link to="/register" className='text-gray-600 font-semibold hover:text-gray-900 transition-colors'>
          {" "}Sign Up
        </Link>
      </p>
    </form>
  )
}

export default FormLogin