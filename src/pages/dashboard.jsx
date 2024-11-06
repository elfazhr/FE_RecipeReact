import React from 'react'
import Navbar from '../fragments/Navbar'
import Button from '../components/Button'
import Footer from '../fragments/Footer'
import CardLayouts from '../layouts/CardLayouts'

const Dashboard = () => {
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
          <Button style='bg-gray-700 text-white hover:bg-gray-900 transition-colors text-sm' >Write a Recipe</Button>
        </div>
      </div>
      <div className='w-full flex justify-between items-center gap-4 border-b border-gray-300 pb-6'>
        <p className='text-xl font-bold text-gray-800'>Recipes</p>
        <div className='flex gap-2'>
          <p
            className={`px-6 py-2 rounded-lg text-sm cursor-pointer bg-orange-600 text-white font-bold`}
            onClick="here"
          >
            All
          </p>
          <p
            className={`px-6 py-2 rounded-lg text-sm cursor-pointer `}
            onClick="here"
          >
            Food
          </p>
          <p
            className={`px-6 py-2 rounded-lg text-sm cursor-pointer `}
            onClick="here"
          >
            Beverages
          </p>

        </div>
      </div>
        <div className='grid grid-cols-3 justify-items-center gap-16'>
            <CardLayouts image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" onClick="here">
              <CardLayouts.TitleCard title="My Recipe" />
              <CardLayouts.BodyCard desc="This is my recipe" />
              <CardLayouts.FooterCard category="Food" date="2022-01-01" dateCreated="2022-01-01" />
            </CardLayouts>
        </div>
      <Footer />


    </div>
  )
}

export default Dashboard