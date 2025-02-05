import React, { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductListing/ProductListing';

const ProductsByAroma = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    price: [],
    aroma: []
  });
  const [sortBy, setSortBy] = useState('featured');
  const {id} = useParams();
  // Sample product data
  // const products = [
  //   {
  //     id: 1,
  //     name: "Classic White Shirt",
  //     price: 49.99,
  //     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ARsPnr3MbSK24Nw3SC5mTg4araN5uy.png",
  //     category: "shirts",
  //     aroma: "Fashion aroma",
  //     isHot: true,
  //     isSale: false
  //   },
  //   {
  //     id: 2,
  //     name: "Denim Jeans",
  //     price: 79.99,
  //     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ARsPnr3MbSK24Nw3SC5mTg4araN5uy.png",
  //     category: "pants",
  //     aroma: "Denim Co",
  //     isHot: true,
  //     isSale: false
  //   },
  //   {
  //     id: 3,
  //     name: "Leather Jacket",
  //     price: 199.99,
  //     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ARsPnr3MbSK24Nw3SC5mTg4araN5uy.png",
  //     category: "outerwear",
  //     aroma: "Leather Luxe",
  //     isHot: false,
  //     isSale: true
  //   },
  //   // Add more products as needed
  // ];

  const {data =[]} = useQuery({
    queryKey: ['products'],
    queryFn: async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer/products/aroma/${id}`);
        return response.data;
    }
})

console.log(data);
const {data:aromas = []} = useQuery({
    queryKey: 'aromas',
    queryFn: async() => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/aroma`);
      return response.data;
    }
  })

   

  const filterOptions = {
    // category: categories.map(category=>category.name),
    aroma: aromas.map(aroma=>aroma.name),
    price: ['Under $50', '$50 - $100', '$100 - $200', 'Over $200'],
    
  };

  const handleFilterChange = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: [],
      price: [],
      aroma: []
    });
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <div className="relative h-64 bg-gradient-to-r from-purple-900 to-purple-700">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white">Men</h1>
        </div>
      </div> */}

      {/* Filters and Sort */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="appearance-none bg-white px-4 py-2 pr-8 rounded-lg shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>

        {/* Filter Sidebar */}
        {showFilters && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)} />
            <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl">
              <div className="h-full flex flex-col">
                <div className="px-4 py-6 bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-500">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 py-6 px-4 overflow-y-auto">
                  {Object.entries(filterOptions).map(([filterType, options]) => (
                    <div key={filterType} className="border-b border-gray-200 py-6">
                      <h3 className="text-sm font-medium text-gray-900 uppercase mb-4">
                        {filterType}
                      </h3>
                      <div className="space-y-3">
                        {options.map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedFilters[filterType].includes(option)}
                              onChange={() => handleFilterChange(filterType, option)}
                              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-3 text-sm text-gray-600">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsByAroma;