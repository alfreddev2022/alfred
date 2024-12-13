'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Image from 'next/image';
import FaceIcon from "/public/facebook.png";
import InstaIcon from "/public/instagram.gif";
import WhatIcon from "/public/whatsapp.png";
import TwitIcon from "/public/twitter.png";
import style from '/styles/eventPage.module.scss';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Votes from '../public/votes.jpg'

const EventsPerPage = 15;

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ref = useRef();

  // Fetch event data
  useEffect(() => {
    axios
      .get("https://api.allvotesgh.com/admin/events")
      .then((response) => {
        setEvents(response.data.events[0]);
        setImages(response.data.events[1]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const getImageUrl = (id) => {
    const image = images.filter(img => img.metadata.name.split('/')[1].split('.')[0] === id);
    return image[0] ? image[0].url : '/default-image.png';  // default image in case of error
  };

  const startIndex = (currentPage - 1) * EventsPerPage;
  const endIndex = startIndex + EventsPerPage;

  const searchItem = events.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
  const eventsToShow = search.length > 0 ? searchItem.slice(startIndex, endIndex) : events.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div id={style.mainContainer} className="w-full flex flex-col items-center gap-10 overflow-x-hidden">
      {/* Navbar */}
      <nav id={style.navContainer} className="flex justify-between z-20 w-full px-8 bg-[#02040F] items-center fixed">
        <Link href={'/eventPage'} id={style.linksElement} className="text-lg py-6 px-4 text-[#E7E7E7] flex items-center font-light">
          All Votes
        </Link>
        <ul id={style.navLink} className="flex items-center gap-10 text-white">
          <Link href={"/eventPage"}><li className="text-sm hover:text-[#F24C00]">Home</li></Link>
          <Link href={"/nomination"}><li className="text-sm hover:text-[#F24C00]">Nominations</li></Link>
        </ul>
        <div className="flex items-center gap-4 py-6 sm:ml-[-2rem]">
          <input
            className="outline-none w-[400px] h-8 px-2 py-2 rounded-md border border-gray-300"
            type="search"
            placeholder="Search Events..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="md:hidden text-[2em] pr-8" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <IoMdMenu color='white' />
          </button>
          <Link href={"/login"} className='hidden sm:block'>
            <div className="text-sm text-white hover:text-[#F2EFEA] bg-[#F24C00] px-4 py-2 rounded-md shadow-md">I am an Organizer</div>
          </Link>
        </div>
      </nav>

      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center w-[70vw] h-[100vh] pt-4 z-[999] fixed left-[0vw] bg-[#F2EFEA]">
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"/nomination"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>Nomination</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>RESULTS</li> <IoIosArrowForward size={30} /> </Link>
        </ul>
      )}

      {/* Event Cards */}
      <div className="w-full px-4 py-28 flex flex-wrap gap-4 justify-center">
        {/* Show event cards in a row on large screens and stack them on small screens */}
        {!loading && eventsToShow.map((event) => (
          <div key={event.id} className="w-full sm:w-[29vw] md:w-[29vw] lg:w-[29vw] border rounded-lg h-[27rem] hover:shadow-xl transition-all transform hover:scale-105">
            <Link href={`/slug/${event.id}`}>
              <img src={getImageUrl(event.id)} alt={`Event ${event.name}`} className="w-full h-[20rem] object-cover" />
            </Link>
            <div className="bg-white p-4">
              <Link href={`/slug/${event.id}`} className="text-center font-bold text-xl text-[#02040F]">{event.name}</Link>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <p>Starting: {event.date}</p>
                <p className="text-[#DA4167]">Ending: {event.expired}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Skeleton Loader */}
        {loading && Array.from({ length: EventsPerPage }).map((_, index) => (
          <div key={index} className="w-[18rem] h-[18rem] border rounded-lg bg-[#1F2421] flex flex-col justify-center items-center gap-4 p-0">
            <Skeleton circle={true} height={100} width={100} />
            <Skeleton width={150} height={20} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {eventsToShow.length >= EventsPerPage && Array.from({ length: Math.ceil(events.length / EventsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-2 rounded-[5px] ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Page;