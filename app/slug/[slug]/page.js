'use client'
import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FirstAward from "../../../public/award1.jpg";
import { MdOutlineUpdate } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaCreativeCommonsPd } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import FaceIcon from "../../../public/facebook.png";
import InstaIcon from "../../../public/instagram.gif";
import WhatIcon from "../../../public/whatsapp.png";
import TwitIcon from "../../../public/twitter.png";
import style from "../../../styles/fistslug.module.scss"
// import SecondAward from "../../../public/award1.jpg";
import axios from 'axios'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const page = ({params}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [events,setEvents] = useState([])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch products data from the server
    axios
      .get("https://4178h52b-3004.euw.devtunnels.ms/admin/events")
      .then((response) => {

        setEvents(response.data.events[0])
        setImages(response.data.events[1])
        setLoading(false);}).catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    const { slug }= params;
    const eventSlug = events.filter(ev=>ev.id === slug)





const eventSlugFilter = eventSlug;

  const getImageUrl = () => {


    const image = images.filter(img => img.metadata.name.split('/')[1].split('.')[0] === eventSlug[0].id)
    console.log(image)



    return image[0] && image[0].url
  }
  console.log(events)
  console.log(eventSlug)

  console.log(eventSlugFilter)
  return (
    <div id={style.mainContainer} className='w-[100vw] h-[100vh] px-20 flex flex-col items-center gap-4'>
      <nav id={style.navContainer} className="flex  justify-between w-[100vw] px-8 bg-[#02040F] text-white items-center fixed">
                <Link href={'/eventPage'} id={style.linksElement} className="text-lg py-6 px-4"> Events</Link>
                <ul id={style.navLink} className="flex justify-center gap-10 ml-[6em]">
                  <Link href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> </Link>


                  <button
                    className="md:hidden text-xl p-4 focus:outline-none"
                    onClick={toggleMenu}>
                    <IoMdMenu className='md:hidden'/>
                  </button>
                </ul>
              </nav>
              {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center w-[70vw] h-[100vh] pt-4 z-[999] fixed left-[0vw] bg-[#F2EFEA]">
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>CONTACT US</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>RESULTS</li> <IoIosArrowForward size={30} /> </Link>
                   </ul>
                )}
      <div id={style.cardContainer} className='w-[100vw] h-[100vh] px-20  justify-around  flex items-center gap-4'>
   {!loading &&  <div id={style.firstCard} className='flex flex-col justify-center items-center  h-[100vh] gap-4'>
          <img src={getImageUrl()} alt='Image'
              id={style.image} className='w-[25rem] rounded-full'/>
            <section id={style.firstCardText}>
             <h2 className='text-[1.5em] font-[600]'>{eventSlugFilter[0]&&eventSlugFilter[0].name}</h2>
            <h4 className='text-[1.2em] font-[500]'>{eventSlugFilter[0]&&eventSlugFilter[0].eventSub}</h4>
            </section>
        </div>}

        {loading &&  <div id={style.firstCard} className='flex flex-col justify-center items-center  h-[100vh] gap-4'>
             <Skeleton circle={true} height={200} width={200} />
              <Skeleton width={250} height={20} />
        </div>}
        { !loading &&   <div id={style.secondCard} className='flex flex-col justify-center items-center pt-10 h-[100vh] gap-4'>
          <h2 id={style.usdCode} className='text-[1.2em] font-[500]'>{eventSlugFilter[0]&&eventSlugFilter[0].code}</h2>
          <section className='flex justify-center items-center'>
            <h4 className='text-[1.2em] font-[900]'>INFORMATION</h4>
            <span></span>
          </section>
          <section id={style.inforDetails} className='flex flex-col justify-center gap-4'>
            <h2 className='flex items-center justify-start gap-10 text-[1.1em] md:text-xlg '> <MdOutlineUpdate size={30}/>Starting Date: {eventSlugFilter[0]&&eventSlugFilter[0].date}   </h2>

            <h2 className='flex items-center justify-start gap-10 text-[1.1em] md:text-xlg '> <FaCreativeCommonsPd size={30}/> Cost Per Vote: {eventSlugFilter[0]&&eventSlugFilter[0].cost}</h2>
            <h2 className='flex items-center justify-start gap-10 text-[1.1em] md:text-xlg '> <BsCalendar2DateFill size={30}/> Closing Date: {eventSlugFilter[0]&&eventSlugFilter[0].expired}</h2>
          </section>

          <section id={style.infoBox} className='flex flex-col gap-4 items-center mt-5 '>

          <div className='flex gap-4'>
            <Link href={`http://localhost:3000/category/${eventSlugFilter[0]&&eventSlugFilter[0].id} vote`}><button className='text-white bg-[purple] w-[6rem] h-[5vh] rounded-[5px]'>Vote</button></Link>
            <Link href={`http://localhost:3000/category/${eventSlugFilter[0]&&eventSlugFilter[0].id} Results`}><button className='text-white bg-[#08ec26] w-[6rem] h-[5vh] rounded-[5px]'>Results</button></Link>
            </div>

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
          </section>
        </div>}


      </div>

    </div>
  )
}

export default page;