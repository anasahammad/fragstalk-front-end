import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiTrash2, FiPackage, FiCreditCard } from 'react-icons/fi';
import { useSelector } from 'react-redux';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const userState = useSelector((state) => state.user);
  const user = userState?.userInfo || JSON.parse(localStorage.getItem("userAccount") || '{}');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, user.token]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdatingStatus(true);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/orders/${id}/status`, {
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrder(response.data);
    } catch (err) {
      setError('Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/admin/orders/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        navigate('/admin/all-orders');
      } catch (err) {
        setDeleteError('Failed to delete order');
      }
    }
  };

  if (loading) return <div className="text-center py-4">Loading order details...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!order) return <div className="text-center py-4">Order not found</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Order Details</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center flex-wrap">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Order ID: {order.orderId}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center mt-4 sm:mt-0">
            <select
              value={order.status}
              onChange={handleStatusChange}
              disabled={updatingStatus}
              className="mr-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {(order.status === 'delivered' || order.status === 'cancelled') && (
              <button
                onClick={handleDeleteOrder}
                className="flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FiTrash2 size={20} />
                Delete Order
              </button>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Customer Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.shippingAddress.name}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.shippingAddress.city}, {order.shippingAddress.zipCode}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.shippingAddress.phone}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.shippingAddress.company}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">৳{order.totalAmount.toFixed(2)}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="capitalize">{order.paymentMethod}</span>
              </dd>
            </div>
            {(order.paymentMethod === 'bkash' || order.paymentMethod === 'nagad') && (
              <>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Transaction ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.payment.transactionId}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Payment Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.payment.phone}</dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Ordered Products</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {order.product.map((item) => (
            <li key={item._id} className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 flex-wrap sm:flex-nowrap">
                <div className="flex-shrink-0">
                  <img 
                    src={item.images[0] || "/placeholder.svg?height=96&width=96"} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.qty ? item.qty : 1}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ৳{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm font-medium text-gray-900">
                  ৳{((item.qty ? item.qty : 1) * item.price).toFixed(2)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {deleteError && (
        <div className="mt-4 text-red-600 text-center">{deleteError}</div>
      )}
    </div>
  );
}