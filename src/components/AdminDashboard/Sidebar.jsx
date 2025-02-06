import React, { useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiPlusCircle, FiPackage, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { MdOutlineCategory, MdOutlineRateReview } from 'react-icons/md';
import { logout } from '../../store/actions/userLogout';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { RiDashboardLine } from 'react-icons/ri';
import { TbBrandBebo } from "react-icons/tb";
import { PiFlagBannerFill } from 'react-icons/pi';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    try {
      dispatch(logout());
      toast.success('Logout Successfully');
      navigate('/page/login');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  const NavItem = ({ to, icon: Icon, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-2 px-4 rounded transition-colors duration-200 ${
          isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
        }`
      }
      onClick={() => window.innerWidth < 1024 && toggleSidebar()}
    >
      <Icon className="mr-3" /> {children}
    </NavLink>
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-gray-800 text-white w-64 fixed left-0 top-0 z-50 h-full transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className='flex items-center mb-8'>
            <Link to="/" className="text-2xl font-bold">Scent Zone</Link>
          </div>
          <nav className="space-y-1 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <NavItem to="/admin" icon={RiDashboardLine}>Dashboard</NavItem>
            <NavItem to="/admin/add-product" icon={FiPlusCircle}>Add Product</NavItem>
            <NavItem to="/admin/all-products" icon={FiPackage}>All Products</NavItem>
            <NavItem to="/admin/all-orders" icon={FiShoppingCart}>All Orders</NavItem>
            <NavItem to="/admin/category" icon={MdOutlineCategory}>Category</NavItem>
            <NavItem to="/admin/brand" icon={TbBrandBebo}>Brand</NavItem>
            <NavItem to="/admin/aroma" icon={MdOutlineCategory}>Aroma Management</NavItem>
            <NavItem to="/admin/reviews" icon={MdOutlineRateReview}>Review Management</NavItem>
            <NavItem to="/admin/banner" icon={PiFlagBannerFill}>Banner Management</NavItem>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
          >
            <FiLogOut className="mr-3" /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;