import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FiUsers, FiShoppingCart, FiPackage, FiBarChart } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userState = useSelector((state) => state.user);
  const user = userState?.userInfo?.user || JSON.parse(localStorage.getItem('userAccount'));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`);
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading dashboard data...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  const chartData = {
    labels: ['Users', 'Orders', 'Products'],
    datasets: [
      {
        label: 'Total Count',
        data: [dashboardData.totalUsers, dashboardData.totalOrders, dashboardData.totalProducts],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dashboard Overview',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Users"
          value={dashboardData.totalUsers}
          icon={<FiUsers className="w-8 h-8 text-blue-500" />}
          color="bg-blue-100"
        />
        <DashboardCard
          title="Total Orders"
          value={dashboardData.totalOrders}
          icon={<FiShoppingCart className="w-8 h-8 text-green-500" />}
          color="bg-green-100"
        />
        <DashboardCard
          title="Total Products"
          value={dashboardData.totalProducts}
          icon={<FiPackage className="w-8 h-8 text-yellow-500" />}
          color="bg-yellow-100"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FiBarChart className="mr-2" />
          Overview Chart
        </h2>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link to={`/admin/orders/${order._id}`} className='hover:underline cursor-pointer'>{order.orderId}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.shippingAddress.name }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-lg shadow-md p-6 flex items-center`}>
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminDashboardPage;
