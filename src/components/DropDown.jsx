import React, { useEffect, useState } from 'react'
import Label from './Label'
import { FaAngleDown } from 'react-icons/fa6';

const DropDown = (props) => {
    const { judulLabel, name, isiSpan, options, value, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value || ''); // Inisialisasi nilai dengan prop value
    // Sync selectedOption with the prop value when it changes
    useEffect(() => {
        if (value) {
            setSelectedOption(value);
        }
    }, [value]);
    const handleSelect = (option) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };

    const isOptionSelected = (option) => {
        return selectedOption === option;
    };


    return (
        <div className="mb-3">
            <Label htmlFor={name} warnaText="text-black" jenisFont="font-regular">
                {judulLabel}
                <span className="text-red-500 ">{isiSpan}</span>
            </Label>
            {/* <select id={idSelect}  name={nameSelect}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                <option value=""></option>
                {options.map((option, index) => (
                    <option 
                    className='text-slate-500 uppercase' 
                    key={index} 
                    value={option}
                    style={{ backgroundColor: hoveredIndex === index ? 'bg-slate-300' : 'transparent' }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}>
                        {option}
                    </option>
                ))}
            </select> */}
            <div className="relative">
                <div
                    className=" border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2 flex justify-between items-center cursor-pointer hover:bg-gray-200"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <input
                        type='text'
                        id={name}
                        name={name}
                        value={selectedOption} // Menggunakan selectedOption
                        onChange={(e) => setSelectedOption(e.target.value)} // Mengganti dengan setSelectedOption
                        className='hidden'

                    />
                    <span className='text-slate-500'
                    >{selectedOption || 'Pilih Opsi'}</span>
                    <FaAngleDown />
                    {isOpen && (
                        <ul
                            className="absolute max-h-32 overflow-y-auto top-10 left-0 z-50 w-full bg-white border border-gray-300 rounded-lg ">
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    className={`px-4 py-2 cursor-pointer ${isOptionSelected(option)
                                            ? 'bg-slate-100 text-[#EB4D1C]'
                                            : 'hover:bg-slate-100 hover:text-[#EB4D1C]'
                                        }
                                     uppercase`}
                                    onClick={() =>
                                        handleSelect(option)
                                    }
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


            </div>
        </div>
    )
}

export default DropDown