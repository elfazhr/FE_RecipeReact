import React from 'react'

const CardLayouts = (props) => {
    const { children } = props;
    return (
        <div className='w-full flex flex-col bg-gray-50 shadow-sm hover:bg-gray-100 hover:cursor-pointer'>
            <img src="/img/dashboard.png" alt="" className='h-[200px] w-full object-cover' />
            <div className='flex flex-col p-4 mb-2 w-full h-full'>
                {children}
            </div>

        </div>
    )
}


const TitleCard = (props) => {
    const { title } = props
    return (
        <p className='text-lg font-semibold text-gray-800 w-full'>{title}</p>
    )
}

const BodyCard = (props) => {
    const { desc } = props
    return (
        <p className='text-sm text-gray-500 mt-2 w-full h-full'>{desc}</p>
    )
}

const FooterCard = () => {
    
    return (
        <div className='flex justify-between mt-4'>
            <p className='px-4 bg-gray-300 py-1 text-sm text-gray-600 font-semibold rounded-md'>Category</p>
            <p className='text-sm text-gray-500'>Jan 12, 2024</p>
        </div>
    )
}

CardLayouts.TitleCard = TitleCard;
CardLayouts.BodyCard = BodyCard;
CardLayouts.FooterCard = FooterCard;

export default CardLayouts;