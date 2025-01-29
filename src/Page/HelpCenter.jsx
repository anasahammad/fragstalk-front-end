import { FaTruck, FaShieldAlt, FaHandsHelping, FaQuestionCircle } from 'react-icons/fa';
import { MdPrivacyTip } from 'react-icons/md';
import { RiCustomerService2Line } from 'react-icons/ri';
import { BiShoppingBag } from 'react-icons/bi';
import { GiGearHammer } from 'react-icons/gi'; // Alternative icon

const helpOptions = [
  { icon: <FaShieldAlt size={40} />, title: 'Warranty & Returns' },
  { icon: <FaTruck size={40} />, title: 'Shipping & Delivery' },
  { icon: <FaHandsHelping size={40} />, title: 'Quality & Safety' },
  { icon: <RiCustomerService2Line size={40} />, title: 'Customer Service' },
  { icon: <FaQuestionCircle size={40} />, title: 'FAQs' },
  { icon: <GiGearHammer size={40} />, title: 'Care & Maintenance' }, // Updated
  { icon: <MdPrivacyTip size={40} />, title: 'Privacy Policy' },
  { icon: <BiShoppingBag size={40} />, title: 'Where to Buy' },
];

const HelpCenter = () => {
  return (
    <div className="bg-gray-50 p-16">
      <h1 className="text-3xl font-bold text-center mb-10">Help Center!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {helpOptions.map((option, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg border-l-4 border-transparent  border-blue-600 hover:scale-105 transform transition-all duration-300 hover:shadow-xl cursor-pointer"
          >
            <div className="text-blue-600 mb-4">{option.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800">{option.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
