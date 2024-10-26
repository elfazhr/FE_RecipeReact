import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-between items-center border-t-2 border-gray-400 pt-4'>
        <p className='text-gray-500 '>Copyright © 2024 LearningX</p>
        <div className='flex gap-4'>
            <p className='text-gray-400'>All Rights Reserved </p>
            <p className='text-gray-500'>Terms and Conditions</p>
            <p className='text-gray-500'>Privacy Policy</p>
        </div>
    </div>
  )
}

export default Footer