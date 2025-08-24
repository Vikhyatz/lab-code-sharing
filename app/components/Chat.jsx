"use client"
import React, { useRef, useState } from "react"
import { IoIosArrowDroprightCircle } from "react-icons/io";



const Chat = ({ code, codeHead }) => {

    const ref = useRef();

    const [messages, setMessages] = useState([{ content: "ask any questions regarding the code from AI", state: "recieved" }]);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault()

        setMessages((prev) => {
            return [...prev, { content: ref.current.value, state: "sent" }]
        })

        const query = ref.current.value
        ref.current.value = "";

        setLoading(true);

        const response = await fetch(`/api/gemeniData?code=${encodeURIComponent(code)}&codeHead=${codeHead}&query=${query}`)
        const data = await response.json();

        setMessages((prev) => {
            return [...prev, { content: data.message, state: "recieved" }]
        })
        setLoading(false)
    }


    return (
        <div className="bg-gray-800 h-max-screen h-[500px] rounded-lg flex flex-col sm:w-lg w-sm mx-auto my-20 ">
            <div className="bg-gray-800 p-4 text-white flex rounded-t-lg justify-between items-center border-b-gray-400 border-b-solid border-b-2">
                <span>Chat With Ai</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col space-y-2">

                    {!Array.isArray(messages) ? "no messages" : (

                        messages.map((elem, index) => {
                            return (
                                <div key={index} className={`flex ${elem.state == "sent" ? "justify-end" : ""}`}>
                                    <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs" >
                                        <div dangerouslySetInnerHTML={{ __html: elem.content }} />
                                    </div>
                                </div>
                            )
                        })

                    )}

                </div>
            </div>

            {loading && (
                <div className="text-white text-center py-2">Loading...</div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-800 p-4 flex items-center border-t-gray-400 border-t-solid border-t-2 rounded-b-lg text-white">
                <input type="text" ref={ref} placeholder="question..." className="flex-1 border rounded-full px-4 py-2 focus:outline-none" required />
                <button type="submit" className="bg-indigo-500 text-white rounded-full ml-2 hover:bg-indigo-600 focus:outline-none">
                    <IoIosArrowDroprightCircle size={40} />
                </button>
            </form>

        </div>
    )
}

export default Chat