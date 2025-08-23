"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion } from 'motion/react'
import Card from "@/app/components/Card";
import GlobalNavWrapper from "@/app/components/GlobalNavWrapper";
import { useParams } from "next/navigation";
import NoPage from "@/app/not-found";

export default function Home() {
    const params = useParams();
    const languageName = decodeURIComponent(params.language);
    const [cards, setCards] = useState();

    const headings = [{
        language: "java",
        heading: "Java - Second Year Codes"
    },
    {
        language: "python",
        heading: "Python - Second Year Codes"
    },
    {
        language: "dsa",
        heading: "Data Structures And Algorithms - Second Year Codes"
    }]

    // choose the right heading according to the url parameter
    const headingArr = headings.filter((lang) => (languageName == lang.language));
    // if not a valid heading then redirect to 404
    if(headingArr.length == 0) return <NoPage />
    const heading = headingArr[0].heading;

    useEffect(() => {
        const fetchCodes = async () => {
            const response = await fetch(`/api/fetchCodes?lang=${languageName}`);
            const data = await response.json();
            console.log(data);
            setCards(data.langFilter)
        }
        fetchCodes();
    }, [])

    

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap">

                    <GlobalNavWrapper head={heading} subHead="Second Year!!!!" />

                    <div className="flex flex-wrap sm:flex-row flex-col m-auto justify-center">
                        {!Array.isArray(cards) ? (
                            <div className="sm:flex sm:items-center">
                                <h1 className="text-center">loading...</h1>
                            </div>
                        ) : (
                            cards.map((elem, index) => (
                                <Card codeHeading={elem.codeHeading} key={index} year="second" lang={languageName} />
                            ))
                        )}

                        {/* Create code card */}
                        <Link href={`/second/${languageName}/code`} className="p-4 group">
                            <div className="flex justify-center items-center rounded-lg h-full w-auto cursor-pointer bg-gray-800 bg-opacity-60 p-15 flex-col group-hover:bg-gray-700 transition-all duration-125">
                                <FaPlus size={50} className="text-emerald-400 transition-all duration-100 group-hover:-translate-y-2" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
