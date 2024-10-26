import React from 'react'

const Button = (props) => {
    const { children, style="bg-blue-500 text-white font-semibold hover:bg-blue-700", type="button"} = props;
  return (
    <button className={`rounded-lg border h-10 px-6 text-md ${style}`} type={type}>{children}</button>
  )
}

export default Button