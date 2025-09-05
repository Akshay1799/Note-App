import React from 'react'
import { useState } from 'react'

const FormInput = ({setNotes}) => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

     const handleAddNote = ()=>{

        if(!title.trim() || !description.trim()) return;

        const newNote = {
            id: Date.now(),
            title, description, 
            date: new Date().toISOString(),
            time: new Date().toLocaleTimeString()
        }

        setNotes((prevNotes)=>[...prevNotes, newNote]);

        setTitle('');
        setDescription('');
    }
    
    return (
        <div className='flex justify-center sticky flex-col items-center '>
            <h2 className='font-mono text-black  text-3xl font-bold mt-8 mask-b-from-fuchsia-500'>Got an idea? Write it down</h2>
            <div className='relative flex justify-center items-center flex-col w-2xl py-8 mt-8 my-8 border rounded-2xl shadow-lg/20 bg-white '>
                <div className='group relative '>
                    <button type='button' className='absolute left-66 top-[-15px] rounded-2xl px-4 mt-0 hover:cursor-pointer  hover:bg-blue-100 border font-semibold hover:duration-600 ease-out'
                    onClick={handleAddNote}
                    ><span className='text-2xl'>+</span></button>
                    <span className="absolute  left-51 bottom-3 translate-x-1/2   mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition">Add a Note</span>
                </div>
                <div>
                    <input type="text" placeholder='Title' className='border mx-2 py-2 px-4 mt-6 w-106 rounded-2xl bg-white font-mono' 
                     value={title}
                     onChange={(e)=>setTitle(e.target.value)}
                     maxLength={50}
                    />
                </div>
                <textarea placeholder='Description...' className='mt-6 px-4 pt-2 max-h-44 min-h-18 w-106  border rounded-2xl bg-white text-wrap font-mono text-gray-700   resize-none'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
            </div>
        </div>
    )
}

export default FormInput