 
import { useState } from "react"
import { InfoIcon } from 'lucide-react'
import ScrollToTop from "../../hooks/ScrollToTop"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const [useShippingAddress, setUseShippingAddress] = useState(true)
  const [selectedShipping, setSelectedShipping] = useState('inside')
  const [shippinCost, setShippingCost] = useState(600)
  const [selectedPayment] = useState('partial')
  const [selectedBilling, setSelectedBilling] = useState('same')
  const location = useLocation();
  const product = location.state?.product || [];
  const userState = useSelector((state) => state.user);

  const total = product.reduce((acc, item) => {
    const quantity = item.qty ? item.qty : 1; // Use qty if available, otherwise 1
    const price = item.price
    return acc + price * quantity; // Calculate total for the item
  }, 0) + shippinCost;
  console.log('product from checkout ',product)
  const user = userState?.userInfo?.user || JSON.parse(localStorage.getItem("userAccount"));
  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.addresses[0].name || '',
    company: '',
    address: '',
    apartment: '',
    city: user?.addresses[0].city || '',
    zipCode: user?.addresses[0].zipCode || '',
    phone: ''
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
    },
    onError: (error) => {
      toast.error(error.response.message||'Something went wrong')
      console.log('Error: ', error)
    }
  })
  const handleSubmitOrder = (e) => {
    e.preventDefault()
    console.log('Form Data: ', formData)
    const newOrder = {
      
      product,
      status: 'pending',
      quantity: product?.length,
      user:user? user?._id || userState?.userInfo?.user?._id : '',
      totalAmount: total,
      shippingAddress:formData,

    }
    orderMutation.mutate(newOrder)
  }

  const handleShippingChange = (e) => {
    setSelectedShipping(e.target.value)
    if (e.target.value === 'inside') {
      setShippingCost(600)
    } else {
      setShippingCost(1200)
    }
  }
  return (
    <ScrollToTop>
        <div className="min-h-screen bg-gray-50 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-2 space-y-6">
            {/* Contact Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Contact</h2>
                <button className="text-teal-600 text-sm">Log in</button>
              </div>
              <input 
                type="text" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email or mobile phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="newsletter"
                  className="w-4 h-4 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="newsletter" className="text-sm">Email me with news and offers</label>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Delivery</h2>
              <select 
                defaultValue="bangladesh" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="bangladesh">Bangladesh</option>
              </select>
              
              <input 
                placeholder="Name"
                value={formData.name}
               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              
              <input 
                placeholder="Company (optional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input 
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}  
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input 
                placeholder="Apartment, suite, etc. (optional)"
                value={formData.apartment}
                onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input 
                  placeholder="Zip code (optional)"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <InfoIcon className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="save-info"
                  className="w-4 h-4 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="save-info" className="text-sm">Save this information for next time</label>
              </div>
            </div>

            {/* Shipping Method */}
            {/* <div className="space-y-4">
              <h2 className="text-xl font-semibold">Shipping method</h2>
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="standard" 
                    name="shipping"
                    value="standard"
                    checked={selectedShipping === 'standard'}
                    className="w-4 h-4 border-gray-300 focus:ring-teal-500"
                  />
                  <label htmlFor="standard">Delivery Charge</label>
                </div>
                <span>৳600.00</span>
              </div>
            </div> */}

<div className="space-y-4">
  <h2 className="text-xl font-semibold">Shipping Method</h2>
  <div className="flex flex-col gap-4 border rounded-lg p-4">
    <div className="flex items-center gap-4">
      <label htmlFor="shipping" className="font-medium">
        Select Location:
      </label>
      <select
        id="shipping"
        name="shipping"
        value={selectedShipping}
        onChange={handleShippingChange}
        className="w-full lg:w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="inside">Inside Dhaka - ৳600.00</option>
        <option value="outside">Outside Dhaka - ৳1200.00</option>
      </select>
    </div>
    <div className="text-lg font-medium">
      Delivery Charge: 
      {selectedShipping === "inside" ? " ৳600.00" : " ৳1200.00"}
    </div>
  </div>
</div>
            {/* Payment Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Payment</h2>
              <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>
              
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="partial" 
                    name="payment"
                    value="partial"
                    checked={selectedPayment === 'partial'}
                    className="w-4 h-4 border-gray-300 focus:ring-teal-500"
                  />
                  <label htmlFor="partial">Partial Cash on delivery</label>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-2 text-sm">
                <p>You have to pay 10% of the total amount via any payment method below. You need to pay the rest of the amount during product delivery.</p>
                <div className="space-y-1 mt-4">
                  <p className="font-semibold">Bank Transfer/Deposit</p>
                  <p>Bank Name: DBBL</p>
                  <p>Account Name: Bongo Furniture</p>
                  <p>Account No: 211110003188</p>
                  <p>Branch Name: Pallabi Branch</p>
                  <p>Swift Code: DBBLBDDH</p>
                  <p>Routing Number: 090263581</p>
                  <p>Bkash/Nagad (Send Money):</p>
                  <p>+880 1710-724266 (Personal)</p>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Billing address</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="same" 
                    name="billing"
                    value="same"
                    checked={selectedBilling === 'same'}
                    onChange={(e) => {
                      setSelectedBilling(e.target.value)
                      setUseShippingAddress(true)
                    }}
                    className="w-4 h-4 border-gray-300 focus:ring-teal-500"
                  />
                  <label htmlFor="same">Same as shipping address</label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="different" 
                    name="billing"
                    value="different"
                    checked={selectedBilling === 'different'}
                    onChange={(e) => {
                      setSelectedBilling(e.target.value)
                      setUseShippingAddress(false)
                    }}
                    className="w-4 h-4 border-gray-300 focus:ring-teal-500"
                  />
                  <label htmlFor="different">Use a different billing address</label>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-md font-medium">
              Complete order
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border space-y-4">
             {product.map((item, index) => (
               <div key={index} className="flex items-start gap-4">
               <div className="relative h-16 w-16 bg-gray-100 rounded">
                 <img
                   src={item?.images[0]}
                   alt="Victorian Chest of Drawer"
                   className="object-cover rounded"
                 />
                 <span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                   {item?.qty || 1}
                 </span>
               </div>
               <div className="flex-1">
                 <p className="font-medium">{item.name} - {item?.sku?item.sku.toUpperCase():''}</p>
                 <p className="text-gray-600">৳{item.price * (item?.qty? item.qty : 1)}</p>
               </div>
             </div>
             ))}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{product.reduce((acc, item)=>{
                    const quantity = item.qty ? item.qty : 1; // Use qty if available, otherwise 1
                    const price = item.price
                    return acc + price * quantity; // Calculate total for the item
                  }, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>৳{shippinCost}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>৳{total }</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="  gap-4 justify-center grid grid-cols-3 text-sm text-teal-600 mt-8">
          <a href="#" className="hover:underline">Refund policy</a>
          <a href="#" className="hover:underline">Shipping policy</a>
          <a href="#" className="hover:underline">Privacy policy</a>
          <a href="#" className="hover:underline">Terms of service</a>
          <a href="#" className="hover:underline">Contact information</a>
        </div>
      </div>
    </div>
    </ScrollToTop>
  )
}

