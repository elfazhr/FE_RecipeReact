import React from 'react';
import { IoMdClose } from 'react-icons/io';

const AlertSave = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center z-50">
      {/* Latar Belakang dengan Opasitas */}
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-40 "></div>
      
      {/* Konten Alert */}
      <div className="relative p-4 w-full max-w-md max-h-full z-50">
        <div className="relative bg-white rounded-lg shadow">
          <div className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center' onClick={onClose}>
            <IoMdClose size={20}/>
          </div>
          <div className="p-4 md:p-5 text-center">
            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Save This Change?</h3>
            <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={onConfirm}>
             Yes, Save
            </button>
            <button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 " onClick={onClose}>
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSave;
