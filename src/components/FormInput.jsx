import React from 'react'

const FormInput = () => {
    return (
        <div className='flex justify-center sticky flex-col items-center '>
            <h2 className='text-black text-shadow-sm/30 text-3xl font-bold mt-8'>Got an idea? Write it down</h2>
            <div className='relative flex justify-center items-center flex-col w-2xl py-8 mt-8 my-8 border-2 rounded-2xl bg-[url("/src/assets/light_grey_dots_background.jpg")] bg-cover bg-center bg-no-repeat shadow-lg/20'>
                <div className='group relative '>
                    <button type='button' className='absolute left-66 top-[-15px] rounded-2xl px-4 mt-0 hover:cursor-pointer bg-white hover:bg-amber-200 border font-semibold hover:duration-600 ease-out '><span className='text-3xl'>+</span></button>
                    <span className="absolute  left-51 bottom-3 translate-x-1/2   mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition">Add a Note</span>
                </div>
                <div>
                    <input type="text" placeholder='Title' className='border mx-2 py-2 px-4 mt-6 w-106 rounded-2xl bg-white' />
                </div>
                <textarea placeholder='Description...' className='mt-6 px-4 pt-2 max-h-44 w-106 border rounded-2xl bg-white'></textarea>
            </div>
        </div>
    )
}

export default FormInput