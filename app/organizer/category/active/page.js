"use client";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Modal, Input, Button } from "antd";
import { CSVLink } from "react-csv";

const { TextArea } = Input;

const dummyData = [
  {
    id: 1,
    eventName: "Event A",
    date: "2024-04-05",
    expiredDate: "2024-04-10",
    cost: "$50",
    actions: <button>Edit</button>,
  },
  {
    id: 2,
    eventName: "Event B",
    date: "2024-04-10",
    expiredDate: "2024-04-15",
    cost: "$75",
    actions: <button>Edit</button>,
  },
  {
    id: 3,
    eventName: "Event C",
    date: "2024-04-15",
    expiredDate: "2024-04-20",
    cost: "$100",
    actions: <button>Edit</button>,
  },
  {
    id: 4,
    eventName: "Event D",
    date: "2024-04-20",
    expiredDate: "2024-04-25",
    cost: "$120",
    actions: <button>Edit</button>,
  },
  {
    id: 5,
    eventName: "Event E",
    date: "2024-04-25",
    expiredDate: "2024-04-30",
    cost: "$80",
    actions: <button>Edit</button>,
  },
  {
    id: 6,
    eventName: "Event F",
    date: "2024-04-30",
    expiredDate: "2024-05-05",
    cost: "$90",
    actions: <button>Edit</button>,
  },
  {
    id: 7,
    eventName: "Event G",
    date: "2024-05-05",
    expiredDate: "2024-05-10",
    cost: "$110",
    actions: <button>Edit</button>,
  },
  {
    id: 8,
    eventName: "Event H",
    date: "2024-05-10",
    expiredDate: "2024-05-15",
    cost: "$70",
    actions: <button>Edit</button>,
  },
  {
    id: 9,
    eventName: "Event I",
    date: "2024-05-15",
    expiredDate: "2024-05-20",
    cost: "$130",
    actions: <button>Edit</button>,
  },
  {
    id: 10,
    eventName: "Event J",
    date: "2024-05-20",
    expiredDate: "2024-05-25",
    cost: "$95",
    actions: <button>Edit</button>,
  },
];


const Page = () => {
  const [products, setProducts] = useState([
  {
    id: 1,
    eventName: "Event A",
    date: "2024-04-05",
    expiredDate: "2024-04-10",
    cost: "50",

  },
  {
    id: 2,
    eventName: "Event B",
    date: "2024-04-10",
    expiredDate: "2024-04-15",
    cost: "75",
  
  },
  {
    id: 3,
    eventName: "Event C",
    date: "2024-04-15",
    expiredDate: "2024-04-20",
    cost: "100",
  
  },
  {
    id: 4,
    eventName: "Event D",
    date: "2024-04-20",
    expiredDate: "2024-04-25",
    cost: "120",
   
  },
  {
    id: 5,
    eventName: "Event E",
    date: "2024-04-25",
    expiredDate: "2024-04-30",
    cost: "80",
  
  },
  {
    id: 6,
    eventName: "Event F",
    date: "2024-04-30",
    expiredDate: "2024-05-05",
    cost: "90",

  },
  {
    id: 7,
    eventName: "Event G",
    date: "2024-05-05",
    expiredDate: "2024-05-10",
    cost: "110",
 
  },
  {
    id: 8,
    eventName: "Event H",
    date: "2024-05-10",
    expiredDate: "2024-05-15",
    cost: "70",
   
  },
  {
    id: 9,
    eventName: "Event I",
    date: "2024-05-15",
    expiredDate: "2024-05-20",
    cost: "130",
   
  },
  {
    id: 10,
    eventName: "Event J",
    date: "2024-05-20",
    expiredDate: "2024-05-25",
    cost: "95",
   
  }
])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3010/product")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleAddItem = () => {
    const requestData = {
      name: formData.name,
      category: formData.category,
      price: formData.price,
      description: formData.description,
      image: formData.image,
    };

    // axios
    //   .post("http://localhost:3010/product", requestData)
    //   .then((response) => {
    //     console.log("Product added successfully:", response.data);
    //     setSuccessModalVisible(true);
    //   })
    //   .catch((error) => {
    //     console.error("Error adding product:", error);
    //     setErrorModalVisible(true);
    //   });

    setIsModalOpen(false);
    setFormData({
      name: "",
      category: "",
      price: "",
      description: "",
      image: null,
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirmation",
      content: "Are you sure you want to delete this product?",
      onOk() {
        // axios
        //   .delete(`http://localhost:3010/product/${id}`)
        //   .then((response) => {
        //     console.log("Product deleted successfully:", response.data);
        //     setProducts(products.filter((product) => product.id !== id));
        //     setSuccessModalVisible(true);
        //   })
        //   .catch((error) => {
        //     console.error("Error deleting product:", error);
        //     setErrorModalVisible(true);
        //   });
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
    <div className="p-4">
      <div className="container mx-auto">
      
        <div className="mb-4 flex justify-between items-center">
         
          <div className="flex gap-2">
          
           
            <CSVLink
              data={products}
              filename={"products.csv"}
              className="bg-orange-500 flex justify-center items-center hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded "
              onClick={handleExportCSV}
            >
              Export CSV
            </CSVLink>
          </div>
        </div>
        <table className="table-auto bg-white shadow rounded-lg w-full text-center">
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
                <td className="px-4 py-2">{product.eventName}</td>
                <td className="px-4 py-2">{product.date}</td>
                <td className="px-4 py-2">{product.expiredDate}</td>
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
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(
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
              name="eventName"
              placeholder="Event Name"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.eventName}
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
              name="expiredDate"
              placeholder="Expired Date"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={formData.expiredDate}
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
        <Input
          placeholder="Event Name"
          name="eventName"
          value={formData.eventName}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Expired Date"
          name="expiredDate"
          value={formData.expiredDate}
          onChange={handleInputChange}
        />
        <Input
          type="number"
          placeholder="Cost"
          name="cost"
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
