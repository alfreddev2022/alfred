'use client'
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import FirstAward from "../../public/award1.jpg";
import SecondAward from "../../public/award2.jpg";
import Image from 'next/image';
import FaceIcon from "../../public/facebook.png";
import InstaIcon from "../../public/instagram.gif";
import WhatIcon from "../../public/whatsapp.png";
import TwitIcon from "../../public/twitter.png";
import style from '../../styles/eventPage.module.scss'
import axios from 'axios';

const EventsPerPage = 8;
const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const [events,setEvents] = useState([])
  const [images, setImages] = useState([])
   const getImageUrl = (id)=>{
    const image = images.filter( img=>img.metadata.name.split('/')[1].split('.')[0]===id)
    console.log(image)
    return  image[0] && image[0].url
  }
  useEffect(() => {
    // Fetch products data from the server
    axios
      .get("http://localhost:3004/admin/events")
      .then((response) => {
     
        setEvents(response.data.events[0])
        setImages(response.data.events[1]);
  
      
      
       
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    const eventData = events
  console.log(images)
      const [currentPage, setCurrentPage] = useState(1);

      // Calculate the range of events to display based on the current page
      const startIndex = (currentPage - 1) * EventsPerPage;
      const endIndex = startIndex + EventsPerPage;
      const eventsToShow = eventData.slice(startIndex, endIndex);
    
      // Function to handle page change
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      
  return (
    <div id={style.mainContainer} className='w-[100vw] flex flex-col items-center gap-10  overflow-x-hidden md:pb-6'>

        <nav id={style.navContainer} className="flex justify-between w-[100vw] px-8 bg-[#F2EFEA] items-center fixed">
                <Link href={'eventPage'} id={style.linksElement} className="text-lg py-6 px-4"> Results</Link>
                <ul id={style.navLink} className="flex justify-center items-center gap-10 ml-[6em]">
                  <Link href={"/"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> </Link>
                  <Link href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li> </Link>
                  <Link href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>CONTACT</li> </Link>
                </ul>

                <div id={style.search} className="py-6 ml-[-2rem] flex gap-4 ">
                  <input
                  className="outline-none w-[300px] h-8 px-2 py-2 rounded"
                  type="search"
                  placeholder="Search Events......"
                  />

                  <button id={style.menu}
                    className="md:hidden text-[2em] pr-8 focus:outline-none"
                    onClick={toggleMenu}>
                    <IoMdMenu  className='md:hidden'/>
                  </button>
                </div>
              </nav>
              {isMenuOpen && (
                   <ul className="md:hidden flex flex-col items-center w-[70vw] h-[100vh] pt-4 z-[999] fixed left-[0vw] bg-[#F2EFEA]">
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>CONTACT US</li> <IoIosArrowForward size={30} /> </Link>
                   </ul>
                )}

        <div>
        <div id={style.cardContainer} className="w-[80rem] h-[40rem] grid grid-cols-4 gap-6 mt-[8rem]">
        {eventsToShow.map(eventData => (

          <div key={eventData.id} className='w-[20rem] h-[20rem] border rounded-[5px] flex flex-col justify-center items-center gap-3 font-[700]'>
            <Link href={`slug/${eventData.id}`}> <img src={getImageUrl(eventData.id)} alt={`Event ${eventData.id}`} className='w-[17rem] h-60' /> </Link>
            <Link href={`slug/${eventData.id}`}><p>{eventData.name}</p> </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(eventData.length / EventsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-2 rounded-[5px] ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>

    <div id={style.lastCard} className=' md:flex md:flex-col md:justify-center md:items-center md:gap-2'>
       <h2 id={style.getin} className='text-[1.3vw]'>Get In Touch</h2>
       <div id={style.iconsContainer} className="flex gap-4">
       <div>
        <Image src={FaceIcon} width={40} alt="Facebook Icon" />
       </div>
        <div>
          <Image src={InstaIcon}  width={40} alt="Instagram Icon" />
        </div>
        <div>
          <Image src={WhatIcon}  width={40} alt="WhatsApp Icon" />
        </div>
        <div>
          <Image src={TwitIcon}  width={40} alt="Twitter Icon" />
        </div>
        </div>
        <h3>0202752828/0201357519</h3>
        <a href='mailto:eventvote@gmail.com'>eventvote@gmail.com</a>
    </div>    
    </div>
  );
};

export default Page;
