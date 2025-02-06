import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../store/actions/userLogout";
import RefundPolicyModal from "../components/RefundPolicyModal";
import ShippingPolicyModal from "../components/ShipingPolicyModal";
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import TermsOfServiceModal from "../components/TermsOfServiceModal";


const UserDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
    const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openShipingModal = () => setIsShippingModalOpen(true);
  const closeShipingModal = () => setIsShippingModalOpen(false);
  const openPrivacyPolicyModal = () => setIsPrivacyPolicyModalOpen(true);
  const closePrivacyPolicyModal = () => setIsPrivacyPolicyModalOpen(false);
  const openTermsModal = () => setIsTermsModalOpen(true);
  const closeTermsModal = () => setIsTermsModalOpen(false);
  const userState = useSelector((state) => state.user);
  console.log(userState);
  const user = userState?.userInfo.user || JSON.parse(localStorage.getItem("userAccount"));
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (isOpen && !event.target.closest('.relative')) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
      }, [isOpen]);

      const handleLogout= () => {
        dispatch(logout())
        navigate("/")
      }
    return (
        <div className="min-h-screen bg-gray-50">
             {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/">
              <img src="/pflogo.jpg" alt="Pramanik Furniture" className="h-8" />
              </Link>
              <nav className="ml-10 space-x-8">
                <Link to="/" className="text-gray-500 hover:text-gray-900">Shop</Link>
                <Link to="/user/orders" className="text-gray-900 font-medium">Orders</Link>
              </nav>
            </div>
            <div className="relative">
              <button 
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{user?.name ? user.name[0].toUpperCase() : <FaUserCircle className="w-5 h-5" />}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-10">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                      {user?.name ? user.name[0].toUpperCase() : <FaUserCircle className="w-5 h-5" />}
                      </div>
                      <div className="ml-3">
                        {user?.name && <p className="text-sm font-medium text-gray-900">{user?.name}</p>}
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  {/* <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link> */}
                  <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto  sm:px-6 lg:px-4 py-8 min-h-[70vh]" >
           <Outlet/> 
      </main>


            {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-6 text-sm text-blue-600">
          <button onClick={openModal}  className="hover:underline">Refund policy</button>
          <button onClick={openShipingModal}  className="hover:underline">Shipping policy</button>
          <button onClick={openPrivacyPolicyModal} to="/privacy-policy" className="hover:underline">Privacy policy</button>
          <button onClick={openTermsModal}  className="hover:underline">Terms of service</button>
          
        </div>

        <RefundPolicyModal isOpen={isModalOpen} onClose={closeModal} />
        <ShippingPolicyModal isOpen={isShippingModalOpen} onClose={closeShipingModal} />

        <PrivacyPolicyModal isOpen={isPrivacyPolicyModalOpen} onClose={closePrivacyPolicyModal} />

        <TermsOfServiceModal isOpen={isTermsModalOpen} onClose={closeTermsModal} />
      </footer>
        </div>
    );
};

export default UserDashboard;