import React from 'react'
import { CiImageOn } from 'react-icons/ci';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../fragments/Navbar';
import { MdOutlineEdit, MdOutlineRoomService } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';
import { FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { dataDetail, deleteRecipeAsync } from '../redux/actions/recipeSlice';
import { buildURL } from '../koneksi';
import useSWR from 'swr';
import Swal from 'sweetalert2';
import Footer from '../fragments/Footer';

const Detail = () => {
    const { recipe_id } = useParams();
    const dispatch = useDispatch();
    const { data: recipe = {}, isLoading } = useSWR(buildURL(`/recipes/${recipe_id}`), dataDetail);

    if (isLoading) {
        return (
            <div className='w-full min-h-screen flex flex-col justify-center items-center'>
                <img src="/img/noodles.png" alt="" className='h-80' />
                <p className='text-2xl font-semibold'>Loading...</p>
            </div>
        )
    }

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You can't revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteRecipeAsync(_id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Successfully Deleted!",
                    icon: "success",
                    showConfirmButton: false, // Menghilangkan tombol OK
                    timer: 3000, // Menutup alert setelah 2 detik (2000 milidetik)
                    timerProgressBar: true // Menampilkan
                });
                // Set delay 5 detik sebelum redirect ke halaman utama
                setTimeout(() => {
                    window.location.href = '/'; // Ganti '/' dengan rute yang sesuai ke halaman utama Anda
                }, 3000); // 5000 milidetik = 5 detik
            }

        });
    };

    const handleEdit = (recipe_id) => {
        window.location.href = `/edit/${recipe_id}`
    }

    return (
        <div className='w-full px-10 py-4 flex flex-col gap-4'>
            <Navbar />
            <div className='px-16 space-y-8 pb-10'>
                <div className='h-80 w-full bg-gray-100 rounded-md flex items-center justify-center'>
                    {!recipe.recipe_pic ? (
                        <div className='border-2 border-gray-400 rounded-md p-2'>
                            <CiImageOn size={40} color='gray' />
                        </div>
                    ) : (
                        <div className='w-full h-80'>
                            <img src={recipe.recipe_pic} alt="Preview" className='w-full h-full object-cover rounded-md' />
                        </div>
                    )}

                </div>
                <div className='border border-gray-300 rounded-md p-4 space-y-8'>
                    <div className='flex justify-between'>
                        <div className='space-y-1'>
                            <p className='text-lg font-bold text-gray-800 capitalize'>{recipe.recipe_name}</p>
                            <p className='text-sm text-gray-600 capitalize'>By: {" "}
                                <Link to={`/profile/${recipe.user}`} className='text-blue-500 font-bold hover:underline hover:text-blue-600'>
                                    {recipe.user}
                                </Link>
                            </p>
                            <p className='text-md text-gray-500'>{recipe.desc}</p>
                            <div className='flex gap-4'>
                                <div className='flex gap-2 items-center justify-center'>
                                    <FiClock size={22} className='text-gray-600' />
                                    <p className='capitalize text-sm text-gray-600 font-semibold'>{recipe.duration}</p>
                                </div>
                                <div className='flex gap-2 items-center justify-center'>
                                    <MdOutlineRoomService size={26} className='text-gray-600' />
                                    <p className='capitalize text-sm text-gray-600 font-semibold'>{recipe.serving}</p>
                                </div>
                            </div>
                        </div>
                        {/* Tombol hanya muncul jika pengguna adalah pemilik resep */}
                        {recipe.current_username === recipe.user ? (
                            <div className='flex gap-2 h-fit'>
                                <div className='bg-red-600 hover:bg-red-500 py-2 px-2.5 rounded-md w-fit flex justify-center items-center' onClick={() => handleDelete(recipe._id)}>
                                    <FaTrashCan size={16} className='text-white cursor-pointer' />
                                </div>
                                <div className='bg-slate-600 hover:bg-slate-500 p-2 rounded-md w-fit flex justify-center items-center' onClick={() => handleEdit(recipe._id)}>
                                    <MdOutlineEdit size={20} className='text-white cursor-pointer' />
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className='space-y-2'>
                        <p className='text-md font-bold text-gray-800'>Ingredients</p>
                        <p className='text-md text-gray-600'>{recipe.ingredients}</p>
                    </div>
                    <div className='space-y-2'>
                        <p className='text-md font-bold text-gray-800'>Directions</p>
                        <p className='text-md text-gray-600'>{recipe.directions}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Detail