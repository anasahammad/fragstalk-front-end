import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaTwitter } from 'react-icons/fa';
 
export default function Footer() {
  return (
    <footer className="w-full bg-purple-700 text-gray-100">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold italic mb-4">
            Discover The Latest Furniture Trends & Exclusive Deals – Stay Updated!
          </h2>
          <div className="flex flex-col lg:flex-row max-w-xl mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button className="px-2 py-2 bg-black text-white rounded-md hover:bg-gray-800">
              Subscribe
            </button>
          </div>
        </div>

      

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t">
          {/* Company Info */}
          <div>
            <img
              src="/logo-1-2.png"
              alt="Fragstalk "
              width={80}
              height={80}
              className="mb-4"
            />
            <p className="text-sm mb-2">Akrain Biruliya Savar, Dhaka, Bangladesh</p>
            <p className="text-sm mb-2">
              Call us: <p href="tel:+8801710724266" className="hover:underline">+8801733550682</p>
            </p>
            <p className="text-sm mb-4">
              Email: <p href="mailto:pramanikfurniture641@gmail.com" className="hover:underline">info@gmail.com</p>
            </p>
            <div className="flex gap-4">
           <a href='https://www.facebook.com/profile.php?id=61571605043376&mibextid=ZbWKwL' target='_blank'> <FaFacebookF  className="w-5 h-5 cursor-pointer hover:text-teal-600" /></a>  
              <FaInstagram className="w-5 h-5 cursor-pointer hover:text-pink-600" />
              <FaPinterestP className="w-5 h-5 cursor-pointer hover:text-red-600" />
              <FaYoutube className="w-5 h-5 cursor-pointer hover:text-red-600" />
              <FaTwitter className="w-5 h-5 cursor-pointer hover:text-teal-400" />
            </div>
          </div>

          {/* The Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">The Company</h3>
            <ul className="space-y-2">
              {[
                'About Fragstalk ',
                'License & Certificates',
                'Privacy Policy',
                'Return & Refund Policy',
                'Shipping Policy',
                'Terms Of Service'
              ].map((item) => (
                <li key={item}>
                  <p href="#" className="text-sm hover:underline">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Need Help? */}
          <div>
            <h3 className="font-bold text-lg mb-4">Need Help?</h3>
            <ul className="space-y-2">
              {[
                'Contact Us',
                'Office Location',
                'Factory Location'
              ].map((item) => (
                <li key={item}>
                  <p href="#" className="text-sm hover:underline">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              {[
                'Available Colors List',
                'Office Furniture Catalogue',
                'Home Furniture Catalogue',
                'Academic Furniture Catalogue',
                'Care & Maintenance',
                'Customization',
                'FAQs'
              ].map((item) => (
                <li key={item}>
                  <p href="#" className="text-sm hover:underline">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black text-white py-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Fragstalk. All Rights Reserved</p>
      </div>
    </footer>
  );
}
