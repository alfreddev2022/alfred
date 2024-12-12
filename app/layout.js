"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import MyContext from "./Context/Context.js"
import {useState,useEffect} from 'react';
const inter = Inter({ subsets: ["latin"] });
import axios from 'axios'


export default function RootLayout({ children }) {
    const [events, setEvents] = useState([]);
    const [orgemail,setorgemial]=useState("")
   useEffect(()=>{axios
     .get("https://api.allvotesgh.com/admin/events")
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })},[]);

  return (
    <MyContext.Provider value={{events,setEvents}}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </MyContext.Provider>
  );
}
