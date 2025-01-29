import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { use } from 'react';
import { useSelector } from 'react-redux';

const AllOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const userState = useSelector((state) => state.user);
    const user = userState?.userInfo || JSON.parse(localStorage.getItem("userAccount"));
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders`, {headers: {Authorization: `Bearer ${user.token}`}});
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);
  if (loading) return <div className="text-center py-4">Loading orders...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Customer Name</th>
             
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order.orderId}</td>
                <td className="py-2 px-4 border-b">{order.shippingAddress.name}</td>
               
                <td className="py-2 px-4 border-b">{order.quantity}</td>
                <td className="py-2 px-4 border-b"> ৳{order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <Link 
                    to={`/admin/orders/${order._id}`} 
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrdersPage;