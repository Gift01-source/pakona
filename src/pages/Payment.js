import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/payments', {
        amount,
      });
      setPaymentStatus(response.data.message);
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus('Payment failed');
    }
  };

  return (
    <div>
      <h1>Make a Payment</h1>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Payment;