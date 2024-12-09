'use client'
import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import FaceIcon from "../public/facebook.png";
import InstaIcon from "../public/instagram.gif";
import WhatIcon from "../public/whatsapp.png";
import TwitIcon from "../public/twitter.png";
import Vote from '../public/VOTE.jpg' 
import style from '../styles/app.module.scss'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <main className="w-[100vw] flex flex-col text-black ">
      <nav id={style.navContainer} className="flex  justify-between w-[100vw] md:px-20 bg-[#F2EFEA] items-center fixed">
                <Link href={'http://localhost:3000/eventPage'} id={style.linksElement} className="text-lg py-6 px-4"> Events</Link>
                <ul id={style.navLink} className="flex justify-center gap-10 ml-[6em]">
                  <Link href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> </Link>
                  <Link href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li> </Link>
                  <Link href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>CONTACT</li> </Link>
                  <button
                    className="md:hidden text-xl p-4 focus:outline-none"
                    onClick={toggleMenu}>
                    <IoMdMenu className='md:hidden'/>
                  </button>
                </ul>
      </nav>
      {isMenuOpen && (
                   <ul className="md:hidden flex flex-col items-center w-[70vw] h-[100vh] pt-4 z-[999] absolute left-[0vw] bg-[#F2EFEA]">
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>CONTACT US</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>RESULTS</li> <IoIosArrowForward size={30} /> </Link>
                     
                   </ul>
        )}     
      
      <div className="py-20 flex flex-col  justify-center items-center">
        <div className="lg:flex lg:flex-row-reverse lg:px-20">
          <Image src={Vote} className=" lg:w-[50vw]"/>

          <section className="py-10  lg:w-[50vw] flex flex-col justify-center items-center lg:items-start gap-4 px-2">
          <h1 className="text-[1.5em] font-[500]"> Empower Your Vote with Us </h1>
          <h1 className="text-[1.5em] font-[700] text-center">
            Join a Community Changing the Future
          </h1>

          <p className=" text-center md:w-[80vw] lg:w-[auto] lg:text-start">
            Streamline your decision-making process with the power of our advanced voting platform. Conduct elections, surveys, and polls effortlessly and efficiently, ensuring transparency and accuracy
          </p>

          <Link href={'http://localhost:3000/login'}>
           <button className='w-[65vw] lg:w-[20vw] h-[6.5vh] md:mt-6 bg-[#1E3231] text-white rounded-[5px] text-[1.5em] lg:text-[1.2em] font-[600] flex justify-center  items-center gap-2'>Login <FaArrowRight color={'#fff'} size= {25}  />
           </button>
          </Link>
          </section>
          </div>

        <section className='flex flex-col gap-2 items-center  h-[20vh] lg:h-[auto] '>
        <h2 className='text-[1.3em]'>Get In Touch</h2>
        <div className="flex gap-4">
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

      </div>
    </main>
  );
}