import React from 'react'
import Label from './Label'
import Input from './Input'

const InputForm = (props) => {
  const {type, name, placeholder, judulLabel} = props
  return (
    <div>
      <Label name={name}>{judulLabel}</Label>
      <Input type={type} name={name} placeholder={placeholder}/>
    </div>
  )
}

export default InputForm