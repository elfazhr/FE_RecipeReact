import React, { useState } from 'react'
import Navbar from '../fragments/Navbar'
import InputForm from '../components/InputForm'
import { CiImageOn, CiTrash } from 'react-icons/ci'
import TextArea from '../components/TextArea'
import DropDown from '../components/DropDown'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import AlertSave from '../fragments/AlertSave'
import { addRecipeAsync } from '../redux/actions/recipeSlice'
import Footer from '../fragments/Footer'

const AddRecipes = () => {
    const dispatch = useDispatch();
    const [newRecipe, setNewRecipe] = useState({ recipe_name: '', category: '', serving: '', duration: '', desc: '', recipe_pic: '', ingredients: '', directions: '' });
    const [showAlert, setShowAlert] = useState(false);
    const message = useSelector(state => state.recipe); // menggunakan useSelector
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe({ ...newRecipe, [name]: value });
    };

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleAddRecipe = async (e) => {
        e.preventDefault();
        // Validasi
        if (!newRecipe.recipe_name || !newRecipe.category || !newRecipe.serving || !newRecipe.duration || !newRecipe.desc || !newRecipe.recipe_pic || !newRecipe.ingredients || !newRecipe.directions) {
            // Tampilkan pesan kesalahan jika ada data yang kosong
            Swal.fire({
                icon: 'error',
                title: 'Data Tidak Boleh Kosong',
                text: 'Mohon lengkapi semua data',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        // Tampilkan komponen AlertSave
        handleShowAlert();
    };


    // Fungsi ini dipanggil ketika tombol "Yes, I'm sure" ditekan di komponen AlertSave
    const handleConfirmSave = async (e) => {
        e.preventDefault();
        // Lakukan operasi penyimpanan data
        const formData = new FormData();
        formData.append('recipe_name', newRecipe.recipe_name);
        formData.append('category', newRecipe.category);
        formData.append('serving', newRecipe.serving);
        formData.append('duration', newRecipe.duration);
        formData.append('desc', newRecipe.desc ? newRecipe.desc : '-');
        formData.append('ingredients', newRecipe.ingredients);
        formData.append('directions', newRecipe.directions);
        formData.append('recipe_pic', newRecipe.recipe_pic);
        try {
            await dispatch(addRecipeAsync(formData));
            Swal.fire({
                icon: 'success',
                title: message.successMessage,
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                // Ketika alert sudah ditutup, tutup AlertSave dan arahkan ke dashboard
                handleCloseAlert();
                window.location.href = '/dashboard'; 

            });
        } catch (error) {
            console.error('Error saving data:', error);
            // Tampilkan pesan kesalahan
            Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: 'Gagal menyimpan data',
                showConfirmButton: true,
            });
        }
    };

    const [gambarUrl, setGambarUrl] = useState('');

    const handleGambarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                Swal.fire({
                    icon: 'warning',
                    title: 'File too large',
                    text: 'File size cannot exceed 2 MB',
                    showConfirmButton: true,
                });
                return;
            }
            setNewRecipe({ ...newRecipe, recipe_pic: file });
            const url = URL.createObjectURL(file);
            setGambarUrl(url);
        }
    };

    const handleHapusGambar = () => {
        if (newRecipe.recipe_pic !== '') {
            setNewRecipe({ ...newRecipe, recipe_pic: '' });
            setGambarUrl('');
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Tidak ada gambar yang dipilih',
                text: 'Silahkan pilih gambar terlebih dahulu',
                showConfirmButton: false,
                timer: 1500,
            })
        }

    };

    return (
        <>
            {/* Komponen AlertSave */}
            {showAlert && (
                <AlertSave onClose={handleCloseAlert} onConfirm={handleConfirmSave} />
            )}
            <div className='w-full px-10 py-4 flex flex-col gap-2'>
                <Navbar />
                <p className='text-2xl font-bold text-[#575d70]'>Create Recipe</p>
                <form className='w-full flex flex-row gap-2 pb-10' onSubmit={handleAddRecipe}>
                    <div className='w-1/2 flex flex-col gap-2'>
                        <p className='text-md text-gray-500 font-semibold'>Recipe General Info</p>
                        <div className=' border border-gray-300 rounded-md p-4 flex flex-col gap-4'>
                            <div className='h-32 w-full bg-gray-100 rounded-md flex items-center justify-center relative'>
                                <div className='absolute top-2 right-2 p-2 rounded-md bg-red-100 cursor-pointer hover:bg-red-300' onClick={handleHapusGambar}>
                                    <CiTrash size={20} className='text-red-800' />
                                </div>
                                {!gambarUrl ? (
                                    <div className='border-2 border-gray-400 rounded-md p-2'>
                                        <label htmlFor='recipe_pic' className='cursor-pointer'>
                                            <input
                                                type="file"
                                                id="recipe_pic"
                                                name="recipe_pic"
                                                accept="image/jpg, image/jpeg, image/png"
                                                className="hidden"
                                                onChange={handleGambarChange}
                                            />
                                            <CiImageOn size={40} color='gray' />
                                        </label>
                                    </div>
                                ) : (
                                    <div className='w-full h-32'>
                                        <img src={gambarUrl} alt="Preview" className='w-full h-full object-cover rounded-md' />
                                    </div>
                                )}
                            </div>

                            <InputForm
                                type="text"
                                name="recipe_name"
                                placeholder="Enter Recipe Name"
                                judulLabel="Recipe Name"
                                value={newRecipe.recipe_name}
                                onChange={handleInputChange}
                            />
                            <div className='bg-white'>
                                <DropDown
                                    judulLabel="Category"
                                    isiSpan="*"
                                    name="category"
                                    options={["Food", "Beverages"]}
                                    value={newRecipe.category}
                                    onChange={(option) => handleInputChange({ target: { name: 'category', value: option } })} />
                            </div>


                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/2'>
                                    <InputForm
                                        type="text"
                                        name="serving"
                                        placeholder="Ex: 2-3 person"
                                        judulLabel="Number of Serving"
                                        value={newRecipe.serving}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <InputForm
                                        type="text"
                                        name="duration"
                                        placeholder="Ex: 30 minutes"
                                        judulLabel="Cook Durations"
                                        value={newRecipe.duration}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <TextArea
                                judulLabel="Description"
                                name="desc"
                                placeholder="Enter Recipe Description"
                                rows="4"
                                value={newRecipe.desc}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='w-1/2 flex flex-col gap-2'>
                        <p className='text-md text-gray-500 font-semibold'>Recipe Detail</p>
                        <div className=' border border-gray-300 rounded-md p-4 flex flex-col'>
                            <TextArea
                                judulLabel="Ingredients"
                                name="ingredients"
                                placeholder="Ex: 1 egg, 4 tomatoes"
                                rows="9"
                                value={newRecipe.ingredients}
                                onChange={handleInputChange}
                            />
                            <TextArea
                                judulLabel="Directions"
                                name="directions"
                                placeholder="Ex: Mixing the egg with tomatoes, add salt and pepper"
                                rows="10"
                                value={newRecipe.directions}
                                onChange={handleInputChange}
                            />
                            <div className='flex justify-end'>
                                <Button style="bg-blue-700 text-white hover:bg-blue-900 transition-colors text-sm hover:text-white" type="submit">Save</Button>
                            </div>
                        </div>

                    </div>
                </form>
                <Footer/>

            </div>
        </>
    )
}

export default AddRecipes