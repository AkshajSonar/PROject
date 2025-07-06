import React from 'react';
import ProductList from '../components/ProductList';
import OrderForm from '../components/OrderForm';
import MyOrders from '../components/MyOrders';

const UserDashboard = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">User Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Available Products</h2>
        <ProductList />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Place an Order</h2>
        <OrderForm />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">My Orders</h2>
        <MyOrders />
      </section>
    </div>
  );
};

export default UserDashboard;
