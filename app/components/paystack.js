// components/PaystackPayment.js
import React from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackPayment = ({ amount, email, onSuccess, onClose }) => {
       const config = {
              reference: (new Date()).getTime().toString(),
              email,
              amount: amount * 100, // Convert amount to kobo
              publicKey: 'pk_test_abc8e30b8010cc2ac5caff9662ead863030d3d5f',

       };

       return (

              <div className='bg-[orangered] text-white px-10 py-2'>
                     <PaystackButton
                            {...config}
                            text="Vote Now"
                            onSuccess={onSuccess}
                            currency="GHS"
                            onClose={onClose}
                     /> </div>

       );
};

export default PaystackPayment;