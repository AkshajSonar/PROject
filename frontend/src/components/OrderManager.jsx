import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
  const token = localStorage.getItem("token");

  axios.get('http://localhost:8000/api/v1/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Optional: Only if you use cookies alongside JWT
  })
    .then(res => setOrders(res.data.data))
    .catch(err => console.error(err));
};

useEffect(() => { fetchOrders(); }, []);

const updateStatus = async (id, status) => {
  const token = localStorage.getItem("token");

  await axios.put(
    `http://localhost:8000/api/v1/orders/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  )
    .then(() => fetchOrders())
    .catch(err => console.error(err));
};

const deleteOrder = async (id) => {
  const token = localStorage.getItem("token");

  await axios.delete(`http://localhost:8000/api/v1/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
    .then(() => fetchOrders())
    .catch(err => console.error(err));
};


  return (
    <div className="space-y-4 p-4">
      {orders.map(order => (
        <div key={order._id} className="p-4 border rounded-xl shadow bg-white">
          <p>User: {order.user?.fullName}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <div className="flex gap-2 mt-2">
            {["pending", "shipped", "delivered", "cancelled"].map(status => (
              <button key={status} onClick={() => updateStatus(order._id, status)} className="text-blue-600 underline">{status}</button>
            ))}
            <button onClick={() => deleteOrder(order._id)} className="text-red-600 underline">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderManager;
