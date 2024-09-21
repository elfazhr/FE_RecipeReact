import React from 'react';

const AuthLayouts = (props) => {
  const { children, image, tagline, taglineDesc, title, titleDesc} = props

  return (
    <div className='flex min-h-screen'>
      <div className='w-1/2 bg-gray-900 flex flex-col items-center justify-center'>
        <img src={image} alt="" className='h-56' />
        <p className='text-white text-2xl font-semibold mt-3'>{tagline}</p>
        <p className='text-gray-300 text-sm mt-2'>{taglineDesc}</p>
      </div>
      
      <div className='w-1/2 flex flex-col items-center justify-center bg-white'>
        <div className='max-w-sm w-full flex flex-col gap-3'>
          <p className='text-3xl font-semibold text-gray-800'>{title}</p>
          <p className='text-sm text-gray-500 mb-2'>{titleDesc}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayouts;
