import React, { useEffect } from 'react'
import Button from '../components/Button'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authLayouts';

const Navbar = () => {
    // Ambil data pengguna dari Redux store
    const user_id = localStorage.getItem('user_id');
    const location = useLocation(); // Ambil informasi lokasi saat ini
    // Fungsi untuk menentukan apakah link aktif
    const isActive = (path) => location.pathname === path ? 'font-bold underline-offset-4 underline' : 'text-black';
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout()); // Dispatch action logout
        window.location.href = '/'; // Redirect ke halaman login
    };
     // Periksa token
     useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            window.location.href = '/';
        }
    }, []);

    return (
        <div className='flex items-center justify-end gap-6 sticky top-0 z-10 bg-white pt-4 pb-4'>
            <Link to="/dashboard" className={`${isActive('/dashboard')} text-md font-semibold hover:text-slate-500`}>
                Home
            </Link>
            <Link to={`/profile/${user_id}`} className={`${isActive(`/profile/${user_id}`)} text-md font-semibold hover:text-slate-500`}>
                Profile
            </Link>
            <Button style="bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm hover:text-white hover:bg-red-500" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Navbar