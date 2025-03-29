import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const Card = ({ codeHeading }) => {
  return (
    <div className="p-4 group">
      <div className="flex rounded-lg h-full cursor-pointer bg-gray-800 bg-opacity-60 p-15 flex-col group-hover:bg-gray-700 transition-all duration-125">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
            <FaPencilAlt />
          </div>
          <h2 className="text-white text-lg title-font font-medium">{codeHeading}</h2>
        </div>
        <div className="flex-grow">
          <Link href={`/code/${codeHeading}`} className="mt-3 text-indigo-400 inline-flex items-center">open code
            <FaArrowRightLong className='ml-[8px] transition-all duration-75 group-hover:ml-[15px]' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card