import React, { useEffect, useState } from 'react'
import Navbar from '../fragments/Navbar'
import { CiImageOn, CiTrash } from 'react-icons/ci'
import Button from '../components/Button'
import TextArea from '../components/TextArea'
import InputForm from '../components/InputForm'
import DropDown from '../components/DropDown'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
import { buildURL } from '../koneksi'
import { dataDetail, updateRecipeAsync } from '../redux/actions/recipeSlice'
import AlertSave from '../fragments/AlertSave'
import Swal from 'sweetalert2'
import Footer from '../fragments/Footer'

const EditRecipes = () => {
    const { recipe_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const { data: recipe = {}, isLoading } = useSWR(buildURL(`/recipes/${recipe_id}`), dataDetail);
    const message = useSelector(state => state.recipe); // menggunakan useSelector
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        recipe_pic: '',
        recipe_name: '',
        category: '',
        serving: '',
        duration: '',
        desc: '',
        ingredients: '',
        directions: '',
    });

    const [initialFormData, setInitialFormData] = useState({ ...formData });
     // Update form data once recipe is loaded
     useEffect(() => {
        if (recipe && Object.keys(recipe).length > 0) {
            const updatedFormData = {
                recipe_pic: recipe.recipe_pic || '',
                recipe_name: recipe.recipe_name || '',
                category: recipe.category || '',
                serving: recipe.serving || '',
                duration: recipe.duration || '',
                desc: recipe.desc || '',
                ingredients: recipe.ingredients || '',
                directions: recipe.directions || '',
            };
            setInitialFormData(updatedFormData);
            setFormData(updatedFormData);
            setGambarUrl(updatedFormData.recipe_pic);
        }
    }, [recipe]);
    const [initialGambarUrl, setInitialGambarUrl] = useState(recipe ? recipe.recipe_pic : '');
    const [gambarUrl, setGambarUrl] = useState(initialGambarUrl);
    const [gambar, setGambar] = useState(null);
    const isFormDataChanged = () => {
        for (const key in formData) {
            if (formData[key] !== initialFormData[key]) {
                return true;
            }
        }
        // Memeriksa apakah gambar telah dipilih
        if (gambar !== null) {
            return true;
        }
        return false;
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const handleConfirmSave = async (e) => {
        e.preventDefault();
        // Lakukan operasi penyimpanan data
        const formDataToSend = new FormData();
        formDataToSend.append('recipe_name', formData.recipe_name);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('serving', formData.serving);
        formDataToSend.append('duration', formData.duration);
        formDataToSend.append('desc', formData.desc);
        formDataToSend.append('ingredients', formData.ingredients);
        formDataToSend.append('directions', formData.directions);
        formDataToSend.append('recipe_pic', gambar);
        formDataToSend.append('_method', 'PUT');

        try {
            await dispatch(updateRecipeAsync({ _id: recipe._id, updatedData: formDataToSend }));
            Swal.fire({
                icon: 'success',
                title: message.successMessage,
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                // Ketika alert sudah ditutup, tutup AlertSave dan arahkan ke dashboard
                handleCloseAlert();
                navigate(-1); // Navigate back to the previous page
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Cek apakah gambar kosong
        if (gambarUrl === '') {
            Swal.fire({
                title: "Oops!",
                text: "Picture is required",
                icon: "warning",
                showConfirmButton: false,
                timer: 1500,
            });
            return; // Hentikan proses penyimpanan
        }

        else if (!isFormDataChanged()) {
            // Tampilkan alert bahwa tidak ada perubahan
            Swal.fire({
                title: "Oops!",
                text: "No changes made",
                icon: "info"
            });
            return; // Jangan lanjutkan proses menyimpan data
        } else {
            // Tampilkan komponen AlertSave
            handleShowAlert();
        }
    }



    const handleGambarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2 MB dalam byte
                // Menampilkan peringatan jika ukuran melebihi batas
                Swal.fire({
                    icon: 'warning',
                    title: 'Ukuran file terlalu besar',
                    text: 'Ukuran file tidak boleh melebihi 2 MB',
                    showConfirmButton: true,
                });
                return; // Menghentikan proses lebih lanjut
            }
            setGambar(file);
            const url = URL.createObjectURL(file);
            setGambarUrl(url);
        }
    };

    const handleHapusGambar = () => {
        if (formData.recipe_pic !== '') {
            setFormData({ ...formData, recipe_pic: '' });
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

    if (isLoading) {
        return (
            <div className='w-full min-h-screen flex flex-col justify-center items-center'>
                <img src="/img/noodles.png" alt="" className='h-80' />
                <p className='text-2xl font-semibold'>Loading...</p>
            </div>
        )
    }
    return (
        <>
            {/* Komponen AlertSave */}
            {showAlert && (
                <AlertSave onClose={handleCloseAlert} onConfirm={handleConfirmSave} />
            )}
            <div className='w-full px-10 py-4 flex flex-col gap-2'>
                <Navbar />
                <p className='text-2xl font-bold text-[#575d70]'>Update Recipe</p>
                <form className='w-full flex flex-row gap-2 pb-10' onSubmit={handleSubmit}>
                    <div className='w-1/2 flex flex-col gap-2'>
                        <p className='text-md text-gray-500 font-semibold'>Recipe General Info</p>
                        <div className=' border border-gray-300 rounded-md p-4 flex flex-col gap-4'>
                            <div className='h-32 w-full bg-gray-100 rounded-md flex items-center justify-center relative'>
                                <div className='absolute top-2 right-2 p-2 rounded-md bg-red-100 cursor-pointer hover:bg-red-300' onClick={handleHapusGambar} >
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
                                                value={formData.recipe_pic}
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
                                value={formData.recipe_name}
                                onChange={handleInputChange}

                            />
                            <div className='bg-white'>
                                <DropDown
                                    judulLabel="Category"
                                    isiSpan="*"
                                    name="category"
                                    value={formData.category}
                                    onChange={(option) => handleInputChange({ target: { name: 'category', value: option } })}
                                    options={["Food", "Beverages"]}/>
                            </div>


                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/2'>
                                    <InputForm
                                        type="text"
                                        name="serving"
                                        placeholder="Ex: 2-3 person"
                                        judulLabel="Number of Serving"
                                        value={formData.serving}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <InputForm
                                        type="text"
                                        name="duration"
                                        placeholder="Ex: 30 minutes"
                                        judulLabel="Cook Durations"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <TextArea
                                judulLabel="Description"
                                name="desc"
                                placeholder="Enter Recipe Description"
                                rows="4"
                                value={formData.desc}
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
                                value={formData.ingredients}
                                onChange={handleInputChange}
                            />
                            <TextArea
                                judulLabel="Directions"
                                name="directions"
                                placeholder="Ex: Mixing the egg with tomatoes, add salt and pepper"
                                rows="10"
                                value={formData.directions}
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

export default EditRecipes