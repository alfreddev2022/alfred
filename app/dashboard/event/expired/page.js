"use client";
import React, { useState, useEffect,useContext } from "react";
// import axios from "axios";
import { Modal, Input, Button } from "antd";
import { CSVLink } from "react-csv";
import MyContext from "../../../Context/Context.js"
const { TextArea } = Input;
import moment from 'moment-timezone';

import axios from "axios"
const Page = () => {
  const [events,setEvents] = useState([])
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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
        setEvents(response.data.events[0])
       console.log(response.data.events)
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const currentDate = moment().format('YYYY-MM-DD');
  const products = events.filter(e=>moment(currentDate).isAfter(e.expired));
  console.log(products)

 

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirmation",
      content: "Are you sure you want to delete this product?",
      onOk() {
        axios
          .delete(`https://rt2l8xpl-3004.uks1.devtunnels.ms/admin/events/${id}`)
          .then((response) => {
            console.log("Product deleted successfully:", response.data);
          
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
    // axios
    //   .put(`http://localhost:3010/product/${formData.id}`, formData)
    //   .then((response) => {
    //     console.log("Product edited successfully:", response.data);
    //     setEditModalOpen(false);
    //     setSuccessModalVisible(true);
    //   })
    //   .catch((error) => {
    //     console.error("Error editing product:", error);
    //     setErrorModalVisible(true);
    //   });
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
        
          <div className="flex gap-2">
          
          
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
          {currentProducts.length >= 9 && products && [...Array(Math.ceil( products.length / productsPerPage)).keys()].map(
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
