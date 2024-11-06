import React from 'react'
import Navbar from '../fragments/Navbar'
import InputForm from '../components/InputForm'
import { CiImageOn, CiTrash } from 'react-icons/ci'
import TextArea from '../components/TextArea'
import DropDown from '../components/DropDown'
import Button from '../components/Button'
import Footer from '../fragments/Footer'

const AddRecipes = () => {
    return (
        <>
            <div className='w-full px-10 py-4 flex flex-col gap-2'>
                <Navbar />
                <p className='text-2xl font-bold text-[#575d70]'>Create Recipe</p>
                <form className='w-full flex flex-row gap-2 pb-10'>
                    <div className='w-1/2 flex flex-col gap-2'>
                        <p className='text-md text-gray-500 font-semibold'>Recipe General Info</p>
                        <div className=' border border-gray-300 rounded-md p-4 flex flex-col gap-4'>
                            <div className='h-32 w-full bg-gray-100 rounded-md flex items-center justify-center relative'>
                                <div className='absolute top-2 right-2 p-2 rounded-md bg-red-100 cursor-pointer hover:bg-red-300'>
                                    <CiTrash size={20} className='text-red-800' />
                                </div>
                             
                                    <div className='border-2 border-gray-400 rounded-md p-2'>
                                        <label htmlFor='recipe_pic' className='cursor-pointer'>
                                            <input
                                                type="file"
                                                id="recipe_pic"
                                                name="recipe_pic"
                                                accept="image/jpg, image/jpeg, image/png"
                                                className="hidden"
                                                onChange="here"
                                            />
                                            <CiImageOn size={40} color='gray' />
                                        </label>
                                    </div>
                               
                            </div>

                            <InputForm
                                type="text"
                                name="recipe_name"
                                placeholder="Enter Recipe Name"
                                judulLabel="Recipe Name"
                                value='recipe_name'
                                onChange='here'
                            />
                            <div className='bg-white'>
                                <DropDown
                                    judulLabel="Category"
                                    isiSpan="*"
                                    name="category"
                                    options={["Food", "Beverages"]}
                                    value='category'
                                    onChange="here"/>
                            </div>


                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/2'>
                                    <InputForm
                                        type="text"
                                        name="serving"
                                        placeholder="Ex: 2-3 person"
                                        judulLabel="Number of Serving"
                                        value="serving"
                                        onChange="here"
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <InputForm
                                        type="text"
                                        name="duration"
                                        placeholder="Ex: 30 minutes"
                                        judulLabel="Cook Durations"
                                        value="duration"
                                        onChange="here"
                                    />
                                </div>
                            </div>
                            <TextArea
                                judulLabel="Description"
                                name="desc"
                                placeholder="Enter Recipe Description"
                                rows="4"
                                value="desc"
                                onChange="here"
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
                                value="ingredients"
                                onChange="here"
                            />
                            <TextArea
                                judulLabel="Directions"
                                name="directions"
                                placeholder="Ex: Mixing the egg with tomatoes, add salt and pepper"
                                rows="10"
                                value="directions"
                                onChange="here"
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