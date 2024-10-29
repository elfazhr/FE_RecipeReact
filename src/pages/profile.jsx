import React from 'react'
import useSWR from 'swr';
import { buildURL } from '../koneksi';
import { dataUser } from '../redux/actions/authLayouts';
import { useParams } from 'react-router-dom';
import Navbar from '../fragments/Navbar';
import { CiImageOn } from 'react-icons/ci';
import Button from '../components/Button';
import { MdEdit, MdOutlineEdit } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import CardLayouts from '../layouts/CardLayouts';
import Footer from '../fragments/Footer';
import { dataGlobal } from '../redux/actions/recipeSlice';

const Profile = () => {
    const { identifier } = useParams();
    const { data: user = {}, isLoading } = useSWR(buildURL(`/user/${identifier}`), dataUser);
    const { data: recipes = [], error } = useSWR(
        buildURL(`/recipes${user.username ? `?user=${user.username}` : ''}`),
        dataGlobal
    );
    console.log(user)
    if (isLoading) {
        return (
            <div className='w-full min-h-screen flex flex-col justify-center items-center'>
                <img src="/img/noodles.png" alt="" className='h-80' />
                <p className='text-2xl font-semibold'>Loading...</p>
            </div>
        )
    }
    // Ambil user_id pengguna yang sedang login dari localStorage
    const userLoginId = localStorage.getItem('user_id');
    if (error) return <p className='w-full min-h-screen flex flex-col justify-center items-center'>Error loading recipes...</p>;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };
    const DetailClick = (recipe_id) => {
        window.location.href = `/recipe/${recipe_id}`;
    }
    return (
        <div className='w-full px-10 py-4 flex flex-col gap-4'>
            <Navbar />
            <div className='px-16 space-y-10'>
                <div className='h-40 w-full border border-gray-400 py-4 px-8 rounded-lg flex items-center justify-between'>
                    <div className='flex gap-4 items-center '>
                        {!user.profile_pic ? (
                            <div className=' w-24 h-24 rounded-full flex justify-center items-center bg-gray-300'>
                                <div className='w-14 h-14 border-2 border-white rounded-full flex items-center justify-center'>
                                    <CiImageOn size={40} color='white' />
                                </div>
                            </div>
                        ) : (
                            <div className='w-24 h-24 rounded-full '>
                                <img src={user.profile_pic} alt="Preview" className='w-24 object-cover rounded-full' />
                            </div>
                        )}

                        <div className='flex flex-col gap-1'>
                            <p className='font-bold text-md '>{user.name}</p>
                            <p className='font-semibold text-sm text-gray-500'>@{user.username}</p>
                            <p className='font-light text-sm text-gray-600'>{user.bio ? user.bio : 'Update Your Bio'}</p>
                        </div>
                    </div>
                    {/* Tombol hanya muncul jika pengguna adalah pemilik resep */}
                    {user._id === userLoginId &&
                        <Button text='Edit Profile' style="flex items-center gap-2 bg-gray-600 hover:bg-gray-500">
                            <p className='text-sm text-white'>Edit Profile</p>
                            <FaArrowRight size={16} color='white' />
                        </Button>
                    }
                </div>

                <div className='flex flex-col gap-4 pb-10'>
                    <p className='text-lg font-semibold'>Recipe Collections</p>
                    {recipes.length > 0 ? (
                        <div className='grid grid-cols-3 justify-items-center gap-16'>
                            {recipes.map((item, index) => (
                                <CardLayouts key={index} image={item.recipe_pic} onClick={() => DetailClick(item._id)}>
                                    <CardLayouts.TitleCard title={item.recipe_name} />
                                    <CardLayouts.BodyCard desc={item.desc} />
                                    <CardLayouts.FooterCard category={item.category} date={formatDate(item.date_created)} dateCreated={item.date_created} />
                                </CardLayouts>
                            ))}
                        </div>
                    ) : (
                        <div className='w-full flex flex-col justify-center items-center space-y-4'>
                            <img src="/img/empty.png" alt="" className='h-36 opacity-70' />
                            <p className='text-md font-semibold text-gray-700 capitalize'>No recipes found</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile