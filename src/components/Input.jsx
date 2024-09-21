import React from 'react'

const Input = (props) => {
    const {type="text", placeholder, name} = props
  return (
    <input 
    type={type} 
    className='rounded-md border p-2 placeholder:opacity-50 text-slate-700 text-sm w-full outline-none'
    placeholder={placeholder}
    name={name}
    id={name}/>
  )
}

export default Input