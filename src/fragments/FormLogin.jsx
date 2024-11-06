import React from 'react'
import InputForm from '../components/InputForm'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const FormLogin = () => {
  return (
    <form className='w-full flex flex-col gap-4'>
      <InputForm
        type="text"
        name="username"
        placeholder="Enter your username"
        judulLabel="Username"
        value="username"
        onChange="here" />
      <InputForm
        type="password"
        name="password"
        placeholder="****"
        judulLabel="Password"
        value="password"
        onChange="here" />
      <Button
        style="bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm mt-2" type="submit"> Sign in</Button>
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