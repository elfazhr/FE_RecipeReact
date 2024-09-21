import React from 'react'

const Label = (props) => {
  const { children, name } = props
  return (
    <label htmlFor={name} className='block text-sm text-slate-700 font-bold mb-2'>{children}</label>
  )
}

export default Label