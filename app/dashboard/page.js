'use client'
import React, {useState,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment-timezone'
import Barchart from '../components/Barchart.js'
export default function page() {

  const [voters,setVoters] = useState([])

  const getVoters = () => axios.get("https://4178h52b-3004.euw.devtunnels.ms/organizer/getVotes").then(res => (setVoters(res.data.voterec), console.log(res.data.voterec)))

  useEffect(()=>{getVoters()},[])

  const [products,setProducts] = useState([])
  const [eventData,setEvents] = useState([])
  const [exEventData,setExevent] = useState([])
  const [acEventData, setAcevent] = useState([])
  const [financeData,setFinancedat] =useState([])
  const currentDate = moment().format('YYYY-MM-DD');
  const expiredEvent = eventData.filter(e=>moment(currentDate).isAfter(e.expired));
  const presentEvent = eventData.filter(e=>moment(currentDate).isBefore(e.expired));
  console.log(presentEvent)


  useEffect(() => {
    // Fetch products data from the server
    axios
      .get("https://4178h52b-3004.euw.devtunnels.ms/admin/events")
      .then((response) => {
        setProducts(response.data.events[0]);
        setEvents(response.data.events[0])
       console.log(response.data.events)
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const totalEvent = eventData.length
  const totalExpired = expiredEvent.length
  const totalActive = presentEvent.length
  const totalProfit = voters.reduce((a,b)=>{return a + parseFloat(b.cost);
  },0)

  console.log(totalProfit)

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =10;

  // Calculate total pages
  const totalPages = Math.ceil(voters.length / itemsPerPage);

  // Calculate the data to be displayed on the current page
  const paginatedData = voters && voters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (

<div className="flex flex-col p-4 pl-[12rem] pt-[7rem]">
   <div className="flex gap-4 p-4">
      <section className="text-4xl flex flex-col gap-4 bg-[#fc7753] w-[300px] h-[100px] justify-center items-start p-2">
        <h3 className="text-sm">Profit</h3>
          ¢{totalProfit}
      </section>

        <section className="text-4xl flex flex-col gap-4 bg-[#66d7d1] w-[300px] h-[100px] justify-center items-start p-2">
        <h3 className="text-sm">Events</h3>
          {totalEvent}
      </section>

          <section className="text-4xl flex flex-col gap-4 bg-[#403d58] text-white w-[300px] h-[100px] justify-center items-start p-2">
        <h3 className="text-sm">Active Events</h3>
        {totalActive}

      </section>

         <section className="text-4xl flex flex-col gap-4 bg-[#dbd56e]  w-[300px] h-[100px] justify-center items-start p-2">
        <h3 className="text-sm">Expired Events</h3>
        {totalExpired}

      </section>
    </div>

    <table className="table-auto bg-white shadow rounded-lg w-full text-center">
          <thead>
            <tr>
              <th className="px-4 border-b-2 py-2">Nominee Name</th>
              <th className="px-4 border-b-2 py-2">Cost</th>
              <th className="px-4 border-b-2 py-2">Status</th>
              <th className="px-4 border-b-2 py-2">Number of Votes</th>
              <th className="px-4 border-b-2 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
        {paginatedData.map((item, index) => (
          <tr className='text-sm-400' key={index}>
            <td className="px-4 py-2 border-b">{item.name}</td>
            <td className="px-4 py-2 border-b">GH₵ {item.cost}</td>
            <td className="px-4 py-2 border-b">Approved</td>
            <td className="px-4 py-2 border-b">{item.votes}</td>
            <td className="px-4 py-2 border-b">{item.currentDate} {item.currentTime}</td>
          </tr>
        ))}
      </tbody>
        </table>

       {paginatedData.length >= 11 && <div className="flex justify-center my-4">
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
