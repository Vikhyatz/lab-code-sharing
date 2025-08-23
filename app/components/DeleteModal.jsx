import { redirect } from 'next/navigation';
import React from 'react'
import { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const DeleteModal = ({ id, setDeleteModal, year, lang }) => {

    const ref = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/deleteCode?id=${id}&key=${ref.current.value}`);
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            toast.success("code deleted")
        } else {
            toast.error("not authorised")
        }

        if (year == 'second') {
            setTimeout(() => {
                redirect(`/second/${lang}`)
            }, 1000);
        } else {
            setTimeout(() => {
                redirect('/')
            }, 1000);
        }
    }

    const handleModalClose = (e) => {
        setDeleteModal(false)
    }

    return (
        <>
            <div><Toaster /></div>
            <div className='bg-[#000000c6] w-full h-screen overflow-hidden fixed top-0 left-0 flex justify-center items-center' onClick={handleModalClose}>
                <form onSubmit={handleSubmit} onClick={(e) => { e.stopPropagation() }} className='w-[50%] h-[200px] border-2 border-[#747474] border-solid bg-black rounded-[10px] flex justify-center items-center flex-col '>
                    <input type="password" placeholder='enter the key!' className='border-2 border-solid border-[#747474] p-3 w-[80%] text-white ' ref={ref} />

                    <div className="p-2 w-full">
                        <button type='submit' className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">verify key and delete the code</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DeleteModal