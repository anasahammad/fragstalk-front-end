import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "../components/AdminDashboard/Sidebar";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
          <button className="lg:hidden text-gray-600 focus:outline-none" onClick={toggleSidebar}>
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">Welcome, Admin!</h2>
          <div className="lg:hidden">
            <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <div className="bg-white rounded-lg shadow-lg p-2 sm:p-6 min-h-[calc(100vh-8rem)]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-0 right-0 -z-10 w-1/2 h-1/2 max-w-md max-h-md bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="fixed top-0 -right-4 -z-10 w-1/2 h-1/2 max-w-md max-h-md bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="fixed -bottom-8 left-20 -z-10 w-1/2 h-1/2 max-w-md max-h-md bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default AdminDashboard;