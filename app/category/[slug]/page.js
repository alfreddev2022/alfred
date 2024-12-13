"use client"
import React,{useEffect,useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FirstAward from "../../../public/award1.jpg";
import axios from 'axios'
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import style from '/styles/eventPage.module.scss';
import Votes from '../../../public/votes.jpg'
import { IoIosArrowForward } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
const page = ({params}) => {
  const [events,setEvents] = useState([])
  const [images, setImages] = useState([])
   const paramArr = params.slug.split("%20")
    const { slug }= params;
    const [ordid,setorgid] = useState("");
    const secretKey = 'your-secret-key'; // Use the same secret key used for encryption
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [loading, setLoading] = useState(true);
    const go = ()=>{
      if(paramArr[1].includes("vote")){
        return "/nominees"
      }

      return "/result"

    }

const getDecryptedUserDataFromCookie =async () => {
  const encryptedData =await Cookies.get('Org_Id');
  if (encryptedData) {
    // Decrypt the encrypted data
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    // Convert the bytes back to a string
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    // Parse the decrypted data (assuming it's JSON)

    console.log(decryptedData)
    return decryptedData;
  } else {
    return null; // Cookie not found or no encrypted data
  }
};
console.log(paramArr)
     useEffect(() => {
       setorgid(getDecryptedUserDataFromCookie())
    axios
      .get("https://api.allvotesgh.com/admin/events")
      .then((response) => {


        setImages(response.data.events[1])
            console.log(response.data.events)
        setLoading(false)
            ;}).catch((error) => {
        console.error("Error fetching events:", error);
      });

       axios
         .get("https://api.allvotesgh.com/organizer")
      .then((response) => {


        setEvents(response.data.events)
            console.log(response.data.events)
            ;}).catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const getImageUrl = (id) => {
    const image = images.filter(img => img.metadata.name.split('/')[1].split('.')[0] === id)
    console.log(image)
    return image[0] && image[0].url
  }

    const categorySlugFilter = events.filter(e=>e.organizerid==paramArr[0])
    console.log(categorySlugFilter)
  return (
    <div className='w-[100vw]  px-20 pb-20 flex flex-col items-center gap-4'>

      {/* Navbar */}
      <nav id={style.navContainer} className="flex justify-between z-20 w-full px-8 bg-[#02040F] items-center fixed">
        <Link href={'/eventPage'} id={style.linksElement} className="text-lg py-6 px-4 text-[#E7E7E7] flex items-center font-light ">
          All Votes <Image alt="logo" src={Votes} width="40" height="40" className="rounded-full" />
        </Link>
        <ul id={style.navLink} className="flex items-center gap-10 text-white">
          <Link href={"/eventPage"}><li className="text-sm hover:text-[#F24C00]">Home</li></Link>
          <Link href={"/nomination"}><li className="text-sm hover:text-[#F24C00]">Nominations</li></Link>
        </ul>
        <div className="flex items-center gap-4 py-6 sm:ml-[-2rem]">

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
      <h1 className='mt-[20vh] sm:text-[2em] font-[600]'>{categorySlugFilter[0] && categorySlugFilter[0].eventName}</h1>

      <section className='sm:w-[50vw] w-[90vw] h-[auto] p-3 border'>
        <div className='sm:w-[48vw] h-[auto] border'>
          {!loading && categorySlugFilter && categorySlugFilter.map((c) => <div> <div className='h-20 flex items-center gap-4 sm:text-[1.5em] pl-[10vw]'>
        <img src={getImageUrl(c.organizerid)} alt='image'
                  className='w-10'/>
        <Link href={`${go()}/${c.name},${c.organizerid}`}>     <h3>{ c.name}</h3> </Link>
              </div>
              <hr/></div>)  }

              {loading &&  <div className="h-20 flex items-center gap-4 text-[1.5em] pl-[10vw]">  <Skeleton circle={true} height={30} width={30} />
              <Skeleton width={250} height={20} /></div>  }

            </div>
        </section>
    </div>
  )
}

export default page