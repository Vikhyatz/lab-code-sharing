import Link from 'next/link'
import React from 'react'

const GlobalNavWrapper = ({ head, subHead }) => {
    return (
        <div className="flex flex-col text-center w-full mb-20">

            {
                head ? (
                    <h2 className="text-2xl sm:text-3xl text-emerald-400 tracking-widest font-medium title-font mb-1">
                        {head}
                    </h2>
                ) : (
                    <h2 className="text-2xl sm:text-3xl text-indigo-400 tracking-widest font-medium title-font mb-1"><Link href="/second">G</Link>
                        <Link href="/second" className="text-emerald-400">2</Link> WALLEEEEEEEEE
                    </h2>
                )
            }

            <h1 className="text-xl sm:text-2xl font-medium title-font text-gray-500">

                {subHead}
            </h1>
        </div>
    )
}

export default GlobalNavWrapper