import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import ScrollToTop from '../hooks/ScrollToTop';

const ContactPage = () => {
  return (
    <ScrollToTop>
      <div className="bg-gradient-to-br from-indigo-100 to-pink-100 min-h-screen py-12  mt-10">
        <div className=" mx-auto">
          <div className="bg-white   overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-8 relative">
              <div className="absolute inset-0 opacity-20 bg-pattern"></div>
              <h1 className="text-4xl font-bold text-white relative z-10">Contact Us</h1>
              <p className="mt-2 text-indigo-200 relative z-10">Get in touch with Scent Zone</p>
            </div>
            
            <div className="p-8 md:flex">
              <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
                <div className="flex items-start bg-indigo-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  <FaMapMarkerAlt className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                  <div className="ml-3 text-base">
                    <p className="font-medium text-gray-900">Our Location</p>
                    <p className="mt-1 text-gray-600">123 Perfume Street, Gulshan</p>
                    <p className="text-gray-600">Dhaka 1212, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start bg-indigo-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  <FaPhone className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                  <div className="ml-3 text-base">
                    <p className="font-medium text-gray-900">Phone Number</p>
                    <p className="mt-1 text-gray-600">+880 1234-567890</p>
                  </div>
                </div>

                <div className="flex items-start bg-indigo-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  <FaEnvelope className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                  <div className="ml-3 text-base">
                    <p className="font-medium text-gray-900">Email Address</p>
                    <p className="mt-1 text-gray-600">info@scentzone.com</p>
                  </div>
                </div>

                <div className="flex items-start bg-indigo-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  <FaClock className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                  <div className="ml-3 text-base">
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="mt-1 text-gray-600">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 12:00 PM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 md:pl-8">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0141601255644!2d90.41279631498074!3d23.78014478457481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f7fb6f3f%3A0x32d2d6f5a4a5a0c5!2sGulshan%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1623345678901!5m2!1sen!2sus" 
                    width="100%" 
                    height="300" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy">
                  </iframe>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h2>
                  <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors duration-300">
                      <span className="sr-only">Facebook</span>
                      <FaFacebookF className="h-8 w-8" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors duration-300">
                      <span className="sr-only">Instagram</span>
                      <FaInstagram className="h-8 w-8" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                      <span className="sr-only">Twitter</span>
                      <FaTwitter className="h-8 w-8" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollToTop>
  );
};

export default ContactPage;