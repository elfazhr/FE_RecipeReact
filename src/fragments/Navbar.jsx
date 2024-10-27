import React from 'react'
import Button from '../components/Button'

const Navbar = () => {
    return (
        <div className='flex items-center justify-end gap-6 sticky top-0 z-10 bg-white pt-4 pb-4'>
            <p className='text-black text-md font-semibold hover:text-slate-500 cursor-pointer  underline-offset-4 underline' onClick={() => window.location.href = '/dashboard'}>Home</p>
            <p className='text-black text-md font-semibold hover:text-slate-500 cursor-pointer'>Profile</p>
            <Button style="bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm hover:text-white hover:bg-red-500">Logout</Button>
        </div>
    )
}

export default Navbar