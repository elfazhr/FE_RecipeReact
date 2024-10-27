import React from 'react'
import Label from './Label'

const TextArea = (props) => {
    const { judulLabel, name, isiSpan, value, onChange, placeholder, rows} = props
    return (
        <div className='mb-1'>
            <Label htmlFor={name} warnaText="text-black" jenisFont="font-regular">
                {judulLabel}
                <span className="text-red-500">{isiSpan}</span>
            </Label>
            <textarea id={name} rows={rows} className="p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 "
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}></textarea>
        </div>
    )
}

export default TextArea