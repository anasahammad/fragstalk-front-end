import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [selectedCombo, setSelectedCombo] = useState('without');
  const [selectedImage, setSelectedImage] = useState(0);

  const images = Array(3).fill('/offer.jpg');

  return (
    <div className="p-4 md:p-6">
      <div className="md:max-w-7xl mx-auto rounded-xl overflow-hidden">
        <div className="">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Section: Image Gallery */}
            <div className="lg:w-1/2 flex-1 space-y-4">
              <div className="relative aspect-square lg:aspect-auto overflow-hidden rounded-xl bg-gray-50 shadow-sm h-full">
                <img
                  src={images[selectedImage]}
                  alt="Product view"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
                  New Arrival
                </span>
              </div>
            </div>

            {/* Right Section: Product Details */}
            <div className="lg:w-1/2 flex-1 flex flex-col justify-between">
              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Premium</span>
                    <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">In Stock</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
                    আকর্ষণীয় ডিজাইনের বুকশেলফ
                  </h1>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex">
                      {Array(5).fill(null).map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(128 reviews)</span>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-gray-900">৳62,000.00</span>
                    <span className="text-lg text-gray-500 line-through">৳75,000.00</span>
                    <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">Save 17%</span>
                  </div>
                  <p className="text-sm text-gray-500">Shipping calculated at checkout</p>
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Product Configuration</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedCombo('without')}
                      className={`px-4 py-2 rounded-lg transition-colors shadow-sm ${
                        selectedCombo === 'without'
                          ? 'bg-teal-100 border border-teal-400 text-teal-800'
                          : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      Without Cabinet
                    </button>
                    <button
                      onClick={() => setSelectedCombo('with')}
                      className={`px-4 py-2 rounded-lg transition-colors shadow-sm ${
                        selectedCombo === 'with'
                          ? 'bg-teal-100 border border-teal-400 text-teal-800'
                          : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      With Cabinet
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Royal Luxury Boss Table Application: Boss Table, Chairman Table, MD Table, Director Table, CEO Desk. Premium materials and
                    expert craftsmanship ensure lasting quality.
                  </p>

                  <div className="flex items-center gap-2 text-sm text-red-500 !mb-5">
                    <span className="animate-pulse">🔥</span>
                    <span>5 sold in last 18 hours</span>
                  </div>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button className="flex-1 border border-teal-500 text-teal-500 hover:border-teal-600 hover:bg-teal-50 py-3 rounded-lg shadow-md flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 py-3 rounded-lg shadow-md flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Add to Wishlist
                  </button>
                </div>

                <Link to="/checkout" className='mt-5'>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg shadow-md flex items-center justify-center mt-3">
                  Buy Now
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
