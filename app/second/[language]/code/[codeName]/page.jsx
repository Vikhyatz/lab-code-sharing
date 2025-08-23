"use client"
import Chat from '@/app/components/Chat'
import DeleteModal from '@/app/components/DeleteModal'
import SaveCheck from '@/app/components/SaveCheck'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaHamburger } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Page = () => {
    const params = useParams();
    const codeName = decodeURIComponent(params.codeName);
    const language = params.language;
    console.log(language)

    const inpRef = useRef();
    const textAreaRef = useRef();

    const [codeCheckRes, setCodeCheckRes] = useState();
    const [hamState, setHamState] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [modal, setModal] = useState(false);
    const [codeContent, setCodeContent] = useState({
        codeHeading: "",
        code: "",
        id: ""
    })

    useEffect(() => {
        const checkValidCode = async () => {
            // check code in the database
            const response = await fetch(`/api/checkValidCode?codeName=${codeName}`);
            const data = await response.json();

            setCodeCheckRes(response.status)
            console.log(data.findCode)
            setCodeContent({ codeHeading: data.findCode.codeHeading, code: data.findCode.code, id: data.findCode._id })
        }
        checkValidCode();
    }, [])

    const inpChange = () => {
        codeContent.codeHeading = setCodeContent((prevValue) => { return { ...prevValue, codeHeading: inpRef.current.value } })
    }

    const textAreaChange = () => {
        codeContent.code = setCodeContent((prevValue) => { return { ...prevValue, code: textAreaRef.current.value } })
    }

    const handleHamClick = () => {
        setHamState(!hamState)
        setTimeout(() => {
            if(hamState){
                window.scrollTo(0, 0);
            }else{
                window.scrollTo(0, document.documentElement.scrollHeight);
            }
        }, 500);
    }


    if (codeCheckRes == 404) {
        return (
            <div className='w-full h-screen overflow-hidden flex justify-center items-center'>
                <h1 className='text-3xl text-white'>code not found - 404 error</h1>
            </div>
        )
    }


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div><Toaster /></div>
            <div className='relative w-full'>

                {/* header */}
                <header className="text-gray-400 sm:h-[100px] h-[150px] bg-[#19223594] body-font w-full fixed top-0 left-0 z-10 backdrop-blur-md">
                    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
                        <Link href="/second" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                            <h2 className="text-2xl sm:text-3xl text-emerald-400 tracking-widest font-medium title-font mb-1">
                                G2 WALLEEEEEEEEE
                            </h2>
                        </Link>
                        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                            <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-1 md:mt-0" onClick={handleHamClick}>
                                {hamState ? <RxCross2 size={30} /> : <h2 className='text-xl'>AI</h2>}
                            </button>
                        </nav>
                    </div>
                </header>


                {/* main */}
                <main className='pt-[100px] z-0'>

                    <section className="text-gray-400 bg-gray-900 body-font relative">
                        <div className="container px-5 pt-24 pb-10 mx-auto">
                            <div className="lg:w-1/2 md:w-2/3 mx-auto">
                                <form onSubmit={(e) => { e.preventDefault(); setModal(!modal); console.log(codeContent) }} className="flex flex-wrap -m-2">
                                    <div className="p-2 w-full">
                                        <div className="relative">
                                            <label htmlFor="heading" className="leading-7 text-sm text-gray-400">heading</label>
                                            <input type="text" id="heading" name="heading" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-emerald-400 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-xl outline-none text-gray-100 py-5 px-5 leading-8 transition-colors text-center duration-200 ease-in-out" autoComplete='off' value={codeContent.codeHeading} ref={inpRef} onChange={inpChange} disabled={modal && true} />
                                        </div>
                                    </div>

                                    <div className="p-2 w-full">
                                        <div className="relative">
                                            <label htmlFor="code" className="leading-7 text-sm text-gray-400">code</label>
                                            <textarea id="code" name="code" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-emerald-400 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 min-h-32 text-l outline-none text-gray-100 py-3 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out field-sizing-content" spellCheck="false" disabled={modal && true} value={codeContent.code} onChange={textAreaChange} ref={textAreaRef}></textarea>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <button className="flex mx-auto text-white bg-emerald-400 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={modal && true} type="submit">Save Code</button>
                                    </div>
                                    <div className="p-2 w-full">
                                        <button className="flex mx-auto text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg" disabled={modal && true} onClick={() => { setDeleteModal(!deleteModal) }}>Delete Code</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>

                    {/* ai chat */}
                    {hamState && <Chat code={codeContent.code} codeHead={codeContent.codeHeading} />}

                </main>
            </div>


            {/* modal to check the authorised saving of the codes */}
            {modal && <SaveCheck codeHeading={codeContent.codeHeading} code={codeContent.code} id={codeContent.id} setModal={setModal} state="updating" year="second" lang={language} />}
            {deleteModal && <DeleteModal id={codeContent.id} setDeleteModal={setDeleteModal} year="second" lang={language} />}


        </motion.div>
    )
}

export default Page