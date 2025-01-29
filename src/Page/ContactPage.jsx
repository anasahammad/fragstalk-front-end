import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-12">CONTACT</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <p className="text-gray-700">Have a question or comment?</p>
            <p className="text-gray-700">Use the form below to send us a message or contact us by mail at:</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                name="comment"
                required
                value={formData.comment}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-teal-600 text-white font-medium rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Submit Contact
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Contact</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-teal-600 mt-1" />
              <div>
                <p className="font-medium">Address: F7 (Lift-6), Tower71, ECB Chattar,</p>
                <p>Matikata Rd Dhaka-1206</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-teal-600" />
              <p>TEXT: +880 1710-724266</p>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-teal-600" />
              <p>support@bongofurniture.com</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Office Address:</p>
            <p>F7 (Lift-6), Tower71, ECB Chattar, Matikata Rd Dhaka-1206</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Factory Address:</p>
            <p>Plot-1739, Block-F, Road-8/8 Shapufta AM Housing; Pallabi PS; Dhaka-1216; Bangladesh</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Opening Hours:</h3>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-teal-600" />
              <div>
                <p>SAT to THU: 9:00AM - 8:00PM</p>
                <p>FRI: 9:00AM - 12:00PM & 2:00PM - 8:00PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Section */}
      <div className="mt-16 text-center space-y-4">
        <h2 className="text-2xl font-bold">Know more about the brand</h2>
        <p>Explore more about Bongo Furniture by visiting our website.</p>
        <p>Enjoy every moment with our premium-quality pieces, thoughtfully designed to enhance your well-being</p>
      </div>
    </div>
  );
}