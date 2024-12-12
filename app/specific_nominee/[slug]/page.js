'use client'
import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Programmer from "../../../public/Programmer.jpg";
import { RiNumbersFill } from "react-icons/ri";
import { BsPhoneFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import FaceIcon from "../../../public/facebook.png";
import InstaIcon from "../../../public/instagram.gif";
import WhatIcon from "../../../public/whatsapp.png";
import TwitIcon from "../../../public/twitter.png";
import style from "../../../styles/specific_nominee.module.scss"
// import SecondAward from "../../../public/award1.jpg";
import axios from 'axios'
import { Modal } from 'antd';
import moment from 'moment-timezone';
import PaystackPayment from '@/app/components/paystack';

const page = ({params}) => {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const currentDate = moment().format("YYYY-MM-DD");
  const currentTime = moment().format('HH:mm:ss');

  const { slug } = params;
  const ids = params.slug.split("%20");
  const [images, setImages] = useState([]);
  const [votes, setVotes] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [events, setEvents] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [nomineeSlug, setNominee] = useState([]);

  const getImageUrl = (id) => {
    if (!id || !images.length) return null; // Guard clause
    const image = images.find(img => {
      const nameParts = img.metadata?.name?.split('/');
      return nameParts?.[1]?.split('.')[0] === id;
    });
    return image?.url || null;
  };
  const eventfilter = events.filter(e => e.id == ids[1]);
  const cost = eventfilter[0] && parseFloat(eventfilter[0].cost) * parseFloat(votes);

  const nomineeSlugFilter = nomineeSlug.filter(n => n.id == ids[0]);

  const handleVote = async () => {
    try {
      const response = await axios.post('https://api.allvotesgh.com/organizer/vote', {
        nomineeId: ids[0],
        votes,
        phoneNumber,
        email,
        currentDate,
        currentTime,
        cost
      });

      await axios.post("https://api.allvotesgh.com/organizer/addVotes", {
        nomineeId: ids[0],
        votes,
        phoneNumber,
        email,
        organizerid: ids[1],
        name: nomineeSlugFilter[0].name,
        currentDate,
        currentTime,
        cost
      });

      setSuccessModalVisible(true);
    } catch (error) {
      setErrorModalVisible(true);
    }
  };



  const reload = async () => {
    axios
      .get("https://api.allvotesgh.com/organizer/nominee")
      .then((response) => {
        setNominee(response.data.nominees[0]);
        setImages(response.data.nominees[1]);

      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events data
        const eventResponse = await axios.get("https://api.allvotesgh.com/admin/events");
        setEvents(eventResponse.data.events[0]);
        setImages(eventResponse.data.events[1]);

        // Fetch nominees data
        const nomineeResponse = await axios.get("https://api.allvotesgh.com/organizer/nominee");
        setNominee(nomineeResponse.data.nominees[0]);
        setImages(nomineeResponse.data.nominees[1]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePaymentSuccess = () => {
    handleVote();
  };

  const handlePaymentClose = () => {
    console.log("Payment closed");
  };


  return (
    <div id={style.mainContainer} className='w-[100vw] h-[100vh] px-20 flex flex-col items-center gap-4'>
              <nav id={style.navContainer} className="flex  justify-between w-[100vw] px-8 bg-[#F2EFEA] items-center fixed">
                <Link href={'/eventPage'} id={style.linksElement} className="text-lg py-6 px-4"> Events</Link>
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
                   <ul className="md:hidden flex flex-col items-center w-[70vw] h-[100vh] pt-4 z-[999] fixed left-[0vw] bg-[#F2EFEA]">
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>HOME</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>ABOUT</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>CONTACT US</li> <IoIosArrowForward size={30} /> </Link>
                     <Link className='h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 ' href={"#"} ><li id={style.linksElement} className='text-sm hover:text-[orangered]'>RESULTS</li> <IoIosArrowForward size={30} /> </Link>

                   </ul>
                )}
      <div id={style.cardContainer} className='w-[100vw]  px-20 mt-[20vh] flex justify-around items-center gap-4'>
        <div id={style.firstCard} className='flex flex-col justify-center items-start  h-[100vh] gap-4'>
          <img
            src={getImageUrl(nomineeSlugFilter[0]?.id) || "/path/to/placeholder.jpg"}
            alt="Nominee Image"
            id={style.image}
            className='w-[25rem] h-[30rem]'
          />
               <section>
                 <h2 className='text-[1.5em] font-[600]'>{nomineeSlugFilter[0]&&nomineeSlugFilter[0].name}</h2>
                 <h4 className='text-[1.2em] font-[500]'>{nomineeSlugFilter[0]&&nomineeSlugFilter[0].category}</h4>
                 <h4 className='text-[1.2em] font-[500]'>{nomineeSlugFilter[0]&&nomineeSlugFilter[0].code}</h4>
               </section>
        </div>
        <div id={style.secondCard} className='flex flex-col justify-center items-center pt-10 h-[100vh] gap-4'>
            <h4 className='text-[2em] text-[purple] font-[500]'>Vote</h4>
          <section id={style.inputBox} className='flex flex-col justify-center gap-4'>
            <h2 className='flex items-center gap-4 text-[1.1em]'> <RiNumbersFill size={30} />
              <input
                type="number"
                value={votes}
                onChange={(e) => setVotes(e.target.value)}
                className=" bg-white rounded-[5px]
               h-[6vh] w-[15vw] text-gray text-[1.2vw]   px-2 leading-tight outline-none"
                placeholder='Number Of Votes*'
                required
              />
            </h2>
            <h2 className='flex items-center gap-4 text-[1.1em]'> <BsPhoneFill size={30} />
              <input
                type="text"

                onChange={(e) => setPhoneNumber(e.target.value)}
                className=" bg-white rounded-[5px]
               h-[6vh] w-[15vw] text-gray text-[1.2vw]   px-2 leading-tight outline-none"
                placeholder='Phone Number*'
                required
              />
            </h2>
            <h2 className='flex items-center gap-4 text-[1.1em]'> <MdEmail size={30} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" bg-white rounded-[5px]
               h-[6vh] w-[15vw] text-gray text-[1.2vw]   px-2 leading-tight outline-none"
                placeholder='Enter Email*'
                required
              />
            </h2>
          </section>

          <section id={style.infoBox} className='flex flex-col gap-4 items-center mt-5 '>
            <PaystackPayment
              amount={cost}
              email={email}
              onSuccess={handlePaymentSuccess}
              onClose={handlePaymentClose}
            />
            <h2 className='text-[1.3vw]'>Get In Touch</h2>
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
          </section>
          <Modal
            title="Success"
            visible={successModalVisible}
            onOk={() => setSuccessModalVisible(false)}
            onCancel={() => setSuccessModalVisible(false)}
          >
            <p>Vote recorded successfully!</p>
          </Modal>

          <Modal
            title="Error"
            visible={errorModalVisible}
            onOk={() => setErrorModalVisible(false)}
            onCancel={() => setErrorModalVisible(false)}
          >
            <p>Error recording vote. Please try again later.</p>
          </Modal>

        </div>
      </div>

    </div>
  )
}

export default page;