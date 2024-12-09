'use client'
import { usePathname } from "next/navigation";
import React from 'react'
import Cookies from 'js-cookie';



import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineBarChart,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";

import Link from 'next/link'
import {useRouter} from 'next/navigation'

export default function Sidebar() {
  const router = useRouter()
  // Function to remove the encrypted user data cookie
const removeEncryptedUserDataCookie = () => {
  Cookies.remove('encrypted_UserData');
  router.replace('/')
};
  const pathname = usePathname()
  return (
    <div className="flex fixed  flex-col text-[white]  justify-start items-start gap-[10em] h-[100vh] bg-[#33312E] shadow font-[Poppins]">
      <h1 className="text-xl py-6 px-4 font-bold">VotingSys</h1>
      <ul className="flex flex-col gap-4 text-lg">
        <Link href={pathname.includes("/dashboard")?"/dashboard":"/organizer"}>
          <li
            className={`flex py-2 px-4 ${
              pathname =="/dashboard" ? "bg-green-500" : ""
            } items-center gap-2 w-[190px]`}
          >
            <AiOutlineHome /> Overview
          </li>
        </Link>

        <Link href={pathname.includes("/dashboard")?"/dashboard/event":"/organizer/category"}>
          <li
            className={`flex py-2 px-4 ${
              pathname == "/dashboard/event" ? "bg-green-500" : ""
            } items-center gap-2`}
          >
            <AiOutlineCalendar />{pathname.includes("/dashboard")?"Event":"Category"}
          </li>
        </Link>

         <Link href={pathname.includes("/dashboard")?"/dashboard/event/expired":"/organizer/category/nominee"}>
          <li
            className={`flex py-2 px-4 ${
              pathname == "/dashboard/event/expired" ? "bg-green-500" : ""
            } items-center gap-2`}
          >
          <AiOutlineClockCircle />{pathname.includes("/dashboard")?"Expired Event":"Nominees"} 
        </li>
          </Link>
          {pathname !== "/organizer" && (
  <Link href={pathname.includes("/dashboard") ? "/dashboard/event/active" : ""}>
    <li
      className={`flex py-2 px-4 ${
        pathname === "/dashboard/event/active" ? "bg-green-500" : ""
      } items-center gap-2`}
    >
      {pathname.includes("/dashboard") && <AiOutlineClockCircle />}
      {pathname.includes("/dashboard") && "Active Event"}
    </li>
  </Link>
)}


           {/* <Link href={pathname.includes("/dashboard")?"/dashboard/finance":"/organizer/finance"}>
          <li
            className={`flex py-2 px-4 ${
              pathname == "/dashboard/finance" ? "bg-green-500" : ""
            } items-center gap-2`}
          >
       
          <AiOutlineBarChart /> Finance
        </li>
            </Link> */}
      </ul>

      <button onClick={removeEncryptedUserDataCookie} className="flex py-2 px-4 items-center gap-2 text-xl absolute bottom-[40px] cursor-pointer">
        <AiOutlineLogout /> Logout
      </button>
    </div>
  );
}
