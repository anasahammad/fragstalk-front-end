import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaTwitter, FaSprayCan } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#192229] text-gray-100 -mb-10">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold italic mb-4">
            Discover The Latest Fragrances & Exclusive Deals – Stay Updated!
          </h2>
          <div className="flex flex-col lg:flex-row max-w-xl mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 border rounded-md text-gray-800"
            />
            <button className="px-2 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-indigo-800">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src='/logo.png' className='w-8 h-8 mr-2 object-cover object-center'></img>
              <span className="text-2xl font-bold">Scent Zone</span>
            </div>
            <p className="text-sm mb-2">Dhaka Bangladesh</p>
            <p className="text-sm mb-2">
              Call us: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
            </p>
            <p className="text-sm mb-4">
              Email: <a href="mailto:info@scentzone.com" className="hover:underline">info@scentzone.com</a>
            </p>
            <div className="flex gap-4">
              <a href='https://www.facebook.com/scentzone' target='_blank' rel="noopener noreferrer"><FaFacebookF className="w-5 h-5 cursor-pointer hover:text-pink-500" /></a>
              <a href='https://www.instagram.com/scentzone' target='_blank' rel="noopener noreferrer"><FaInstagram className="w-5 h-5 cursor-pointer hover:text-pink-500" /></a>
              <a href='https://www.pinterest.com/scentzone' target='_blank' rel="noopener noreferrer"><FaPinterestP className="w-5 h-5 cursor-pointer hover:text-pink-500" /></a>
              <a href='https://www.youtube.com/scentzone' target='_blank' rel="noopener noreferrer"><FaYoutube className="w-5 h-5 cursor-pointer hover:text-pink-500" /></a>
              <a href='https://www.twitter.com/scentzone' target='_blank' rel="noopener noreferrer"><FaTwitter className="w-5 h-5 cursor-pointer hover:text-pink-500" /></a>
            </div>
          </div>

          {/* The Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">The Company</h3>
            <ul className="space-y-2">
              {[
                'About Scent Zone',
                'Our Perfumers',
                'Privacy Policy',
                'Return & Refund Policy',
                'Shipping Policy',
                'Terms Of Service'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:underline hover:text-pink-500">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {[
                'Contact Us',
                'FAQs',
                'Store Locator',
                'Gift Cards'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:underline hover:text-pink-500">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Fragrances */}
          <div>
            <h3 className="font-bold text-lg mb-4">Fragrances</h3>
            <ul className="space-y-2">
              {[
                'Women\'s Perfumes',
                'Men\'s Colognes',
                'Unisex Fragrances',
                'New Arrivals',
                'Best Sellers',
                'Gift Sets',
                'Fragrance Finder'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:underline hover:text-pink-500">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-indigo-950 text-white py-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Scent Zone. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;