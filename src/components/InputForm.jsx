import React from 'react'
import Label from './Label'
import Input from './Input'

const InputForm = (props) => {
  const {type,value, name, placeholder, judulLabel} = props
  return (
    <div>
      <Label name={name}>{judulLabel}</Label>
      <Input 
      type={type} 
      name={name} 
      placeholder={placeholder}
      value={value}
      onChange={(e) => props.onChange(e)}/>
    </div>
  )
}

export default InputForm