import React from 'react'
import InputForm from '../components/InputForm'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const FormRegister = () => {
  return (
    <form action="" className='w-full flex flex-col gap-4'>
      <InputForm type="text" name="name" placeholder="Enter your name" judulLabel="Name" />
      <InputForm type="text" name="username" placeholder="Enter your username" judulLabel="Username" />
      <InputForm type="password" name="password" placeholder="****" judulLabel="Password" />
      <Button style="bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm mt-2">Sign Up</Button>
      <p className='text-sm text-gray-500 mt-2 text-center'>
        Already have an account?
        <Link to="/" className='text-gray-600 font-semibold hover:text-gray-900 transition-colors'>
          {" "}Sign In
        </Link>
      </p>
    </form>
  )
}

export default FormRegister