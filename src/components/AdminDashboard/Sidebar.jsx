import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiPlusCircle, FiPackage, FiShoppingCart, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { MdOutlineCategory, MdOutlineRateReview } from 'react-icons/md';
import { logout } from '../../store/actions/userLogout';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { RiDashboardLine } from 'react-icons/ri';
import { TbBrandBebo } from "react-icons/tb";
import { PiFlagBannerFill } from 'react-icons/pi';
// Placeholder components for each route


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    try{
      dispatch(logout());
      toast.success('Logout Successfully');
      navigate('/page/login');

    } catch (error) {
      toast.error('Something went wrong');
    }
    
  }
  return (
    <div className={`bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-0 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="p-4 ">
        <div className='flex items-center mb-8'>
        <Link to="/" className="text-2xl font-bold ">Scent Zone</Link>
        </div>
        <nav className="space-y-1">
          <NavLink to="/admin" className={({ isActive }) => `flex items-center py-2 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <RiDashboardLine className="mr-3" /> Dashboard
          </NavLink>
          <NavLink to="/admin/add-product" className={({ isActive }) => `flex items-center py-2 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <FiPlusCircle className="mr-3" /> Add Product
          </NavLink>
          <NavLink to="/admin/all-products" className={({ isActive }) => `flex items-center py-2 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <FiPackage className="mr-3" /> All Products
          </NavLink>
          <NavLink to="/admin/all-orders" className={({ isActive }) => `flex items-center py-2 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <FiShoppingCart className="mr-3" /> All Orders
          </NavLink>
          <NavLink to="/admin/category" className={({ isActive }) => `flex items-center py-2 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <MdOutlineCategory className="mr-3" /> Category
          </NavLink>
          <NavLink to="/admin/brand" className={({ isActive }) => `flex items-center py-2 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <TbBrandBebo className="mr-3" /> Brand
          </NavLink>
          <NavLink to="/admin/aroma" className={({ isActive }) => `flex items-center py-2 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <MdOutlineCategory className="mr-3" /> Aroma Management
          </NavLink>
          <NavLink to="/admin/reviews" className={({ isActive }) => `flex items-center py-2 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <MdOutlineRateReview className="mr-3" /> Review Management
          </NavLink>
          <NavLink to="/admin/banner" className={({ isActive }) => `flex items-center py-2 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <PiFlagBannerFill  className="mr-3" /> Banner Management
          </NavLink>
        </nav>
      </div>
      <button onClick={handleLogout} className="absolute bottom-4 left-4 flex items-center py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200">
        <FiLogOut  className="mr-3" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;