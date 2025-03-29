"use client"
import Link from "next/link";
import Card from "./components/card";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch("/api/fetchCodes");
      const data = await response.json();
      console.log(data);
      setCards(data.allCodes)
    }
    fetchCodes();
  }, [])

  if (!Array.isArray(cards)) {
    return "Loading.."
  }

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="sm:text-3xl text-2xl text-indigo-400 tracking-widest font-medium title-font mb-1">G2 WALLEEEEEEEEE</h2>
          <h1 className="sm:text-xl text-xl font-medium title-font text-white">Copy-Paste your code here!!</h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {cards.map((elem, index) => {
            return <Card codeHeading={elem.codeHeading} key={index} />
          })}


          {/* create code card */}
          <Link href="/code" className="p-4 group">
            <div className="flex justify-center items-center rounded-lg h-full w-auto cursor-pointer bg-gray-800 bg-opacity-60 p-15 flex-col group-hover:bg-gray-700 transition-all duration-125">
              <FaPlus size={50} className="text-indigo-500 transition-all duration-100 group-hover:mb-[10px]" />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
