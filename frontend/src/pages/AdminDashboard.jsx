import React from 'react';
import AdminProductList from '../components/AdminProductList';
import AddProductForm from '../components/AddProductForm';
import OrderManager from '../components/OrderManager';

const AdminDashboard = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
        <AddProductForm />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">All Products</h2>
        <AdminProductList />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Manage Orders</h2>
        <OrderManager />
      </section>
    </div>
  );
};

export default AdminDashboard;
