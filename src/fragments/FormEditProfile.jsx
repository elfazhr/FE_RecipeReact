import React, { useState } from 'react'
import InputForm from '../components/InputForm'
import Button from '../components/Button'
import { CiImageOn, CiTrash } from 'react-icons/ci'
import Label from '../components/Label'
import Swal from 'sweetalert2'
import AlertSave from './AlertSave'
import { updateProfileAsync } from '../redux/actions/authLayouts'
import { useDispatch } from 'react-redux'

const FormEditProfile = ({ selectedProfile, onClose }) => {
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [gambar, setGambar] = useState(null); // State for the selected image
    const [formData, setFormData] = useState({
        name: selectedProfile ? selectedProfile.name : '',
        bio: selectedProfile?.bio || '',
        profile_pic: selectedProfile ? selectedProfile.profile_pic : null
    });
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
            setGambar(file);
            setFormData({ ...formData, profile_pic: file.name });
        }
    };
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
        formDataToSend.append('name', formData.name);
        formDataToSend.append('bio', formData.bio);
        formDataToSend.append('profile_pic', gambar);
        formDataToSend.append('_method', 'PUT');

        try {
            await dispatch(updateProfileAsync({ _id: selectedProfile._id, updatedData: formDataToSend }));
            Swal.fire({
                icon: 'success',
                title: "Profile updated successfully",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                // Ketika alert sudah ditutup, tutup AlertSave dan arahkan ke dashboard
                handleCloseAlert();
                onClose()
            });
        } catch (error) {
            console.error('Error saving data:', error);
            // Tampilkan pesan kesalahan
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update profile',
                showConfirmButton: true,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Cek apakah gambar kosong
        if (!formData.profile_pic) {
            Swal.fire({
                title: "Oops!",
                text: "Picture is required",
                icon: "warning",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
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
    const [initialFormData, setInitialFormData] = useState({ ...formData });
    return (
        <>
            {/* Komponen AlertSave */}
            {showAlert && (
                <AlertSave onClose={handleCloseAlert} onConfirm={handleConfirmSave} />
            )}
            <div className='flex flex-col w-full'>
                <div className=" flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900 uppercase ">
                        Update Profile
                    </h3>
                </div>
                <form className='p-4 space-y-4' onSubmit={handleSubmit}>
                    <InputForm
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        judulLabel="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <InputForm
                        type="text"
                        name="bio"
                        placeholder="Enter your professional bio"
                        judulLabel="Bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                    <div className='flex flex-col'>
                        <Label name="profile_pic">Profile Picture</Label>
                        <div className=' w-full flex justify-between'>
                            <div className='rounded-md border p-2 placeholder:opacity-50 text-slate-700 text-sm w-5/6'>
                                {formData.profile_pic ? formData.profile_pic : 'No File Chosen'}
                            </div>
                            <div className='w-1/6 bg-slate-700 text-white hover:bg-slate-800 transition-colors text-sm hover:text-white p-2 flex justify-center items-center rounded-md'>
                                <label htmlFor='profile_pic' className='cursor-pointer'>
                                    <input
                                        type="file"
                                        id="profile_pic"
                                        name="profile_pic"
                                        accept="image/jpg, image/jpeg, image/png"
                                        className="hidden"
                                        onChange={handleGambarChange}
                                    />
                                    <div className=''>Choose File</div>
                                </label>

                            </div>

                        </div>
                    </div>

                    <div className='flex justify-end pt-6'>
                        <Button style="bg-blue-700 text-white hover:bg-blue-800 transition-colors text-sm hover:text-white" type="submit">Update</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormEditProfile