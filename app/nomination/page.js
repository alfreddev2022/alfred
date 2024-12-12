'use client'
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import { Button, Input } from "antd";
import axios from 'axios';
import style from '../../styles/nomination.module.scss';

const Page = () => {
  const [nname, setNname] = useState("")
  const [nphone, setNphone] = useState("")
  const [image,setImage]= useState("")
  const [events,setEvents] = useState([])
  const [categories,setCategories] = useState()
  const [selectedEventId, setSelectedEventId] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
    const [catis,setCatis] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [organizerid,setOrganizerId] = useState("")
  const [ncategory,setNCategory] = useState("")
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
   };


  const handleAddItem = async () => {

    try {
 const eventData = {
        name: nname,
       code:"",
        category: ncategory,
        organizerid: organizerid,
        phone:nphone

      };

      // Make POST request to add event data
      const response = await axios.post("https://api.allvotesgh.com/organizer/nominee", eventData);

      const formdata = new FormData();

      // Append the image file to the FormData object
      formdata.append('image', image);




      // Make a POST request to upload file data using FormData
      const filesend = await axios.post('https://api.allvotesgh.com/organizer/nominee/file', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
      });



    } catch (error) {
      console.error("Error adding event:", error);

    }
  };


   useEffect(() => {
    // Fetch products data from the server
    axios
      .get("https://api.allvotesgh.com/admin/events")
      .then((response) => {
        setEvents(response.data.events[0])

      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);


    const fitCat = (id)=>{
      const cati = categories.filter(c => c.organizerid === id)
    return cati
    }

    const filEvent = (name)=>{
      const E =  events.filter(e=>e.name===name)
      setOrganizerId(E[0].id)

      return fitCat(E[0].id)
    }

    // Handle the event selection
    const handleEventChange = (e) => {

    setCatis(filEvent(e.target.value))


      };

  const handleFileUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  useEffect(() => {
    axios
      .get("https://api.allvotesgh.com/organizer")
      .then((response) => {
        setCategories(response.data.events);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div id={style.mainContainer} className='w-[100vw] flex flex-col items-center gap-10 overflow-x-hidden md:pb-6'>
      <nav id={style.navContainer} className="flex text-white justify-between w-[100vw] px-8 bg-[#485896] items-center fixed z-10">
        <Link href={'/eventPage'} id={style.linksElement} className="text-lg text-[#e1e7e7] py-6 px-4">Events</Link>
        <ul id={style.navLink} className="flex justify-center items-center gap-10 ml-[6em]">
          <Link href={"/"}><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li></Link>
          <Link href={"#"}><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li></Link>
          <Link href={"#"}><li id={style.linksElement} className='text-sm hover:text-[orangered]'>CONTACT</li></Link>
          <Link href={"/nomination"}><li id={style.linksElement} className='text-sm hover:text-[orangered]'>NOMINATIONS</li></Link>
        </ul>

      </nav>

      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center w-[70vw] h-[100vh] pt-4 z-[999] fixed left-[0vw] bg-[#F2EFEA]">
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0' href={"#"}>
            <li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li>
            <IoIosArrowForward size={30} />
          </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0' href={"#"}>
            <li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li>
            <IoIosArrowForward size={30} />
          </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0' href={"#"}>
            <li id={style.linksElement} className='text-sm hover:text-[orangered]'>CONTACT US</li>
            <IoIosArrowForward size={30} />
          </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0' href={"#"}>
            <li id={style.linksElement} className='text-sm hover:text-[orangered]'>NOMINATIONS</li>
            <IoIosArrowForward size={30} />
          </Link>
          <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0' href={"#"}>
            <li id={style.linksElement} className='text-sm hover:text-[orangered]'>RESULTS</li>
            <IoIosArrowForward size={30} />
          </Link>
        </ul>
      )}

      <div className='w-[100vw] lg:w-[50vw] h-[auto] mt-[20vh] px-4 flex flex-col items-center gap-4'>
        <h1 className='text-2xl font-[700]'>NOMINEE PLATFORM</h1>
        <div className='w-full px-2 flex flex-col gap-4'>
          <Input
            type='text'
            placeholder='Enter Nominee Name'
            required
            onChange={(e)=>setNname(e.target.value)}
            className='h-14 text-lg text-gray-400'
          />
          <Input
            type='text'
            placeholder='Enter Nominee Phone Number'
            required
            onChange={(e)=>setNphone(e.target.value)}
            className='h-14 text-lg text-gray-400'
          />
          <textarea
            cols={1}
            rows={7}
            placeholder='Tell us something about yourself'
            className='text-lg text-gray-400 border rounded-md py-2 px-4'
          />

          <div className="h-[20vh] border rounded-md py-2 px-4 text-lg text-gray-400 file-upload-wrapper flex  items-center justify-center gap-2">
            <button
              onClick={handleFileUploadClick}
              className="flex flex-col items-center gap-2 text-lg text-gray-400"
            >
              <SlCloudUpload size={50} />
              <span>Upload File</span>
            </button>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              required
            />
          </div>

          <select name="category" onChange={(e)=>handleEventChange(e)} className=" h-14 px-4 border rounded-lg border-[gray] ">
              <option value={'Choose Category'} selected hidden>Choose Event</option>
              {events && events.map((e)=><option value={e.name} >{e.name}</option>) }
          </select>

          <select name="category" onChange={(e)=>setNCategory(e.target.value)}  className=" h-14 px-4 border rounded-lg border-[gray] mb-2">
              <option value={'Choose Category'} selected hidden>Choose Category</option>
              {catis.length>=1 && catis.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
          </select>

          <Button className='w-[50vw] lg:w-[15vw] h-14 text-xl text-white font-[700] bg-slate-500' onClick={()=>handleAddItem()}>SUBMIT</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
