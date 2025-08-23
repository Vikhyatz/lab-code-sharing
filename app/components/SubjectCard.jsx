import React, { useEffect } from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const SubjectCard = ({ codeHeading, svgElem }) => {
    return (
        <Link href={`/second/${codeHeading.toLowerCase()}`} className="p-4 group">
            <div className="flex items-center rounded-lg h-full cursor-pointer bg-gray-800 bg-opacity-60 p-6 sm:p-10 md:p-16 lg:p-20 flex-col group-hover:bg-gray-700 transition-all duration-125">
                <div className="flex items-center flex-col mb-3">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-6 sm:mb-8 md:mb-10">
                        SUBJECT
                    </h2>
                    <div className='subject-card group-hover:-translate-y-2 transition-all duration-75' dangerouslySetInnerHTML={{ __html: svgElem }}></div>
                </div>
                <div className="flex-grow">
                    <div
                        
                        className="mt-3 text-green-400 inline-flex items-center text-base sm:text-lg"
                    >
                        {codeHeading}
                        <FaArrowRightLong className="transition-all duration-75 group-hover:ml-[15px] ml-2" />
                    </div>
                </div>
            </div>
        </Link >

    )
}

export default SubjectCard



