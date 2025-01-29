// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa'; 

// const navigation = [
//   { name: 'Home Furniture', href: '#' },
//   { name: 'Office Furniture', href: '#' },
//   { name: 'Industrial Furniture', href: '#' },
//   { name: 'Restaurant Furniture', href: '#' },
//   { name: 'All Chair', href: '#' },
//   { name: 'Accessories', href: '#' },
//   { name: 'Photo Gallery', href: '#' },
// ];

// export default function Navbar() {
//   // const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className=" z-50 bg-white hidden md:grid shadow-lg border-b border-gray-200">
//       <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-center items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/">
           
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex md:items-center md:space-x-6">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className="text-gray-900 hover:text-teal-600 px-3 py-2 text-base  transition-colors"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* Mobile menu button */}
//           {/* <div className="flex md:hidden">
//             <button
//               type="button"
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-teal-600"
//               aria-controls="mobile-menu"
//               aria-expanded={isOpen ? 'true' : 'false'}
//             >
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? (
//                 <FaTimes className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <FaBars className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div> */}
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {/* <div
//         className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
//         id="mobile-menu"
//       >
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
//           {navigation.map((item) => (
//             <Link
//               key={item.name}
//               to={item.href}
//               className="text-gray-900 hover:text-teal-600 block px-3 py-2 text-base font-medium"
//               onClick={() => setIsOpen(false)}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>
//       </div> */}
//     </nav>
//   );
// }
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

// const menuItems = {
//   'Home Furniture': {
//     Table: [
//       'Dressing Table',
//       'Study Table',
//       'Computer Table',
//       'Home Office Table',
//       'Portable Table',
//       'Tea Table Or Center Table',
//       'Round Table'
//     ],
//     Seating: [
//       'Home All Chair',
//       'Indoor Chair',
//       'Out Door Chair',
//       'Dining Chair',
//       'Sofa'
//     ],
//     'Bed & Mattress': [
//       'Bunk Bed',
//       'Metal Bed'
//     ],
//     'Organizer & Storage': [
//       'Cloth Organizer',
//       'Wardrobe',
//       'Hall Tree',
//       'Cupboard',
//       'Alna',
//       'Book Shelf',
//       'Tv Cabinet & Stand',
//       'Shoe Rack'
//     ]
//   },
//   'Office Furniture': {
//     'Desk & Table': [
//       { name: 'Boss Table', badge: 'hot' },
//       'CEO Desk',
//       { name: 'Executive Desk', badge: 'hot' },
//       { name: 'Workstation', badge: 'new' },
//       'Conference Table',
//       'Round Table',
//       'Reception Desk',
//       'Tea Table Or Center Table'
//     ],
//     Seating: [
//       'Office Chair',
//       'Boss Chair',
//       'Executive Chair',
//       'Visitor Chair',
//       'Sofa'
//     ],
//     'Organizer & Storage': [
//       'File Cabinet',
//       'Drawer Unit',
//       'Bookshelf',
//       'Hall Tree',
//       'Shoe Rack'
//     ]
//   }
// };

// const navigation = [
//   { name: 'Home Furniture', href: '#' },
//   { name: 'Office Furniture', href: '#' },
//   { name: 'Industrial Furniture', href: '#' },
//   { name: 'Restaurant Furniture', href: '#' },
//   { name: 'All Chair', href: '#' },
//   { name: 'Accessories', href: '#' },
//   { name: 'Photo Gallery', href: '#' }
// ];

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