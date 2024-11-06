import React from 'react'
import { CiImageOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import Navbar from '../fragments/Navbar';
import { MdOutlineEdit, MdOutlineRoomService } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';
import { FaTrashCan } from 'react-icons/fa6';
import Footer from '../fragments/Footer';

const Detail = () => {
    return (
        <div className='w-full px-10 py-4 flex flex-col gap-4'>
            <Navbar />
            <div className='px-16 space-y-8 pb-10'>
                <div className='h-80 w-full bg-gray-100 rounded-md flex items-center justify-center'>

                    <div className='border-2 border-gray-400 rounded-md p-2'>
                        <CiImageOn size={40} color='gray' />
                    </div>


                </div>
                <div className='border border-gray-300 rounded-md p-4 space-y-8'>
                    <div className='flex justify-between'>
                        <div className='space-y-1'>
                            <p className='text-lg font-bold text-gray-800 capitalize'>name</p>
                            <p className='text-sm text-gray-600 capitalize'>By: {" "}
                                <Link to="here" className='text-blue-500 font-bold hover:underline hover:text-blue-600'>
                                  user
                                </Link>
                            </p>
                            <p className='text-md text-gray-500'>description</p>
                            <div className='flex gap-4'>
                                <div className='flex gap-2 items-center justify-center'>
                                    <FiClock size={22} className='text-gray-600' />
                                    <p className='capitalize text-sm text-gray-600 font-semibold'>duration</p>
                                </div>
                                <div className='flex gap-2 items-center justify-center'>
                                    <MdOutlineRoomService size={26} className='text-gray-600' />
                                    <p className='capitalize text-sm text-gray-600 font-semibold'>survice</p>
                                </div>
                            </div>
                        </div>
                       
                            <div className='flex gap-2 h-fit'>
                                <div className='bg-red-600 hover:bg-red-500 py-2 px-2.5 rounded-md w-fit flex justify-center items-center' onClick="here">
                                    <FaTrashCan size={16} className='text-white cursor-pointer' />
                                </div>
                                <div className='bg-slate-600 hover:bg-slate-500 p-2 rounded-md w-fit flex justify-center items-center' onClick="here">
                                    <MdOutlineEdit size={20} className='text-white cursor-pointer' />
                                </div>
                            </div>
                    
                    </div>
                    <div className='space-y-2'>
                        <p className='text-md font-bold text-gray-800'>Ingredients</p>
                        <p className='text-md text-gray-600'>ingredients</p>
                    </div>
                    <div className='space-y-2'>
                        <p className='text-md font-bold text-gray-800'>Directions</p>
                        <p className='text-md text-gray-600'>direction</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Detail