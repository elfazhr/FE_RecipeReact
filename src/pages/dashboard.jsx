import React, { useState } from 'react'
import Navbar from '../fragments/Navbar'
import Button from '../components/Button'
import Footer from '../fragments/Footer'
import CardLayouts from '../layouts/CardLayouts'
import useSWR from 'swr'
import { buildURL } from '../koneksi'
import { dataGlobal } from '../redux/actions/recipeSlice'

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(''); // Tambahkan state untuk kategori
  const handleNavigate = () => {
    window.location.href = '/addRecipes'; // Mengarahkan pengguna ke halaman /addRecipes
  };

  const { data: recipes = [], error } = useSWR(
    buildURL(`/recipes${selectedCategory ? `?category=${selectedCategory}` : ''}`),
    dataGlobal
  );

  if (error) return <p>Error loading recipes...</p>;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return (
    <div className='w-full px-10 py-6 flex flex-col gap-12'>
      <Navbar />
      <div className='w-full flex justify-center items-center gap-4'>
        <div className='flex flex-col gap-4 w-1/3 '>
          <p className='text-3xl font-semibold text-gray-800'>Discover Delicious
            Recipes Effortlessly</p>
          <p className='text-sm text-gray-500'>Explore recipes, save favorites, and share your creations with fellow food lovers</p>
        </div>
        <img src="/img/dashboard.png" alt="" className='w-[500px] rounded-lg' />
      </div>
      <div className='w-full'>
        <div className='flex flex-col rounded-lg justify-center items-center bg-slate-200 p-10 gap-4'>
          <p className='text-2xl font-bold text-gray-800'>Share Your Own Recipes!</p>
          <Button style='bg-gray-700 text-white hover:bg-gray-900 transition-colors text-sm' onClick={handleNavigate} >Write a Recipe</Button>
        </div>
      </div>
      <div className='w-full flex justify-between items-center gap-4 border-b border-gray-300 pb-6'>
        <p className='text-xl font-bold text-gray-800'>Recipes</p>
        <div className='flex gap-2'>
          <p
            className={`px-6 py-2 rounded-lg text-sm cursor-pointer ${!selectedCategory ? 'bg-orange-600 text-white font-bold' : 'bg-slate-200 text-gray-600'}`}
            onClick={() => setSelectedCategory('')}
          >
            All
          </p>
          <p
            className={`px-6 py-2 rounded-lg text-sm cursor-pointer ${selectedCategory === 'Food' ? 'bg-orange-600 text-white font-bold' : 'bg-slate-200 text-gray-600'}`}
            onClick={() => setSelectedCategory('Food')}
          >
            Food
          </p>
          <p
            className={`px-6 py-2 rounded-lg text-sm cursor-pointer ${selectedCategory === 'Beverages' ? 'bg-orange-600 text-white font-bold' : 'bg-slate-200 text-gray-600'}`}
            onClick={() => setSelectedCategory('Beverages')}
          >
            Beverages
          </p>

        </div>
      </div>

      <div className='grid grid-cols-3 justify-items-center gap-16'>
        {recipes.map((item, index) => (
          <CardLayouts key={index} image={item.recipe_pic}>
            <CardLayouts.TitleCard title={item.recipe_name} />
            <CardLayouts.BodyCard desc={item.desc} />
            <CardLayouts.FooterCard category={item.category} date={formatDate(item.date_created)} dateCreated={item.date_created} />
          </CardLayouts>
        ))}
      </div>
      <Footer />


    </div>
  )
}

export default Dashboard