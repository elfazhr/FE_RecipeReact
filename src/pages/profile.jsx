import React from 'react'
import Navbar from '../fragments/Navbar';
import { CiImageOn } from 'react-icons/ci';
import Button from '../components/Button';
import { FaArrowRight } from 'react-icons/fa6';
import CardLayouts from '../layouts/CardLayouts';
import Footer from '../fragments/Footer';

const Profile = () => {
    return (
        <div className='w-full px-10 py-4 flex flex-col gap-4'>
            <Navbar />
            <div className='px-16 space-y-10'>
                <div className='h-40 w-full border border-gray-400 py-4 px-8 rounded-lg flex items-center justify-between'>
                    <div className='flex gap-4 items-center '>
                        <div className='w-24 h-24 rounded-full flex justify-center items-center bg-gray-300'>
                            <div className='w-14 h-14 border-2 border-white rounded-full flex items-center justify-center'>
                                <CiImageOn size={40} color='white' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-bold text-md '>name</p>
                            <p className='font-semibold text-sm text-gray-500'>@name</p>
                            <p className='font-light text-sm text-gray-600'>Update Your Bio'</p>
                        </div>
                    </div>

                    <Button text='Edit Profile' style="flex items-center gap-2 bg-gray-600 hover:bg-gray-500" onClick="here">
                        <p className='text-sm text-white'>Edit Profile</p>
                        <FaArrowRight size={16} color='white' />
                    </Button>

                </div>

                <div className='flex flex-col gap-4 pb-10'>
                    <p className='text-lg font-semibold'>Recipe Collections</p>
                    
                        <div className='grid grid-cols-3 justify-items-center gap-16'>
                                <CardLayouts image="https://images.unsplash.com/photo-1504674900247-087c91b60c07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" onClick="here">
                                    <CardLayouts.TitleCard title="Title" />
                                    <CardLayouts.BodyCard desc="Description" />
                                    <CardLayouts.FooterCard category="Category" date="Date" dateCreated="Date" />
                                </CardLayouts>
                           
                        </div>
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile