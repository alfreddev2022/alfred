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
const page = ({params}) => {
  const [events,setEvents] = useState([])
  const [images, setImages] = useState([])
   const paramArr = params.slug.split("%20")
    const { slug }= params;
    const [ordid,setorgid] = useState("");
    const secretKey = 'your-secret-key'; // Use the same secret key used for encryption
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

        <nav className="flex  justify-between w-[100vw] px-8 bg-[#F2EFEA] items-center fixed">
            <Link href={'#'} className="text-lg py-6 px-4"> Events</Link>
            <ul className="flex justify-center gap-10 ml-[6em]">
               <Link href={"#"} ><li className='text-sm hover:text-[orangered]'>HOME</li> </Link>
               <Link href={"#"} ><li className='text-sm hover:text-[orangered]'>ABOUT</li> </Link>
               <Link href={"#"} ><li className='text-sm hover:text-[orangered]'>CONTACT</li> </Link>
            </ul>
        </nav>

        <h1 className='mt-[20vh] text-[2em] font-[600]'>{categorySlugFilter[0]&&categorySlugFilter[0].eventName}</h1>

        <section className='w-[50vw] h-[auto] p-3 border'>
            <div className='w-[48vw] h-[auto] border'>
      {!loading &&   categorySlugFilter&&categorySlugFilter.map((c)=> <div> <div className='h-20 flex items-center gap-4 text-[1.5em] pl-[10vw]'>
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