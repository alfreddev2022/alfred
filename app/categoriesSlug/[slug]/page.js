'use client'
import React,{useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import FaceIcon from "../../../public/facebook.png";
import InstaIcon from "../../../public/instagram.gif";
import WhatIcon from "../../../public/whatsapp.png";
import TwitIcon from "../../../public/twitter.png";
import FirstAward from "../../../public/award1.jpg";
import style from '../../../styles/categories.module.scss'

const page = ({params}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    const { slug }= params;
    const categorySlug =[
        {
            pageLink: "firstevent",
            eventName: "GHANA YOUTH EXCELLENCE AWARDS",
            catLink1: "bestprogrammer",
            imageUrl1: FirstAward,
            detail1: "Best Programmer of the year",
            catLink2: "bestgraphic",
            imageUrl2: FirstAward,
            detail2: "Best Graphic Designer of the year",
            catLink3: "bestfashionist",
            imageUrl3: FirstAward,
            detail3: "Best Fashionister of the year",
            catLink4: "bestmc",
            imageUrl4: FirstAward,
            detail4: "Best MC of the year",
            catLink5: "bestvideo",
            imageUrl5: FirstAward,
            detail5: "Best Videography of the year",
            catLink6: "beststudent",
            imageUrl6: FirstAward,
            detail6: "Best Student of the Year",
            catLink7: "bestmedia",
            imageUrl7: FirstAward,
            detail7: "Best Media of the year",
            catLink8: "bestexecutive",
            imageUrl8: FirstAward,
            detail8: "Best Student Executive of the year"
        }
    ]

    const categorySlugFilter = categorySlug.filter(verify => verify.pageLink.toLowerCase() == slug.toLowerCase())
    console.log(categorySlugFilter)
  return (
    <div className='w-[100vw]  md:px-20 pb-20 flex flex-col items-center gap-4'>
              <nav id={style.navContainer} className="flex  justify-between w-[100vw] px-8 bg-[#F2EFEA] items-center fixed">
                <Link href={'/eventPage'} id={style.linksElement} className="text-lg py-6 px-4"> Events</Link>
                <ul id={style.navLink} className="flex justify-center gap-10 ml-[6em]">
                  <Link href={"/"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> </Link>
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
                   <ul className="md:hidden flex flex-col items-center w-[70vw] h-[100vh] pt-4 z-[999] fixed left-[0vw] bg-[#F2EFEA]">
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>CONTACT US</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>RESULTS</li> <IoIosArrowForward size={30} /> </Link>
                     
                   </ul>
                )}
        <h1 className='mt-[18vh] md:text-[2em] text-center text-[1.3em] font-[600]'>{categorySlugFilter[0]&&categorySlugFilter[0].eventName}</h1>

        <section className='md:w-[50vw] w-[90vw] h-[auto] p-3 border cursor-pointer'>
            <div className='md:w-[48vw] h-[auto] border'>
              <div className='h-20 flex items-center gap-4 md:text-[1.5em] pl-[10vw] hover:underline'>
                <Image src={categorySlugFilter[0] && categorySlugFilter[0].imageUrl1} alt='image' 
                  className='md:w-10 w-6'/>
                <Link href={'/nominees/firstevent'}><h3>{categorySlugFilter[0]&&categorySlugFilter[0].detail1}</h3></Link>
              </div>
              <hr/>
              <div className='h-20 flex  items-center gap-4 md:text-[1.5em] pl-[10vw] hover:underline'>
                <Image src={categorySlugFilter[0] && categorySlugFilter[0].imageUrl2} alt='image' 
                  className='md:w-10 w-6'/>
                <Link href={'/nominees/firstevent'}><h3>{categorySlugFilter[0]&&categorySlugFilter[0].detail2}</h3></Link>
              </div>
              <hr/>
              <div className='h-20 flex items-center gap-4 md:text-[1.5em] pl-[10vw] hover:underline'>
                <Image src={categorySlugFilter[0] && categorySlugFilter[0].imageUrl3} alt='image' 
                  className='md:w-10 w-6'/>
                <Link href={'/nominees/firstevent'}><h3>{categorySlugFilter[0]&&categorySlugFilter[0].detail3}</h3></Link>
              </div>
              <hr/>
              <div className='h-20 flex items-center gap-4 md:text-[1.5em] pl-[10vw] hover:underline'>
                <Image src={categorySlugFilter[0] && categorySlugFilter[0].imageUrl4} alt='image' 
                 className='md:w-10 w-6'/>
                <Link href={'/nominees/firstevent'}><h3>{categorySlugFilter[0]&&categorySlugFilter[0].detail4}</h3></Link>
              </div>
              <hr/>
              <div className='h-20 flex items-center gap-4 md:text-[1.5em] pl-[10vw] hover:underline'>
                <Image src={categorySlugFilter[0] && categorySlugFilter[0].imageUrl5} alt='image' 
                  className='md:w-10 w-6'/>
                <Link href={'/nominees/firstevent'}><h3>{categorySlugFilter[0]&&categorySlugFilter[0].detail5}</h3></Link>
              </div>
              <hr/>
              <div className='h-20 flex items-center gap-4 md:text-[1.5em] pl-[10vw] hover:underline'>
                <Image src={categorySlugFilter[0] && categorySlugFilter[0].imageUrl6} alt='image' 
                  className='md:w-10 w-6'/>
                <Link href={'/nominees/firstevent'}><h3>{categorySlugFilter[0]&&categorySlugFilter[0].detail6}</h3></Link>
              </div>
              <hr/>
              <div className='h-20 flex items-center gap-4 md:text-[1.5em] pl-[10vw] hover:underline'>
                <Image src={categorySlugFilter[0] && categorySlugFilter[0].imageUrl7} alt='image' 
                  className='md:w-10 w-6'/>
                <Link href={'/nominees/firstevent'}><h3>{categorySlugFilter[0]&&categorySlugFilter[0].detail8}</h3></Link>
              </div>
              <hr/>
              <div className='h-20 flex items-center gap-4 md:text-[1.5em] pl-[10vw] hover:underline'>
                <Image src={categorySlugFilter[0] && categorySlugFilter[0].imageUrl1} alt='image' 
                 className='md:w-10 w-6'/>
                <Link href={'/nominees/firstevent'}><h3>{categorySlugFilter[0]&&categorySlugFilter[0].detail1}</h3></Link>
              </div>
              <hr/>
            </div>
        </section>
    </div>
  )
}

export default page