"use client";
import React, { useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const Wallet = () => {
  // Sample transaction data
  const [transactions, setTransactions] = useState([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Form state
  const [receiverAccNumber, setReceiverAccNumber] = useState("");
  const [amount, setAmount] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  // Function to confirm sending money
  const handleConfirmSend = () => {
    // Assuming you have a function to send money
    sendMoney(receiverAccNumber, amount);
    // After sending money, update transactions list
    setTransactions([
      ...transactions,
      {
        receiverAccNumber,
        amount,
        date: new Date(),
        name: "Admin",
        transactionId: generateTransactionId(),
        status: "Success",
      },
    ]);
    // Close modal and clear form fields
    setShowModal(false);
    setReceiverAccNumber("");
    setAmount("");
    setShowConfirmDialog(false);
  };

  // Function to generate a random transaction ID (for demonstration purposes)
  const generateTransactionId = () => {
    return Math.random().toString(36).substring(7);
  };

  // Function to send money (for demonstration purposes)
  const sendMoney = (receiverAccNumber, amount) => {
    // Here you can implement your logic to send money
    console.log(`Sent $${amount} to account number ${receiverAccNumber}`);
  };

  // Calculate total money, used money, and money left
  const totalMoney = transactions.reduce(
    (total, transaction) => total + parseFloat(transaction.amount),
    0
  );
  const usedMoney = totalMoney; // Placeholder logic, you may need to implement actual logic here
  const moneyLeft = totalMoney - usedMoney;

  return (
    <div className="container p-4">
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 absolute right-20"
        >
          Send Money
        </button>
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/2">
              <h2 className="text-lg font-semibold mb-4">Send Money</h2>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                  type="text"
                  id="receiverAccNumber"
                  name="receiverAccNumber"
                  value={receiverAccNumber}
                  onChange={(e) => setReceiverAccNumber(e.target.value)}
                  placeholder="Receiver Account Number"
                  className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none"
                />
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none"
                  >
                    Send Money
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showConfirmDialog && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/4">
              <p className="text-lg font-semibold mb-4">
                Confirm sending ${amount} to account number {receiverAccNumber}?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleConfirmSend}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md focus:outline-none ml-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-6">Wallet</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded my-6 p-6 flex flex-col items-center justify-center">
          <AiFillDollarCircle className="text-5xl text-green-500 mb-2" />
          <h2 className="text-lg font-semibold mb-2">Total Money</h2>
          <div>${totalMoney}</div>
        </div>
        <div className="bg-white shadow-md rounded my-6 p-6 flex flex-col items-center justify-center">
          <FaRegMoneyBillAlt className="text-5xl text-red-500 mb-2" />
          <h2 className="text-lg font-semibold mb-2">Used Money</h2>
          <div>${usedMoney}</div>
        </div>
        <div className="bg-white shadow-md rounded my-6 p-6 flex flex-col items-center justify-center">
          <FaRegMoneyBillAlt className="text-5xl text-blue-500 mb-2" />
          <h2 className="text-lg font-semibold mb-2">Money Left</h2>
          <div>${moneyLeft}</div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded my-6 p-6">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Receiver Acc Number</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Transaction ID</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {transaction.receiverAccNumber}
                </td>
                <td className="py-3 px-6 text-left">${transaction.amount}</td>
                <td className="py-3 px-6 text-left">
                  {transaction.date.toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">{transaction.name}</td>
                <td className="py-3 px-6 text-left">
                  {transaction.transactionId}
                </td>
                <td className="py-3 px-6 text-left">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wallet;
