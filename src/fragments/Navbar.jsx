import React from 'react'
import Button from '../components/Button'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex items-center justify-end gap-6 sticky top-0 z-10 bg-white pt-4 pb-4'>
            <Link to="/dashboard" className={` text-md font-semibold hover:text-slate-500`}>
                Home
            </Link>
            <Link to={`/profile/id`} className={` text-md font-semibold hover:text-slate-500`}>
                Profile
            </Link>
            <Button style="bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm hover:text-white hover:bg-red-500">Logout</Button>
        </div>
    )
}

export default Navbar