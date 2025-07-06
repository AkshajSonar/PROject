import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get('http://localhost:8000/api/v1/orders/myorders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Optional, if your backend uses cookies too
  })
    .then(res => setOrders(res.data.data))
    .catch(err => console.error(err));
}, []);


  return (
    <div className="p-4 space-y-4">
      {orders.map(order => (
        <div key={order._id} className="border p-4 rounded-xl bg-white shadow">
          <p className="font-semibold">Status: <span className="capitalize">{order.status}</span></p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Address: {order.shippingAddress}</p>
          <ul className="list-disc ml-4 text-sm mt-2">
            {order.products.map(p => (
              <li key={p.product._id}>{p.product.name} × {p.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
