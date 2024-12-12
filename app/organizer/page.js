"use client"

import React from 'react'
import Barchart from '../components/Barchart.js'
import axios from 'axios'
import  { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export default function page() {

  const [voters,setVoters] = useState([])

  const getVoters = () => axios.get("https://api.allvotesgh.com/organizer/getVotes").then(res => (setVoters(res.data.voterec), console.log(res.data.voterec)))

  useEffect(()=>{getVoters()},[])

  const data = [
    {
      nomineeName: "John Doe",
      cost: "$500",
      status: "Approved",
      numberOfVotes: 150,
      date: "2024-05-20",
      actions: "Edit/Delete"
    }
  ];

  const [Category, setCategory] = useState([
  ])
  const secretKey = 'your-secret-key';
  const [events,setEvents] = useState([])
const [products, setProducts] = useState([

])
const [organizerid, setOrganizerId] = useState("");
 const filtedNom = products.filter(e=> e.organizerid==organizerid)
  const filtedCat = Category.filter(e=> e.organizerid==organizerid)
const totalVotes = filtedNom.reduce((a,b)=>a+parseInt(b.votes),0)

const getVotersDet = voters.filter(e=> e.organizerid == organizerid)


const getEvent = events.filter(e=> { return e.id==organizerid})
const cost = getEvent[0] && getEvent[0].cost
const TotalRev = totalVotes * cost
const getDecryptedUserDataFromCookie =  () => {
    const encryptedData = Cookies.get('Org_Id');
    if (encryptedData) {
      // Decrypt the encrypted data
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      // Convert the bytes back to a string
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      // Parse the decrypted data (assuming it's JSON)
      return decryptedData;
    } else {
      return null; // Cookie not found or no encrypted data
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


    useEffect(() => {
    axios
      .get("https://api.allvotesgh.com/organizer/nominee")
      .then((response) => {
        setProducts(response.data.nominees[0]);
       console.log(response.data.nominees[0])
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

  }, []);
 useEffect(() => {

    axios
      .get("https://api.allvotesgh.com/organizer")
      .then((response) => {
       setCategory(response.data.events);

      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

      const decryptedData = getDecryptedUserDataFromCookie();
    // Update state with the decrypted data
    setOrganizerId(decryptedData);

  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =10;

  // Calculate total pages
  const totalPages = Math.ceil(getVotersDet.length / itemsPerPage);

  // Calculate the data to be displayed on the current page
  const paginatedData = getVotersDet && getVotersDet.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
<div className="flex flex-col pl-[12rem] pt-[7rem]">
   <div className="flex gap-4 p-4">
      <section className="text-4xl flex flex-col gap-4 bg-[#fc7753] w-[300px] h-[100px] justify-center items-start p-2">
        <h3 className="text-sm">Total Revenue</h3>
        ¢{TotalRev}

      </section>

        <section className="text-4xl flex flex-col gap-4 bg-[#66d7d1] w-[300px] h-[100px] justify-center items-start p-2">
        <h3 className="text-sm">No. of Categories</h3>
        {filtedCat.length}

      </section>

          <section className="text-4xl flex flex-col gap-4 bg-[#403d58] text-white w-[300px] h-[100px] justify-center items-start p-2">
        <h3 className="text-sm">No. of Nominees</h3>
       {filtedNom.length}

      </section>

         <section className="text-4xl flex flex-col gap-4 bg-[#dbd56e]  w-[300px] h-[100px] justify-center items-start p-2">
        <h3 className="text-sm">Total Votes</h3>
       {totalVotes}

      </section>
    </div>

    <table className="table-auto bg-white shadow rounded-lg w-full text-center">
          <thead>
            <tr className="font-bold">
              <th className=" px-4 border-b-2 py-2">Nominee Name</th>
              <th className="px-4 border-b-2 py-2">Cost</th>
              <th className="px-4 border-b-2 py-2">Status</th>
              <th className="px-4 border-b-2 py-2">Number of Votes</th>
              <th className="px-4 border-b-2 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
        {paginatedData.map((item, index) => (
          <tr className='text-sm-100' key={index}>
            <td className="px-4 py-2 border-b">{item.name}</td>
            <td className="px-4 py-2 border-b">GH₵ {item.cost}</td>
            <td className="px-4 py-2 border-b">Approved</td>
            <td className="px-4 py-2 border-b">{item.votes}</td>
            <td className="px-4 py-2 border-b">{item.currentDate} {item.currentTime}</td>
          </tr>
        ))}
      </tbody>
        </table>

        { paginatedData.length >=11 && <div className="flex justify-center my-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>}

</div>


  )
}
