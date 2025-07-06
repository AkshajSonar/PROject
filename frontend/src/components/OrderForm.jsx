import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');

  useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get('http://localhost:8000/api/v1/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Optional, only if you're using cookies
  })
    .then(res => setProducts(res.data.data))
    .catch(err => console.error(err));
}, []);


  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token"); // Get token from localStorage

  await axios.post(
    'http://localhost:8000/api/v1/orders/createOrder',
    {
      products: [{ product: selected, quantity }],
      shippingAddress: address,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Optional: only if cookies are used too
    }
  )
    .then(() => {
      alert("Order placed!");
      setSelected('');
      setQuantity(1);
      setAddress('');
    })
    .catch(err => console.error(err));
};


  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4 bg-white rounded-xl shadow">
      <select value={selected} onChange={e => setSelected(e.target.value)} className="w-full border p-2 rounded">
        <option value="">Select a product</option>
        {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>
      <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full border p-2 rounded" placeholder="Quantity" />
      <textarea value={address} onChange={e => setAddress(e.target.value)} className="w-full border p-2 rounded" placeholder="Shipping Address" />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Place Order</button>
    </form>
  );
};

export default OrderForm;
