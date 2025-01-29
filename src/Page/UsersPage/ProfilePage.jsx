import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const AddressForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={formData?.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          id="street"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={formData?.street || ""}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            id="city"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData?.city || ""}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            id="state"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData?.state || ""}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            id="zipCode"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData?.zipCode || ""}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            id="country"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData?.country || ""}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {isEdit ? "Update Address" : "Add Address"}
      </button>
    </form>
  );
};

export default function ProfilePage() {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const queryClient = useQueryClient();

  const userState = useSelector((state) => state.user);
  const existingUser =
    userState?.userInfo || JSON.parse(localStorage.getItem("userAccount"));
  const userId = existingUser?.user._id;

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/me/${userId}`
      );
      return response.data;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedAddresses) => {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/customer/profile`,
        { addresses: updatedAddresses },
        {
          headers: {
            Authorization: `Bearer ${existingUser.token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      setIsAddressModalOpen(false);
      setEditingAddress(null);
      toast.success("Addresses updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to update addresses");
    },
  });

  const handleAddressSubmit = (addressData) => {
    const updatedAddresses = [...(user.addresses || [])];
    if (editingAddress) {
      const index = updatedAddresses.findIndex(
        (addr) => addr._id === editingAddress._id
      );
      if (index !== -1) {
        updatedAddresses[index] = {
          ...updatedAddresses[index],
          ...addressData,
        };
      }
    } else {
      updatedAddresses.push(addressData);
    }
    updateProfileMutation.mutate(updatedAddresses);
  };

  const handleDeleteAddress = (addressId) => {
    const updatedAddresses = user.addresses.filter(
      (addr) => addr._id !== addressId
    );
    updateProfileMutation.mutate(updatedAddresses);
  };

  const handleSetDefaultAddress = (addressId) => {
    const updatedAddresses = user.addresses.map((addr) => ({
      ...addr,
      isDefault: addr._id === addressId,
    }));
    updateProfileMutation.mutate(updatedAddresses);
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-8 text-red-600">
        Error loading profile data
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-600">Email: {user?.email}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Addresses</h2>
          <button
            onClick={() => {
              setEditingAddress(null);
              setIsAddressModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            <FiPlus /> Add Address
          </button>
        </div>
        <div className="space-y-4">
          {user?.addresses?.map((address) => (
            <div key={address._id} className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h3>{address.name}</h3>
                  {address.isDefault && (
                    <span className="text-sm text-green-600 font-semibold">
                      Default
                    </span>
                  )}
                  <p className="text-gray-600">{address.street}</p>
                  <p className="text-gray-600">
                    {address.city}, {address.state} - {address.zipCode}
                  </p>
                  <p className="text-gray-600">{address.country}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingAddress(address);
                      setIsAddressModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefaultAddress(address._id)}
                  className="text-sm mt-4 text-blue-600 hover:text-blue-800"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title={editingAddress ? "Edit Address" : "Add Address"}
      >
        <AddressForm
          onSubmit={handleAddressSubmit}
          initialData={editingAddress}
          isEdit={!!editingAddress}
        />
      </Modal>
    </div>
  );
}
