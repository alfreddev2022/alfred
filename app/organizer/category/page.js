"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Input, Button } from "antd";
import { CSVLink } from "react-csv";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import Link from "next/link";
const { TextArea } = Input;




const Page = () => {
  const [products, setProducts] = useState([

])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [image,setImage]= useState("")

  const [formData, setFormData] = useState({

    category: "",

  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const secretKey = 'your-secret-key';

const [organizerid, setOrganizerId] = useState("");
  const reload = async () => {
    axios
      .get("https://api.allvotesgh.com/organizer/nominee")
      .then((response) => {
        setNominee(response.data.nominees[0]);
        setImages(response.data.nominees[1]);

      })
  }
const [nomineeSlug,setNominee] =useState([])
useEffect(() => {
  axios
    .get("https://api.allvotesgh.com/organizer/nominee")
    .then((response) => {
      setNominee(response.data.nominees[0]);
      setImages(response.data.nominees[1]);

    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}, []);

const filtedNom = nomineeSlug.filter(e=> e.organizerid==organizerid)

const nLength = (cName)=>{
const filtN = filtedNom.filter(e=>e.category==cName)
return filtN.length
}
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

  const filteredCat= products.filter((c)=>c.organizerid==organizerid)

  useEffect(() => {

    axios
      .get("https://api.allvotesgh.com/organizer")
      .then((response) => {
        setProducts(response.data.events);

      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

      const decryptedData = getDecryptedUserDataFromCookie();
    // Update state with the decrypted data
    setOrganizerId(decryptedData);

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {

   setImage(e.target.files[0])
  };




const handleAddItem = async () => {
  try {
    // Call the async function to get the decrypted data
    const decryptedData = await getDecryptedUserDataFromCookie();
    // Update state with the decrypted data
    setOrganizerId(decryptedData);

    const eventData = {
      organizerid: decryptedData,
      name: formData.category,
    };

    // Make POST request to add event data
    const response = await axios.post("https://api.allvotesgh.com/organizer", eventData);

    setSuccessModalVisible(true);
  } catch (error) {
    console.error("Error adding event:", error);
    setErrorModalVisible(true);
  }
};

  const handleDelete =  (id) => {
    Modal.confirm({
      title: "Confirmation",
      content: "Are you sure you want to delete this event?",
      onOk() {
     axios
       .delete(`https://api.allvotesgh.com/organizer/${id}`)
          .then((response) => {

            setProducts(filteredCat.filter((product) => product.id !== id));
            setSuccessModalVisible(true);
            reload()
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
    axios
      .put(`https://api.allvotesgh.com/organizer/${formData.id}`, { name: formData.category })
      .then((response) => {

        setEditModalOpen(false);
        setSuccessModalVisible(true);
      })
      .catch((error) => {
        console.error("Error editing product:", error);
        setErrorModalVisible(true);
      });
    reload()
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
  const currentProducts = filteredCat && filteredCat.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 pl-[12rem] pt-[7rem]">
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
              Add Category
            </Button>
            <CSVLink
              data={filteredCat}
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
              <th className="px-4 border-b-2 py-2">Category Name</th>
              <th className="px-4 border-b-2 py-2">No. of Nominees</th>
              <th className="px-4 border-b-2 py-2">RESULTS</th>
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
                <td className="px-4 py-2">{nLength(product.name)}</td>
                <td className="px-4 py-2">
                  <Link href={`/result/${product.name},${product.organizerid}`}>
                    <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                    RESULTS
                    </button>
                    </Link>
                    </td>
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
        {filteredCat.length >= 10 && <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(filteredCat.length / productsPerPage)).keys()].map(
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
        </div>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-[50%]">
            <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
            <input
              type="text"
              name="category"
              placeholder="Category Name"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.eventName}
              onChange={handleInputChange}
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
          name="category"
          placeholder="Category Name"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          value={formData.category}
          onChange={handleInputChange}
        />


      </Modal>

      <Modal
        title="Success"
        visible={successModalVisible}
        onOk={() => setSuccessModalVisible(false)}
        onCancel={() => setSuccessModalVisible(false)}
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
