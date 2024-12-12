

'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import FirstAward from "/public/award1.jpg";
import SecondAward from "/public/award2.jpg";
import Image from 'next/image';
import FaceIcon from "/public/facebook.png";
import InstaIcon from "/public/instagram.gif";
import WhatIcon from "/public/whatsapp.png";
import TwitIcon from "/public/twitter.png";
import style from '/styles/eventPage.module.scss'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const EventsPerPage = 15;
const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [events, setEvents] = useState([1])
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([])
  const getImageUrl = (id) => {
    const image = images.filter(img => img.metadata.name.split('/')[1].split('.')[0] === id)

    return image[0] && image[0].url
  }
  const ref = useRef()



  useEffect(() => {
    // Fetch products data from the server
    axios
      .get("https://api.allvotesgh.com/admin/events")
      .then((response) => {

        setEvents(response.data.events[0])
        setImages(response.data.events[1]);

        setTimeout(() => setLoading(false), 2000)



      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const eventData = events
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of events to display based on the current page
  const startIndex = (currentPage - 1) * EventsPerPage;
  const endIndex = startIndex + EventsPerPage;
  const searchItem = eventData.length > 1 && eventData.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
  const eventsToShow = search.length > 0 && searchItem.slice(startIndex, endIndex) || eventData.slice(startIndex, endIndex);

  console.log("events: ", eventsToShow)

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div id={style.mainContainer} className='w-[100vw] flex flex-col items-center gap-10  overflow-x-hidden '>

      <nav id={style.navContainer} className="flex   justify-between z-[99]  w-[100vw] px-8 bg-[#02040F] items-center fixed">
        <Link href={'eventPage'} id={style.linksElement} className="text-lg py-6 px-4 text-[#E7E7E7]   "> ALLVOTES</Link>
        <ul id={style.navLink} className="flex justify-center items-center gap-10 ml-[6em] text-white">
          <Link href={"/eventPage"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>Home</li> </Link>

          <Link href={"/nomination"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>NOMINATIONS</li> </Link>
        </ul>

        <div id={style.search} className="py-6 sm:ml-[-2rem] items-center  flex gap-4 ">
          <input
            className="outline-none w-[400px] h-8 px-2 py-2 rounded"
            type="search"
            placeholder="Search Events......"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button id={style.menu}
            className="md:hidden text-[2em] pr-8 focus:outline-none"
            onClick={toggleMenu}>
            <IoMdMenu className='md:hidden' />
          </button>
          <Link href={"/login"} className='hidden sm:block'><div title="click here if you are an organizer to login" className='text-sm  text-white hover:text-[#F2EFEA] flex items-center justify-center bg-[#F24C00]  px-2 py-2 rounded-md shadow-md'>I am an Organizer</div> </Link>
        </div>


      </nav>
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center w-[70vw] h-[100vh] pt-4 z-[999] fixed left-[0vw] bg-[#F2EFEA]">
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT US</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>CONTACT US</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>NOMINATIONS</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>RESULTS</li> <IoIosArrowForward size={30} /> </Link>

        </ul>
      )}

      <div>
        <div id={style.cardContainer} className="w-screen gap-4 h-screen items-center justify-center  px-4  sm:items-start flex py-28 flex-col sm:flex-row flex-wrap  sm:px-10 ">



          {!loading && eventsToShow.map(eventData => (

            <div key={eventData.id} className='sm:w-[29vw]   transform transition-transform duration-300 sm:hover:scale-[106%]  overflow-hidden border rounded-lg h-[27rem]   hover:shadow-xl  items-center   p-0 '>

              <Link href={`slug/${eventData.id}`}> <img ref={ref} src={getImageUrl(eventData.id)} alt={`Event ${eventData.id}`} className='w-full min-h-[20rem] max-h-[14rem] min-h-[20rem]' /> </Link>
              <div className='flex  flex-col  w-full bg-[white] font-[500] text-[#02040F] p-4 '>
                <Link href={`slug/${eventData.id}`} className="w-full p-4 text-center font-bold "><p>{eventData.name}</p> </Link>

                <div className='flex gap-0'>    <Link href={`slug/${eventData.id}`} className="w-full text-center  font-[400]  "><p>starting: {eventData.date}</p> </Link>
                  <Link href={`slug/${eventData.id}`} className="w-full  text-center  font-[400]  "><p className='text-[#DA4167]'>Ending: {eventData.expired}  </p> </Link>
                </div>


              </div>


            </div>
          ))}








          {loading && eventsToShow.map((eventData, index) => (

            <div key={index} className="w-[18rem] h-[18rem] border rounded-lg bg-[#1F2421] flex flex-col justify-center items-center gap-4 p-0">
              <Skeleton circle={true} height={100} width={100} />
              <Skeleton width={150} height={20} />
            </div>
          ))}




        </div>
        <div className="flex justify-center mt-4 ">
          {eventsToShow >= 16 && Array.from({ length: Math.ceil(eventData.length / EventsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-2 rounded-[5px] ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>


    </div>
  );
};

export default Page;
