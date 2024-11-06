import React from 'react'
import InputForm from '../components/InputForm'
import Button from '../components/Button'
import Label from '../components/Label'

const FormEditProfile = ({ selectedProfile, onClose }) => {
    return (
        <>
            <div className='flex flex-col w-full'>
                <div className=" flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900 uppercase ">
                        Update Profile
                    </h3>
                </div>
                <form className='p-4 space-y-4'>
                    <InputForm
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        judulLabel="Name"
                        value="Name"
                        onChange="here"
                    />
                    <InputForm
                        type="text"
                        name="bio"
                        placeholder="Enter your professional bio"
                        judulLabel="Bio"
                        value="bio"
                        onChange="here"
                    />
                    <div className='flex flex-col'>
                        <Label name="profile_pic">Profile Picture</Label>
                        <div className=' w-full flex justify-between'>
                            <div className='rounded-md border p-2 placeholder:opacity-50 text-slate-700 text-sm w-5/6'>
                                 'No File Chosen'
                            </div>
                            <div className='w-1/6 bg-slate-700 text-white hover:bg-slate-800 transition-colors text-sm hover:text-white p-2 flex justify-center items-center rounded-md'>
                                <label htmlFor='profile_pic' className='cursor-pointer'>
                                    <input
                                        type="file"
                                        id="profile_pic"
                                        name="profile_pic"
                                        accept="image/jpg, image/jpeg, image/png"
                                        className="hidden"
                                        onChange="here"
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