'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import FaceIcon from "../../../public/facebook.png";
import InstaIcon from "../../../public/instagram.gif";
import WhatIcon from "../../../public/whatsapp.png";
import TwitIcon from "../../../public/twitter.png";
import style from "../../../styles/nominees.module.scss";
import axios from 'axios';

const Page = ({ params }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [nomineeSlug, setNominee] = useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { slug } = params;

  useEffect(() => {
    axios
      .get("https://api.allvotesgh.com/organizer/nominee")
      .then((response) => {
        setNominee(response.data.nominees[0]);
        setImages(response.data.nominees[1]);
      })
      .catch((error) => {
        console.error("Error fetching nominees:", error);
      });
  }, []);

  const nomineeSlugFilter = nomineeSlug.filter(
    (n) => n.organizerid && n.organizerid === slug.split('%2C')[1]
  );

  const getImageUrl = (id) => {
    const image = images.find((img) =>
      img.metadata?.name?.split('/')[1]?.split('.')[0] === id
    );
    return image?.url || '';
  };

  return (
    <div id={style.mainContainer} className="w-full px-5 sm:px-20 pb-20 flex flex-col items-center gap-8">
      {/* Navbar */}
      <nav className="w-full flex justify-between px-8 bg-[#F2EFEA] items-center fixed z-10 shadow-md">
        <Link href="/eventPage" className="text-lg font-semibold py-6 px-4 hover:text-[orangered]">
          All Votes
        </Link>
        <ul className="hidden md:flex justify-center gap-10">
          <Link href="/"><li className="text-sm hover:text-[orangered]">HOME</li></Link>
          <Link href="#"><li className="text-sm hover:text-[orangered]">ABOUT</li></Link>
          <Link href="#"><li className="text-sm hover:text-[orangered]">CONTACT</li></Link>
        </ul>
        <button className="md:hidden text-xl p-4" onClick={toggleMenu}>
          <IoMdMenu />
        </button>
      </nav>

      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center w-[70vw] h-screen fixed left-0 bg-[#F2EFEA] z-20">
          <Link href="/" className="h-14 w-full flex justify-between items-center px-4 border-b">
            <li className="text-sm hover:text-[orangered]">HOME</li>
            <IoIosArrowForward size={30} />
          </Link>

          <Link href="/nomination" className="h-14 w-full flex justify-between items-center px-4 border-b">
            <li className="text-sm hover:text-[orangered]">Nomination</li>
            <IoIosArrowForward size={30} />
          </Link>
          {/* Add more links here */}
        </ul>
      )}

      <h1 className="mt-[16vh] text-[1.8em] font-semibold text-center">{nomineeSlugFilter[0]?.categoryName || 'Nominees'}</h1>

      {/* Cards Section */}
      <section className="w-full px-5 flex justify-center">
        <div className="w-full sm:w-[90%] flex flex-wrap gap-6 justify-center">
          {nomineeSlugFilter.map((n) => (
            <div
              key={n.id}
              className="flex flex-col items-center bg-white shadow-lg rounded-md overflow-hidden w-full sm:w-[48%] lg:w-[30%]"
            >
              <div className="w-full h-[18rem] bg-gray-200">
                <img
                  src={getImageUrl(n.id)}
                  alt={`${n.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center bg-[#F9C784] text-center p-4 w-full">
                <h2 className="text-xl font-bold text-[#F24C00]">{n.name}</h2>
                <p className="text-sm text-gray-700 mb-3">{n.code}</p>
                <Link href={`/specific_nominee/${n.id} ${n.organizerid}`}>
                  <button className="w-full px-4 bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-500">
                    Proceed To Vote
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <footer className="w-full text-center mt-10">
        <h2 className="text-lg font-semibold">Get In Touch</h2>
        <div className="flex justify-center gap-4 my-4">
          <Image src={FaceIcon} width={40} alt="Facebook" />
          <Image src={InstaIcon} width={40} alt="Instagram" />
          <Image src={WhatIcon} width={40} alt="WhatsApp" />
          <Image src={TwitIcon} width={40} alt="Twitter" />
        </div>
        <p className="text-sm">0201367519 / 0551678667</p>
        <a href="mailto:eventvote@gmail.com" className="text-sm text-blue-500 hover:underline">
          eventvote@gmail.com
        </a>
      </footer>
    </div>
  );
};

export default Page;