// import React from 'react';
// import AdminProductList from '../components/AdminProductList';
// import AddProductForm from '../components/AddProductForm';
// import OrderManager from '../components/OrderManager';

// const AdminDashboard = () => {
//   return (
//     <div className="p-4 space-y-6">
//       <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

//       <section>
//         <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
//         <AddProductForm />
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-2">All Products</h2>
//         <AdminProductList />
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-2">Manage Orders</h2>
//         <OrderManager />
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;



import React from "react";
import AdminProductList from "../components/AdminProductList";
import AddProductForm from "../components/AddProductForm";
import OrderManager from "../components/OrderManager";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="p-4 max-w-5xl mx-auto space-y-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Product</h2>
          <AddProductForm />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">All Products</h2>
          <AdminProductList />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Orders</h2>
          <OrderManager />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
