"use client"
import Link from "next/link";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion } from 'motion/react'

export default function Home() {
  const [cards, setCards] = useState();

  useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch("/api/fetchCodes");
      const data = await response.json();
      console.log(data);
      setCards(data.allCodes)
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
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-2xl sm:text-3xl text-indigo-400 tracking-widest font-medium title-font mb-1">
              G2 WALLEEEEEEEEE
            </h2>
            <h1 className="text-xl sm:text-2xl font-medium title-font text-white">
              Copy-Paste your code here!!
            </h1>
          </div>
          <div className="flex flex-wrap -m-4 justify-center">
            {!Array.isArray(cards) ? (
              "Loading..."
            ) : (
              cards.map((elem, index) => (
                <Card codeHeading={elem.codeHeading} key={index} />
              ))
            )}

            {/* Create code card */}
            <Link href="/code" className="p-4 group">
              <div className="flex justify-center items-center rounded-lg h-full w-auto cursor-pointer bg-gray-800 bg-opacity-60 p-15 flex-col group-hover:bg-gray-700 transition-all duration-125">
                <FaPlus size={50} className="text-indigo-500 transition-all duration-100 group-hover:mb-[10px]" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
