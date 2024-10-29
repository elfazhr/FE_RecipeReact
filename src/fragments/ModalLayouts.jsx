import React from 'react'
import { MdClose } from 'react-icons/md'

const ModalLayouts = ({ onClose, children }) => {
    return (
        <div>
            <div className='fixed inset-0 z-40  bg-black bg-opacity-50' >
                <div className="fixed z-50 flex w-full h-full justify-center items-center p-4" >
                    <div className='bg-white flex flex-col rounded-lg p-4 w-full max-w-4xl max-h-full shadow '>
                        <div className='w-full flex justify-end mb-2'>
                            <div className='text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 inline-flex justify-center items-center' onClick={onClose}>
                                <MdClose size={25} />
                            </div>
                        </div>
                        <div className='flex flex-row space-x-2 w-full justify-between overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-300  scrollbar-track-gray-100 scrollbar-thin'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalLayouts