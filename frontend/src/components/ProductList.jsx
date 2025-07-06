import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get('http://localhost:8000/api/v1/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Optional: Only if your backend uses cookies
  })
    .then(res => setProducts(res.data.data))
    .catch(err => console.error(err));
}, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {products.map(product => (
        <div key={product._id} className="border rounded-xl p-4 shadow bg-white">
          <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-2" />
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="text-green-700 font-semibold">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
