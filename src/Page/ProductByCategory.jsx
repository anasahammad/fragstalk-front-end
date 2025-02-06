import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductListing/ProductListing';

const ProductByCategory = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    price: [],
    brand: []
  });
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const { id } = useParams();

  const { data = [] } = useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer/products/category/${id}`);
      return response.data;
    }
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
      return response.data;
    }
  });

  const filterOptions = {
    category: categories?.length > 0 ? categories.map(category => category.name) : [],
    price: ['Under ৳50', '৳50 - ৳100', '৳100 - ৳200', 'Over ৳200'],
    brand: ['Brand A', 'Brand B', 'Brand C'] // ব্র্যান্ড অপশন চাইলে API থেকে নিতে পারো
  };

  // **Filter Logic**
  const filteredData = useMemo(() => {
    return data
      .filter(product => {
        // ক্যাটাগরি ফিল্টার
        if (selectedFilters.category && selectedFilters.category !== product.category) {
          return false;
        }

        // প্রাইস ফিল্টার
        if (selectedFilters.price.length > 0) {
          const productPrice = product.price;
          const matchPrice = selectedFilters.price.some(range => {
            if (range === 'Under ৳50') return productPrice < 50;
            if (range === '৳50 - ৳100') return productPrice >= 50 && productPrice <= 100;
            if (range === '৳100 - ৳200') return productPrice > 100 && productPrice <= 200;
            if (range === 'Over ৳200') return productPrice > 200;
            return false;
          });
          if (!matchPrice) return false;
        }

        // ব্র্যান্ড ফিল্টার
        if (selectedFilters.brand.length > 0 && !selectedFilters.brand.includes(product.brand)) {
          return false;
        }

        // সার্চ ইনপুট ফিল্টার
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
  }, [data, selectedFilters, searchQuery, sortBy]);

  // **Filter Handling**
  const handleFilterChange = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value // ক্যাটাগরি একটিই নির্বাচন হবে
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: '',
      price: [],
      brand: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:mt-20 mt-1">
        {/* Filter & Sort Buttons */}
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
              onChange={(e) => setSortBy(e.target.value)}
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

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Filter Sidebar */}
        {showFilters && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)} />
            <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl">
              <div className="h-full flex flex-col">
                <div className="px-4 py-6 bg-gray-50 border-b flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-500">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Filter Options */}
                <div className="flex-1 py-6 px-4 overflow-y-auto">
                  {Object.entries(filterOptions).map(([filterType, options]) => (
                    <div key={filterType} className="border-b border-gray-200 py-4">
                      <h3 className="text-sm font-medium text-gray-900 uppercase mb-3">{filterType}</h3>
                      <div className="space-y-2">
                        {options.map((option) => (
                          <label key={option} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              checked={selectedFilters[filterType] === option}
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

                {/* Clear Filters */}
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
          {filteredData.length > 0 ? (
            filteredData.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
