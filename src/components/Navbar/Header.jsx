// import React, { useEffect, useState } from "react";
// import { FaBars, FaHeart, FaShoppingBag, FaTimes, FaUser } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { getUserByIdForUser } from "../../services";
// import Cart from "./Cart";
// import Wishlist from "./Wishlist";

// const Header = ({isOpen, setIsOpen}) => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// const [account, setAccount] = useState(null);
// const [openCart, setOpenCart] = useState(false);
// const [openWishlist, setOpenWishlist] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {cart} = useSelector((state) => state.cart);
//   const {wishlist} = useSelector((state) => state.wishlist);
//   const userState = useSelector((state) => state.user);
//   console.log(userState);
// const navigation = [
//     { name: 'Home Furniture', href: '#' },
//     { name: 'Office Furniture', href: '#' },
//     { name: 'Industrial Furniture', href: '#' },
//     { name: 'Restaurant Furniture', href: '#' },
//     { name: 'All Chair', href: '#' },
//     { name: 'Accessories', href: '#' },
//     { name: 'Photo Gallery', href: '#' },
//   ];

  
//   const existingUser =
//   userState?.userInfo || JSON.parse(localStorage.getItem("userAccount"));
// const userId = existingUser?.user._id;

// useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const userData = await getUserByIdForUser(userId);
//       console.log("userData " ,userData);
//       setAccount(userData);
//     } catch (err) {
//       // setError(err.message);
//     }
//   };

//   fetchUser();
// }, [userId]);
// console.log("account data ",account);
//   return (
//     <header className="bg-white border-b">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo and Links for Large Devices */}
//         <div className="flex items-center space-x-6">
//           <Link to="/">
//           <img src="/pflogo.jpg" alt="pramanik furniture" className="h-6" />
//           </Link>
//           <nav className="hidden md:flex space-x-3">
//             <Link to="/page/helpcenter" className="text-gray-600 hover:text-black">
//               HELP CENTER 
//             </Link>
//             <Link  to="/page/contactus" className="text-gray-600 hover:text-black">
//               CONTACT US
//             </Link>
//             <a href="#" className="text-gray-600 hover:text-black">
//               MEETING REQUEST
//             </a>
//           </nav>
//         </div>

//         {/* Search Bar for Large Devices */}
//         <div className="hidden mx-12 md:flex items-center flex-1">
//           <input
//             type="text"
//             placeholder="Search entire store here..."
//             className="border rounded-full px-4 py-2 w-full text-sm"
//           />
//           <button className="text-gray-600 ml-2">
//             <i className="fas fa-search"></i>
//           </button>
//         </div>

//         {/* Icons */}
//         <div className="flex items-center space-x-8">
//   <button className="relative text-gray-600 hover:text-blue-500 transition-colors duration-300">
//     <Link to={account ? (account.role === "admin" ? "/admin" : "/user/orders") : "/page/login"}>
//       <FaUser />
//     </Link>
//   </button>
  
//   <button onClick={()=>setOpenWishlist(true)} className="text-gray-600 hover:text-blue-500 transition-colors duration-300 relative">
//     <FaHeart />
//     <span className="absolute -top-2 -right-2 bg-black text-white  rounded-full h-5 w-5 flex items-center justify-center text-sm">
//     {wishlist ? wishlist.length : "0"}
//     </span>
//   </button>
  
//   <button onClick={()=>setOpenCart(true)} className="relative text-gray-600 hover:text-blue-500 transition-colors duration-300">
//     <FaShoppingBag />
//     <span className="absolute -top-2 -right-2 bg-black text-white  rounded-full h-5 w-5 flex items-center justify-center text-sm">
//     {cart ? cart.length : "0"}
//     </span>
//   </button>
// </div>


//         {/* Hamburger Menu for Small Devices */}
//          <div className="flex md:hidden">
//                     <button
//                       type="button"
//                       onClick={() => setIsOpen(!isOpen)}
//                       className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-indigo-600"
//                       aria-controls="mobile-menu"
//                       aria-expanded={isOpen ? 'true' : 'false'}
//                     >
//                       <span className="sr-only">Open main menu</span>
//                       {isOpen ? (
//                         <FaTimes className="block h-6 w-6" aria-hidden="true" />
//                       ) : (
//                         <FaBars className="block h-6 w-6" aria-hidden="true" />
//                       )}
//                     </button>
//                   </div>
//                   {openCart && <Cart setOpenCart={setOpenCart} openCart={openCart} />}
//                   {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
//         id="mobile-menu"
//       >
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
//           {navigation.map((item) => (
//             <Link
//               key={item.name}
//               to={item.href}
//               className="text-gray-900 hover:text-indigo-600 block px-3 py-2 text-base font-medium"
//               onClick={() => setIsOpen(false)}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>
//       </div>
     
//     </header>
//   );
// };

// export default Header;



import  { useState, useEffect } from 'react';
import { Instagram, Facebook, Youtube, Search, User, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByIdForUser } from "../../services";

import { useSelector } from 'react-redux';
import Cart from './Cart';
import Wishlist from './Wishlist';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [openCart, setOpenCart] = useState(false);
const [openWishlist, setOpenWishlist] = useState(false);
  const userState = useSelector((state) => state.user);
  const [account, setAccount] = useState(null);
    const {cart} = useSelector((state) => state.cart);
  const {wishlist} = useSelector((state) => state.wishlist);
  const navigate = useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  
  const existingUser =
  userState?.userInfo || JSON.parse(localStorage.getItem("userAccount"));
const userId = existingUser?.user._id;

useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await getUserByIdForUser(userId);
      console.log("userData " ,userData);
      setAccount(userData);
    } catch (err) {
      // setError(err.message);
    }
  };

  fetchUser();
}, [userId]);
console.log("account data ",account);
 

const {data:brands=[]} = useQuery({
  queryKey: ['brands'],
  queryFn: async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/brand`);
    return response.data;
  }
})

const {data:categories=[]} = useQuery({
  queryKey: ['categories'],
  queryFn: async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
    return response.data;
  }})

  const navigationItems = [
    { title: 'HOME', path: '/' },
    { 
      title: 'SHOP BY BRANDS', 
      path: '/brands',
      submenu: brands.map((brand)=>({
        title: brand.name,
        path: `/brands/${brand._id}`,
      }))
        
    },
    { 
      title: 'SHOP BY CATEGORIES', 
      path: '/categories',
      submenu:categories.map((category)=>({
        title: category.name,
        path: `/categories/${category._id}`,
      })) 
    },
    { title: 'NEW ARRIVALS', path: '/new-arrivals' },
    { title: 'BEST SELLERS', path: '/best-sellers' },
    { title: 'BLOG', path: '/blog' },
    { title: 'CONTACT US', path: '/contact' },
  ];


  return (
    <div className="relative">
      {showBanner && (
        <div className="bg-purple-800 text-white py-2 px-4 text-center relative">
          <span className="text-xs sm:text-sm">
            🎁 GET ₹50 OFF ON EVERY PRODUCTS WITH CODE FRAGSNEW (ONLY FOR NEW CUSTOMER).
          </span>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}

      <header className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? ' bg-white' : 'bg-purple-800'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-2xl"
              >
                {isMobileMenuOpen ? 
                  <X className={`w-6 h-6 ${isScrolled ? 'text-gray-600' : 'text-white'}`} /> : 
                  <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
                }
              </button>
              <div className="hidden lg:flex items-center space-x-4">
                <Link to="#" className={`${isScrolled ? 'text-gray-600' : 'text-white'} hover:opacity-75`}>
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link to="#" className={`${isScrolled ? 'text-gray-600' : 'text-white'} hover:opacity-75`}>
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link to="#" className={`${isScrolled ? 'text-gray-600' : 'text-white'} hover:opacity-75`}>
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <Link to="/" className="text-2xl font-bold">
                <img
                  src={`${isScrolled ? '/logo-1-3.png' : '/logo-w.jpg'}`}
                  alt="Fragstalk Logo"
                  className="h-12 object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className={`${isScrolled ? 'text-gray-600' : 'text-white'} hover:opacity-75`}>
                <Search className="w-5 h-5" />
              </button>
              <Link to={account ? (account.role === "admin" ? "/admin" : "/user/orders") : "/page/login"} className={`${isScrolled ? 'text-gray-600' : 'text-white'} hover:opacity-75`}>

                <User className="w-5 h-5" />
              </Link>
              <button onClick={()=>setOpenWishlist(true)} className={`${isScrolled ? 'text-gray-600' : 'text-white'} hover:opacity-75 relative`}>
                <Heart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist?wishlist.length:"0"}
                </span>
              </button>
              <button onClick={()=>setOpenCart(true)} className={`${isScrolled ? 'text-gray-600' : 'text-white'} hover:opacity-75 relative`}>
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cart ? cart.length : "0"}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:block pb-4 ${isScrolled ? 'text-gray-600' : 'text-white'}`}>
            <ul className="flex flex-wrap justify-center space-x-6 text-sm">
              {navigationItems.map((item, index) => (
                <li key={index} className="relative group">
                  <Link 
                    to={item.path}
                    className="hover:text-pink-500 flex items-center gap-1"
                    onMouseEnter={() => item.submenu && setActiveSubmenu(index)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    {item.title}
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  {item.submenu && activeSubmenu === index && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-50">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden fixed inset-0 bg-purple-800 z-50 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white mb-4"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="text-white">
              <ul className="space-y-4">
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => setActiveSubmenu(activeSubmenu === index ? null : index)}
                          className="flex items-center justify-between w-full py-2"
                        >
                          {item.title}
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            activeSubmenu === index ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {activeSubmenu === index && (
                          <ul className="pl-4 space-y-2">
                            {item.submenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subItem.path}
                                  className="block py-2 hover:text-pink-500"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className="block py-2 hover:text-pink-500"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {openCart && <Cart setOpenCart={setOpenCart} openCart={openCart} />}
      //                   {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </div>
  );
}
