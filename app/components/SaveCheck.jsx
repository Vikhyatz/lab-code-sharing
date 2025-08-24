import { redirect } from 'next/navigation';
import React from 'react'
import { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const SaveCheck = ({ codeHeading, code, id, setModal, state, year, lang }) => {

    const ref = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (state == "creating") {
            if (year == 'second') {
                // if it is the second year then take the language name and store it with the code content (divided into different languages)
                const response = await fetch('/api/createNewCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        key: ref.current.value,
                        codeHeading,
                        codeContent: code,
                        lang,
                    }),
                });
                const data = await response.json();

                if (response.ok) {
                    toast.success('code saved!')
                } else {
                    toast.error("wrong key");
                }

                setTimeout(() => {
                    redirect(`/second/${lang}`)
                }, 1000);
            }
            else {
                // check key and create a new code
                const response = await fetch(`/api/createNewCode?key=${ref.current.value}&codeHeading=${codeHeading}&code=${encodeURIComponent(code)}`);
                const data = await response.json();

                if (response.ok) {
                    toast.success('code saved!')
                } else {
                    toast.error("wrong key");
                }

                setTimeout(() => {
                    redirect('/')
                }, 1000);
            }


        } else {
            // check key and update the code
            const response = await fetch(`/api/checkKey?key=${ref.current.value}&id=${id}&codeHeading=${codeHeading}&code=${encodeURIComponent(code)}`);
            const data = await response.json();
            if (response.ok) {
                toast.success('code saved!')
            } else {
                toast.error("wrong key");
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
    }

    const handleModalClose = (e) => {
        setModal(false)
    }

    return (
        <>

            <div><Toaster /></div>
            <div className='bg-[#000000c6] w-full h-screen overflow-hidden fixed top-0 left-0 flex justify-center items-center' onClick={handleModalClose}>
                <form onSubmit={handleSubmit} onClick={(e) => { e.stopPropagation() }} className='w-[50%] h-[200px] border-2 border-[#747474] border-solid bg-black rounded-[10px] flex justify-center items-center flex-col '>
                    <input type="password" placeholder='enter the key!' className='border-2 border-solid border-[#747474] p-3 w-[80%] text-white ' ref={ref} />

                    <div className="p-2 w-full">
                        <button type='submit' className={`flex mx-auto text-white ${year == 'second' ? 'bg-emerald-400' : 'bg-indigo-500'}  border-0 py-2 px-8 focus:outline-none hover:${year == 'second' ? 'bg-emerald-600' : 'bg-indigo-600'} rounded text-lg`}>verify key and save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SaveCheck