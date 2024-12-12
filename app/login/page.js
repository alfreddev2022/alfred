"use client"
import axios from 'axios';
import React, { useState,useContext } from 'react';
import { IoIosMailUnread } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoMdMenu } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import FaceIcon from '../../public/facebook.png';
import InstaIcon from '../../public/instagram.gif';
import WhatIcon from '../../public/whatsapp.png';
import TwitIcon from '../../public/twitter.png';
import LogoImage from '../../public/lg.svg';
import style from '../../styles/app.module.scss';
import { useRouter } from 'next/navigation';
import { Modal } from 'antd';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import MyContext from "../Context/Context.js"
const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setorgemail}= useContext(MyContext)

const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  const setEncryptedUserDataCookie = (email) => {
    const secretKey = 'your-secret-key'; // Replace with your secret key
    const encryptedData = CryptoJS.AES.encrypt(email, secretKey).toString();
    Cookies.set('encrypted_UserData', encryptedData, { expires: 17 });
  };



  const setOrgId = (id) => {
    const secretKey = 'your-secret-key'; // Replace with your secret key
    const encryptedData = CryptoJS.AES.encrypt(id, secretKey).toString();
    Cookies.set('Org_Id', encryptedData, { expires: 17 });
  };


  // Function to decrypt the cookie data and retrieve the user email


  const handleLogin = async () => {
    try {
      const response = await axios.post(`https://api.allvotesgh.com/admin/events/login`, {
        email: email,
        password: password,
      });

      console.log(response.data)

      if (email === 'codingbakelvin@gmail.com') {
        // Set encrypted user data in cookie
        await setEncryptedUserDataCookie(email);
        // Redirect to /dashboard for codingbagh@gmail.com
        router.push('/dashboard');
          setorgemail(email)
          return
      } else {
        // Set encrypted user data in cookie
        console.log()
     await  setEncryptedUserDataCookie(email);
     await setOrgId(response.data.adminId)
        // Redirect to /organizer for other emails
        router.push('/organizer');
        setorgemail(email)
        return
      }

    }catch (error) {
      // Handle login error by showing a modal
      Modal.error({
        title: 'Login Error',
        content: 'Email or password is not correct.',
      });
    }
  };


  return (
    <div className="w-[100vw] flex flex-col ">
      <nav
        id={style.navContainer}
        className="flex  justify-between w-[100vw] md:px-20 bg-[#F2EFEA] items-center fixed"
      >
        <Link href={'http://localhost:3000/eventPage'} id={style.linksElement} className="text-lg py-6 px-4">
          {' '}
          Events
        </Link>
        <ul id={style.navLink} className="flex justify-center gap-10 ml-[6em]">
          <Link href={'#'}>
            <li id={style.linksElement} className="text-sm hover:text-[orangered]">
              HOME
            </li>{' '}
          </Link>
          <Link href={'#'}>
            <li id={style.linksElement} className="text-sm hover:text-[orangered]">
              ABOUT
            </li>{' '}
          </Link>
          <Link href={'#'}>
            <li id={style.linksElement} className="text-sm hover:text-[orangered]">
              CONTACT
            </li>{' '}
          </Link>
          <button className="md:hidden text-xl p-4 focus:outline-none" onClick={toggleMenu}>
            <IoMdMenu className="md:hidden" />
          </button>
        </ul>
      </nav>
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center w-[70vw] h-[100vh] pt-4 z-[999] fixed left-[0vw] bg-[#F2EFEA]">
          <Link
            className="h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 "
            href={'#'}
          >
            <li id={style.linksElement} className="text-sm hover:text-[orangered]">
              HOME
            </li>{' '}
            <IoIosArrowForward size={30} />{' '}
          </Link>
          <Link
            className="h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 "
            href={'#'}
          >
            <li id={style.linksElement} className="text-sm hover:text-[orangered]">
              ABOUT
            </li>{' '}
            <IoIosArrowForward size={30} />{' '}
          </Link>
          <Link
            className="h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 "
            href={'#'}
          >
            <li id={style.linksElement} className="text-sm hover:text-[orangered]">
              CONTACT US
            </li>{' '}
            <IoIosArrowForward size={30} />{' '}
          </Link>
          <Link
            className="h-14 w-[15rem] flex justify-between items-center border border-[gray] border-opacity-0.4 border-l-0 border-r-0 border-t-0 "
            href={'#'}
          >
            <li id={style.linksElement} className="text-sm hover:text-[orangered]">
              RESULTS
            </li>{' '}
            <IoIosArrowForward size={30} />{' '}
          </Link>
        </ul>
      )}

      <div className="py-20 flex flex-col justify-center items-center">
        <div className="lg:flex lg:flex-row-reverse lg:px-20 py-10 px-5  flex flex-col gap-8">
          <Image src={LogoImage} alt={'logo image'} className=" lg:w-[50vw] pt-10" />

          <div class="bg-[white] flex flex-col justify-center items-center gap-4 ">
            <h1 className="text-[1.5em] font-[700] ">Voting System</h1>

            <section className="flex flex-col justify-center items-center gap-6 ">
              <div className=" border flex items-center px-2">
                <IoIosMailUnread color={'#02007f'} size={30} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className=" bg-white rounded-[5px] h-[8vh] w-[70vw] lg:w-[25vw] text-gray text-[1.2em] lg:text-[1em] px-2 leading-tight outline-none"
                  placeholder="Your Email Address*"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className=" border flex items-center px-2">
                <RiLockPasswordFill color={'#02007f'} size={30} />
                <input
                  type="password"
                  id="password"
                  name="Password"
                  className=" bg-white rounded-[5px] h-[6vh] w-[70vw] lg:w-[25vw] text-gray text-[1.2em] lg:text-[1em] px-2 leading-tight outline-none"
                  placeholder="Your Password*"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

                <button
                  className="w-[70vw] lg:w-[20vw] text-white h-[6.5vh] bg-[#1E3231] rounded-[5px] text-[1.5em] font-[600] flex justify-center items-center gap-2"
                  onClick={handleLogin}
                >
                  Login <FaArrowRight color={'#fff'} size={25} />
                </button>

            </section>

            <div className="flex justify-center items-center lg:w-[50vw] ">
              <span className="lg:w-[12vw] w-[45vw] h-0.5 bg-black bg-opacity-20 "></span>
              <h3>OR</h3>
              <span className="lg:w-[12vw] w-[45vw] h-0.5 bg-black bg-opacity-20"></span>
            </div>
            <Link href={'#'} className="text-[blue] ">
              Forgot password?
            </Link>
          </div>
        </div>

        <section className="flex flex-col gap-2 items-center">
          <h2 className="text-[1.3em]">Get In Touch</h2>
          <div className="flex gap-4">
            <div>
              <Image src={FaceIcon} width={40} alt="Facebook Icon" />
            </div>
            <div>
              <Image src={InstaIcon} width={40} alt="Instagram Icon" />
            </div>
            <div>
              <Image src={WhatIcon} width={40} alt="WhatsApp Icon" />
            </div>
            <div>
              <Image src={TwitIcon} width={40} alt="Twitter Icon" />
            </div>
          </div>
          <h3>0202752828/0201357519</h3>
          <a href="mailto:eventvote@gmail.com">eventvote@gmail.com</a>
        </section>
      </div>
    </div>
  );
};

export default Page;
