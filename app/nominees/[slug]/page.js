'use client'
import React, {useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Programmer from "../../../public/Programmer.jpg";
import Nite from "../../../public/Nite.jpg";
import BestStudent from "../../../public/BestStudent.jpg";
import Fashion from "../../../public/Fashion.jpg";
import FirstAward from "../../../public/award1.jpg";
import FaceIcon from "../../../public/facebook.png";
import InstaIcon from "../../../public/instagram.gif";
import WhatIcon from "../../../public/whatsapp.png";
import TwitIcon from "../../../public/twitter.png";
import style from "../../../styles/nominees.module.scss";
import axios from 'axios'
const page = ({params}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
const [images,setImages]=useState([])
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const { slug }= params;

    const [nomineeSlug,setNominee] =useState([])
    useEffect(() => {
    axios
      .get("https://api.allvotesgh.com/organizer/nominee")
      .then((response) => {
        setNominee(response.data.nominees[0]);
        setImages(response.data.nominees[1]);

      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);




    const nomineeSlugFilter = nomineeSlug.filter(n=>n.organizerid && n.organizerid==slug.split('%2C')[1])
    console.log(nomineeSlugFilter)


  const getImageUrl = (id) => {
    const image = images.filter(img => img.metadata.name.split('/')[1].split('.')[0] === id)
    console.log(image)
    return image[0] && image[0].url
  }


    return(
        <div id={style.mainContainer} className='w-[100vw]  px-20 pb-20 flex flex-col items-center gap-8'>
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
          <h1 className='mt-[16vh] text-[1.6em] font-[600]'>{nomineeSlugFilter[0]&&nomineeSlugFilter[0].categoryName}</h1>

          <section id={style.secondContainer} className='w-[90vw] border p-5'>
            <div id={style.cardContainer} className='w-[90vw]  p-5 grid grid-cols-6 gap-6'>

             {

              nomineeSlugFilter.map(n => <div key={n.id} className=' sm:w-[12vw] flex flex-col items-center border-2 m-4 border-gray rounded-md'>
                <img src={getImageUrl(n.id)} alt='image' className='sm:w-[12vw]  h-[14rem]' />
                <section className='flex flex-col items-center text-[1.1em] font-[600] bg-[#F9C784] w-full p-2' >
                  <span className="text-[#F24C00] text-xl mb-2">{n.name}</span>
                  <span className='mt-[-1vh]'>{n.code}</span>
                  <Link href={`/specific_nominee/${n.id} ${n.organizerid}`}><button className='bg-[green] text-white font-[700] w-full h-8 rounded-[5px] px-2 '>Proceed To Vote</button></Link>
                </section>
              </div>)



             }



            </div>
          </section>

          <div id={style.secondCard} className='flex flex-col gap-4 items-center md:mt-5 '>
          <h2 id={style.getin} className='text-[1.3vw]'>Get In Touch</h2>
          <div id={style.iconsContainer} className="flex gap-4">
              <div>
                <Image id={style.icons} src={FaceIcon} width={40} alt="Facebook Icon" />
              </div>
              <div>
                <Image id={style.icons} src={InstaIcon}  width={40} alt="Instagram Icon" />
              </div>
              <div>
                <Image id={style.icons} src={WhatIcon}  width={40} alt="WhatsApp Icon" />
              </div>
              <div>
                <Image id={style.icons} src={TwitIcon}  width={40} alt="Twitter Icon" />
              </div>
            </div>
            <h3>0202752828/0201357519</h3>
            <a href='mailto:eventvote@gmail.com'>eventvote@gmail.com</a>
          </div>
        </div>
    )
}
export default page;