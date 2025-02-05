
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';



const Badge = ({ type }) => {
  const badgeClasses = {
    hot: 'bg-orange-500 text-white',
    new: 'bg-blue-500 text-white'
  };
  

  return (
    <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-sm ${badgeClasses[type]}`}>
      {type.toUpperCase()}
    </span>
  );
};

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const renderMenuItem = (item) => {
    if (typeof item === 'string') {
      return item;
    }
    return (
      <span className="flex items-center">
        {item.name}
        <Badge type={item.badge} />
      </span>
    );
  };

  const {data: navigation=[]} = useQuery({
    queryKey: 'navigation',
    queryFn: async() => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
      return response.data;
    }
})
  return (
    <nav className="relative z-50  hidden md:block shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation?.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href='#'
                  className="text-gray-900 hover:text-teal-600 px-3 py-2 text-base transition-colors"
                >
                  {item.name}
                </a>
                
                {activeDropdown === item.name && item.subcategories && (
                  <div className="absolute left-0 w-screen bg-white shadow-lg mt-2 -ml-4">
                    <div className="max-w-7xl mx-auto px-8 py-2 grid grid-cols-4 gap-8">
                      {item?.subcategories?.map((subItem) => (
                        <div key={subItem.name}>
                          
                          <ul>
                            
                              <li>{subItem.name}</li>
                           
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}