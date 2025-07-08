import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProduct from './EditProduct';
import { useNavigate } from "react-router-dom";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const fetchData = () => {
  const token = localStorage.getItem("token");

  axios.get('http://localhost:8000/api/v1/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Only if your backend uses cookies as well
  })
    .then(res => {
      console.log("Products response", res.data);
      setProducts(res.data?.data || []);
    })
    .catch(err => console.error(err));
};


  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("token");
  if (!token) return alert("Not authorized.");

  try {
    await axios.delete(`http://localhost:8000/api/v1/products/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    fetchData();
  } catch (err) {
    console.error("Delete error:", err);
  }
};

  const handleUpdate = (id) => {
    navigate(`/products/edit/${id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => setSelectedProduct(product)}
            className="border p-4 rounded-xl shadow bg-white cursor-pointer hover:shadow-md transition"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-contain rounded mb-2"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>₹{product.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal from opening on delete click
                handleDelete(product._id);
              }}
              className="mt-2 text-red-600 hover:underline"
            >
              Delete
            </button>
             <button onClick={(e) => {
              e.stopPropagation();
              handleUpdate(product._id)}}>Update</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              ✖
            </button>
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-full h-64 object-contain mb-4"
            />
            <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
            <p className="text-gray-700 font-medium mt-2">₹{selectedProduct.price}</p>
            <p className="text-sm text-gray-600 mt-2">{selectedProduct.description}</p>
            <p className="text-xs text-gray-500 mt-1">Category: {selectedProduct.category}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductList;
