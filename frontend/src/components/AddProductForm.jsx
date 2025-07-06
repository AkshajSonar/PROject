import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [form, setForm] = useState({ name: '', price: '', stock: '', description: '', category: '' });
  const [image, setImage] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  const data = new FormData();
  Object.entries(form).forEach(([key, val]) => data.append(key, val));
  data.append("imageUrl", image);

  const token = localStorage.getItem("token"); // Must be stored during login

  try {
    await axios.post("http://localhost:8000/api/v1/products", data, {
      headers: {
        Authorization: `Bearer ${token}`, // This is important
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Optional: only if you're using cookies too
    });

    alert("Product added");
    setForm({ name: '', price: '', stock: '', description: '', category: '' });
    setImage(null);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 bg-white rounded-xl shadow max-w-md mx-auto">
      {["name", "price", "stock", "description", "category"].map(field => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full border p-2 rounded"
        />
      ))}
      <input type="file" onChange={e => setImage(e.target.files[0])} className="w-full" />
      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Add Product</button>
    </form>
  );
};

export default AddProductForm;
