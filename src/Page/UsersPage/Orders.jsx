import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaEllipsisV, FaInfoCircle, FaList, FaThLarge } from "react-icons/fa";
import { useSelector } from "react-redux";

const Orders = () => {
  const [viewMode, setViewMode] = useState('list');
  const userState = useSelector((state) => state.user);
  const user = userState?.userInfo || JSON.parse(localStorage.getItem("userAccount"));

  const { data = [] } = useQuery({
    queryKey: 'customer-orders',
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/customer/orders`, { headers: { Authorization: `Bearer ${user.token}` } });
      return data;
    }
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-2 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <FaThLarge className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <FaList className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="hidden sm:grid sm:grid-cols-4 gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="text-sm font-medium text-gray-500">Order</div>
          <div className="text-sm font-medium text-gray-500">Status</div>
          <div className="text-sm font-medium text-gray-500">Total</div>
          <div className="text-sm font-medium text-gray-500"></div>
        </div>

        {data?.map((order) => (
          <div key={order._id} className="flex flex-col sm:grid sm:grid-cols-4 gap-4 px-4 sm:px-6 py-4 border-b border-gray-200 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img
                  src={order.product.images[0] || "/placeholder.svg"}
                  alt={order.product.name}
                  className="h-12 w-12 rounded-md border-2 border-white object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">#{order._id}</div>
                <div className="text-sm text-gray-500">{order.quantity} items</div>
              </div>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
                {order.status.slice(0, 1).toUpperCase() + order.status.slice(1)}
              </span>
              <span className="ml-2 text-xs sm:text-sm text-gray-500 hidden sm:inline">
                Last updated {new Date(order?.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="text-sm font-medium text-gray-900">৳{order.totalAmount}</span>
              <FaInfoCircle className="ml-2 h-4 w-4 text-gray-400" title="Due" />
            </div>
            <div className="flex items-center justify-end mt-2 sm:mt-0">
              <button className="text-gray-400 hover:text-gray-500">
                <FaEllipsisV className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;