'use client'
import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";
import style from '../../../styles/app.module.scss'
import Resultchart from '../../components/resultchart';
import axios from 'axios'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const page = ({params}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {nom } = params;
   const [loading, setLoading] = useState(true);
  const [nomineeSlug, setNominee] = useState([])
  useEffect(() => {
    axios
      .get("https://api.allvotesgh.com/organizer/nominee")
      .then((response) => {
        setNominee(response.data.nominees[0]);


      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div id={style.mainContainer} className='w-[100vw] lg:px-20 pb-20 flex flex-col items-center lg:gap-8 overflow-hidden'>
      <nav id={style.navContainer} className="flex justify-between z-20 w-full px-8 bg-[#02040F] items-center fixed">
        <Link href={'/eventPage'} id={style.linksElement} className="text-lg py-6 px-4 text-[#E7E7E7] flex items-center font-light">
          All Votes
        </Link>
        <ul id={style.navLink} className="flex items-center gap-10 text-white">
          <Link href={"/eventPage"}><li className="text-sm hover:text-[#F24C00]">Home</li></Link>
          <Link href={"/nomination"}><li className="text-sm hover:text-[#F24C00]">Nominations</li></Link>
        </ul>

      </nav>

      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center w-[70vw] h-[100vh] pt-4 z-[999] fixed left-[0vw] bg-[#F2EFEA]">
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"/nomination"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>Nomination</li> <IoIosArrowForward size={30} /> </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>RESULTS</li> <IoIosArrowForward size={30} /> </Link>
        </ul>
      )}

        <div className=" w-[90vw] h-[auto] overflow-hidden mt-20">
          <Resultchart params={nom}/>
        </div>

    </div>
  )
}

export default page