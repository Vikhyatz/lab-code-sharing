"use client"
import DeleteModal from '@/app/components/DeleteModal'
import SaveCheck from '@/app/components/SaveCheck'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Page = () => {
    const params = useParams();
    const codeName = decodeURIComponent(params.codeName)

    const inpRef = useRef();
    const textAreaRef = useRef();

    const [codeCheckRes, setCodeCheckRes] = useState();
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


    if (codeCheckRes == 404) {
        return (
            <div className='w-full h-screen overflow-hidden flex justify-center items-center'>
                <h1 className='text-3xl text-white'>code not found - 404 error</h1>
            </div>
        )
    }


    return (
        <>
            <div><Toaster /></div>
            <section className="text-gray-400 bg-gray-900 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="heading" className="leading-7 text-sm text-gray-400">heading</label>
                                    <input type="text" id="heading" name="heading" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-2xl outline-none text-gray-100 py-5 px-5 leading-8 transition-colors text-center duration-200 ease-in-out" autoComplete='off' value={codeContent.codeHeading} ref={inpRef} onChange={inpChange} disabled={modal && true} />
                                </div>
                            </div>

                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="code" className="leading-7 text-sm text-gray-400">code</label>
                                    <textarea id="code" name="code" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 min-h-32 text-xl outline-none text-gray-100 py-3 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out field-sizing-content" spellCheck="false" disabled={modal && true} value={codeContent.code} onChange={textAreaChange} ref={textAreaRef}></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={modal && true} onClick={() => { setModal(!modal)}}>Save Code</button>
                            </div>
                            <div className="p-2 w-full">
                                <button className="flex mx-auto text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg" disabled={modal && true} onClick={()=>{setDeleteModal(!deleteModal)}}>Delete Code</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* modal to check the authorised saving of the codes */}
            {modal && <SaveCheck codeHeading={codeContent.codeHeading} code={codeContent.code} id={codeContent.id} setModal={setModal} state="updating" />}
            {deleteModal && <DeleteModal id={codeContent.id} setDeleteModal={setDeleteModal} />}
        </>
    )
}

export default Page