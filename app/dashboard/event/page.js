"use client";
import React, { useState, useEffect,useContext } from "react";
// import axios from "axios";
import { Modal, Input, Button } from "antd";
import { CSVLink } from "react-csv";
import MyContext from "../../Context/Context.js"
const { TextArea } = Input;
import dynamic from 'next/dynamic'

import axios from 'axios'

const Page = () => {
    
  const [products, setProducts] = useState([])

 const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({name:"",
            date:"",
            expired:"",
            cost:"",
            owner:"",
            ownerpassword:"",

  });
  const [image,setImage]= useState("")
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    // Fetch products data from the server
    axios
      .get("https://rt2l8xpl-3004.uks1.devtunnels.ms/admin/events")
      .then((response) => {
        setProducts(response.data.events[0]);
        setEvents(response.data.events[0])
       console.log(response.data.events)
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

 
  };

  const handleFileChange = async(e) => {
   
   
  await setImage(e.target.files[0])
console.log(image)
 

  };


  const handleAddItem = async () => {

    if (
      !formData.name ||
      !formData.date ||
      !formData.expired ||
      !formData.cost ||
      !formData.owner ||
      !formData.ownerpassword ||
      !image
    ) {
      Modal.error({
        title: 'Error',
        content: 'All fields are required',
      });
      return;
    }
    try {
      // Create form data object
      const eventData = {
        name: formData.name || "",
        date: formData.date || "",
        expired: formData.expired || "",
        cost: formData.cost || "",
        owner: formData.owner || "",
        ownerpassword: formData.ownerpassword || "",
      };

      // Make POST request to add event data
      const response = await axios.post("http://localhost:3004/admin/events", eventData);

      const formdata = new FormData();

      // Append the image file to the FormData object
      formdata.append('image', image);
     

     

      // Make a POST request to upload file data using FormData
      const filesend = await axios.post('http://localhost:3004/admin/file', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
      });

      console.log("Event added successfully:");
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Error adding event:", error);
      setErrorModalVisible(true);
    }

    // Reset form data and close modal
    setIsModalOpen(false);
    setFormData({
      name: "",
      date: "",
      expired: "",
      cost: "",
      owner: "",
      ownerpassword: "",
      image: null,
    });
  };



  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirmation",
      content: "Are you sure you want to delete this event?",
      onOk() {
        axios
          .delete(`http://localhost:3004/admin/events/${id}`)
          .then((response) => {
      
            setProducts(products.filter((product) => product.id !== id));
            setSuccessModalVisible(true);
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            setErrorModalVisible(true);
          });
      },
    });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    setIsLoading(true)
    axios
      .put(`http://localhost:3004/admin/events/${formData.id}`, formData)
      .then((response) => {
     
        setEditModalOpen(false);
        setSuccessModalVisible(true);
         setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error editing product:", error);
        setErrorModalVisible(true);
         setIsLoading(false)
      });
  };

  const handleImportCSV = () => {
    // Handle CSV import logic here
  };

  const handleExportCSV = () => {
    // Handle CSV export logic here
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 pl-[12rem] pt-[7rem] ">
      <div className="container mx-auto">
      
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label className="mr-2">Filter by Category:</label>
            <select
              className="p-2 outline-none"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="All">All</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-blue-500 hover:bg-blue-700  flex justify-center items-center text-white font-bold py-2 px-4 rounded "
              onClick={() => setIsModalOpen(true)}
            >
              Add Item
            </Button>
           
            <CSVLink
              data={products}
              filename={"products.csv"}
              className="bg-yellow-500 flex justify-center items-center hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded "
              onClick={handleExportCSV}
            >
              Export CSV
            </CSVLink>
          </div>
        </div>
        <table className="table-auto bg-white shadow rounded-lg w-[84vw] text-center">
          <thead>
            <tr>
              <th className="px-4 border-b-2 py-2">id</th>
              <th className="px-4 border-b-2 py-2">Event Name</th>
              <th className="px-4 border-b-2 py-2">Date</th>
              <th className="px-4 border-b-2 py-2">Expired Date</th>
              <th className="px-4 border-b-2 py-2">Cost</th>
              <th className="px-4 border-b-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr
                key={product.id}
                className={`${
                  product.id % 2 !== 0 ? "bg-[#F2EFEA]" : ""
                } text-sm`}
              >
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.date}</td>
                <td className="px-4 py-2">{product.expired}</td>
                <td className="px-4 py-2">¢{product.cost}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {currentProducts.length>=9 && [...Array(Math.ceil(products.length / productsPerPage)).keys()].map(
            (number) => (
              <button
                key={number + 1}
                className="mx-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-[50%]">
            <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
            
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="date"
              placeholder="Date"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="expired"
              placeholder="Expired Date"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.expired}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cost"
              placeholder="Cost"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.cost}
              onChange={handleInputChange}
            />


  <input
              type="text"
              name="owner"
              placeholder="Organizer Email"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.owner}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="ownerpassword"
              placeholder="organizer password"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.ownerpassword}
              onChange={handleInputChange}
            />



            <input
              type="file"
              name="image"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              onChange={handleFileChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleAddItem}
            >
              Add
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}


      <Modal
        title="Edit Event"
        visible={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onOk={handleEditSubmit}
      >
       <input
              type="text"
              name="name"
              placeholder="Event Name"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="date"
              placeholder="Date"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="expired"
              placeholder="Expired Date"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.expired}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cost"
              placeholder="Cost"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.cost}
              onChange={handleInputChange}
            />


        <input type="file" onChange={handleFileChange} />
      </Modal>

      <Modal
        title="Success"
        visible={successModalVisible}
        onOk={() => setSuccessModalVisible(false)}
        onCancel={() => setSuccessModalVisible(false)}
        okButtonProps={{ disabled: isLoading }}
      >
        <p>Event added successfully!</p>
      </Modal>
      <Modal
        title="Error"
        visible={errorModalVisible}
        onOk={() => setErrorModalVisible(false)}
        onCancel={() => setErrorModalVisible(false)}
      >
        <p>Error adding Event. Please try again later.</p>
      </Modal>
    </div>
  );
};

export default Page;
