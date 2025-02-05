import React, { useState } from "react"
import { InfoIcon, CreditCard, Truck, ShoppingBag } from 'lucide-react'
import ScrollToTop from "../../hooks/ScrollToTop"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import cod from "../../assets/cod.png"

const paymentMethods = [
  {
    value: "cash",
    label: "Cash on Delivery",
    img: cod,
  },
  {
    value: "bkash",
    label: "Bkash",
    img: "https://freepnglogo.com/images/all_img/1701670291bKash-App-Logo-PNG.png",
  },
  {
    value: "nagad",
    label: "Nagad",
    img: "https://freelogopng.com/images/all_img/1679248828Nagad-Logo-PNG.png",
  },
  {
    value: "rocket",
    label: "Rocket",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12VgBUxXDd2i17DbU1_o5hp-u6YxBBdSKkQ&s",
  },
  {
    value: "upay",
    label: "Upay",
    img: "https://www.upaybd.com/images/Upay-logo-revised-new.png",
  },
  {
    value: "mCash",
    label: "MCash",
    img: "https://play-lh.googleusercontent.com/8sY7fsOPPoXNt36tNQR9dOnpmbjaYaoXQ8e2U_m-Jd535v1W--Zp31JUFAT1j35lmA4",
  },
];
export default function CheckoutPage() {
  const [selectedShipping, setSelectedShipping] = useState('inside')
  const [shippingCost, setShippingCost] = useState(60)
  const [selectedPayment, setSelectedPayment] = useState('cash')
  const [selectedBilling, setSelectedBilling] = useState('same')
  const [trxId, setTrxId] = useState('')
  const [paymentPhone, setPaymentPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const location = useLocation();
  const product = location.state?.product || [];
  const userState = useSelector((state) => state.user);

  const total = product.reduce((acc, item) => {
    const quantity = item.qty ? item.qty : 1;
    const price = item.price
    return acc + price * quantity;
  }, 0) + shippingCost;

  const user = userState?.userInfo?.user || JSON.parse(localStorage.getItem("userAccount"));
  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.addresses[0]?.name || '',
    company: '',
    address: '',
    apartment: '',
    city: user?.addresses[0]?.city || '',
    zipCode: user?.addresses[0]?.zipCode || '',
    phone: '',
    
  })

  const orderMutation = useMutation({
    mutationFn: async (newOrder) => {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/customer/orders`, newOrder, {
        headers: {
          Authorization: `Bearer ${userState?.userInfo?.token}`,
        },
      })
      return response.data
    },
    onSuccess: () => {
      toast.success('Order placed successfully')
      localStorage.removeItem('cartItems')
    },
    onError: (error) => {
      toast.error(error.response?.message || 'Something went wrong')
      console.log('Error: ', error)
    }
  })

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    if (selectedPayment !== 'cash' && !validatePaymentPhone()) {
      return;
    }
    const newOrder = {
      product,
      status: 'pending',
      quantity: product?.length,
      user: user ? user?._id || userState?.userInfo?.user?._id : '',
      totalAmount: total,
      shippingAddress: formData,
      paymentMethod: selectedPayment,
      payment: {
        transactionId: trxId,
        phone: paymentPhone,
        
      }
    }
    orderMutation.mutate(newOrder)
  }

  const handleShippingChange = (e) => {
    setSelectedShipping(e.target.value)
    if (e.target.value === 'inside') {
      setShippingCost(60)
    } else {
      setShippingCost(120)
    }
  }

  const validatePaymentPhone = () => {
    if (paymentPhone.length !== 11) {
      setPhoneError('Phone number must be 11 digits')
      return false
    }
    setPhoneError('')
    return true
  }

  return (
    <ScrollToTop>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Checkout</h1>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-2 space-y-8 bg-white p-8 rounded-xl shadow-lg">
              {/* Contact Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <InfoIcon className="mr-2 text-teal-600" /> Contact Information
                </h2>
                <input 
                  type="text" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email or mobile phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                />
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="newsletter"
                    className="w-5 h-5 border-gray-300 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">Email me with news and offers</label>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <Truck className="mr-2 text-teal-600" /> Delivery Details
                </h2>
                <select 
                  defaultValue="bangladesh" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                >
                  <option value="bangladesh">Bangladesh</option>
                </select>
                
                <input 
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                />
                
                <input 
                  placeholder="Company (optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                />
                <input 
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}  
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                />
                <input 
                  placeholder="Apartment, suite, etc. (optional)"
                  value={formData.apartment}
                  onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  />
                  <input 
                    placeholder="Zip code (optional)"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  />
                </div>
                
                <input 
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                />
              </div>

              {/* Shipping Method */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <Truck className="mr-2 text-teal-600" /> Shipping Method
                </h2>
                <div className="flex flex-col gap-4 border rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center gap-4">
                    <label htmlFor="shipping" className="font-medium text-gray-700">
                      Select Location:
                    </label>
                    <select
                      id="shipping"
                      name="shipping"
                      value={selectedShipping}
                      onChange={handleShippingChange}
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                    >
                      <option value="inside">Inside Dhaka - ৳60</option>
                      <option value="outside">Outside Dhaka - ৳120</option>
                    </select>
                  </div>
                  <div className="text-lg font-medium text-teal-600">
                    Delivery Charge: 
                    {selectedShipping === "inside" ? " ৳60" : " ৳120"}
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <CreditCard className="mr-2 text-teal-600" /> Payment Method
                </h2>
                <p className="text-sm text-gray-600">Choose your preferred payment method.</p>
                
                <div className="space-y-2">
                  {paymentMethods?.map((method) => (
                    <div key={method} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition duration-200">
                      <input 
                        type="radio" 
                        id={method.value} 
                        name="payment"
                        value={method.value}
                        checked={selectedPayment === method.value}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-5 h-5 border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <label htmlFor={method.value} className="flex-1 font-medium text-gray-700 capitalize">
                        {method.label}
                      </label>
                      <img src={method.img} alt={`${method.value} logo`} className="h-8" />
                    </div>
                  ))}
                </div>

                {selectedPayment !== 'cash' && (
                  <div className="border rounded-lg p-6 bg-gray-50 space-y-3 text-sm">
                    <p className="font-medium text-gray-700">Please complete the payment using the following information:</p>
                    <div className="space-y-2 mt-4">
                      <p className="font-semibold text-teal-600">{selectedPayment === 'bkash' ? 'bKash' : 'Nagad'} Payment</p>
                      <p><span className="font-medium">Account Type:</span> Merchant</p>
                      <p><span className="font-medium">Account Number:</span> {selectedPayment === 'bkash' ? '01710-724266' : '01710-724266'}</p>
                      <p><span className="font-medium">Reference:</span> Your Order ID (will be provided after order placement)</p>
                    </div>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label htmlFor="trxId" className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                        <input 
                          type="text" 
                          id="trxId"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          placeholder="Enter your Transaction ID"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="paymentPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          id="paymentPhone"
                          value={paymentPhone}
                          onChange={(e) => setPaymentPhone(e.target.value)}
                          onBlur={validatePaymentPhone}
                          placeholder="Enter your 11-digit phone number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                          required
                        />
                        {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Billing Address</h2>
                <div className="space-y-2">
                  {['same', 'different'].map((option) => (
                    <div key={option} className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        id={option} 
                        name="billing"
                        value={option}
                        checked={selectedBilling === option}
                        onChange={(e) => setSelectedBilling(e.target.value)}
                        className="w-5 h-5 border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <label htmlFor={option} className="text-gray-700">
                        {option === 'same' ? 'Same as shipping address' : 'Use a different billing address'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-lg font-medium text-lg transition duration-200 transform hover:scale-105"
              >
                Complete Order
              </button>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <ShoppingBag className="mr-2 text-teal-600" /> Order Summary
                </h2>
                {product.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 border-b pb-4">
                    <div className="relative h-20 w-20 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item?.images[0] || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                      <span className="absolute -top-2 -right-2 bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {item?.qty || 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">{item?.sku ? item.sku.toUpperCase() : ''}</p>
                      <p className="text-teal-600 font-medium">৳{item.price * (item?.qty ? item.qty : 1)}</p>
                    </div>
                  </div>
                ))}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">৳{total - shippingCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">৳{shippingCost}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-teal-600">৳{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-center text-sm text-teal-600 mt-12">
            <a href="#" className="hover:underline hover:text-teal-700 transition duration-200">Refund policy</a>
            <a href="#" className="hover:underline hover:text-teal-700 transition duration-200">Shipping policy</a>
            <a href="#" className="hover:underline hover:text-teal-700 transition duration-200">Privacy policy</a>
            <a href="#" className="hover:underline hover:text-teal-700 transition duration-200">Terms of service</a>
            <a href="#" className="hover:underline hover:text-teal-700 transition duration-200">Contact information</a>
          </div>
        </div>
      </div>
    </ScrollToTop>
  )
}