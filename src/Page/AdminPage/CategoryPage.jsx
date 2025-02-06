import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiUpload, FiLink } from 'react-icons/fi';

// Cloudinary configuration
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dobkpdw6z/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'auroraxiaDev';


const CategoryPage = () => {
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', image: '', isActive: true });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
      setCategory(response.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const handleImageUpload = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      setIsUploading(false);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
      return null;
    }
  };

  const handleSubmit = async (e, aroma, isEditing = false) => {
    e.preventDefault();
    try {
      let imageUrl = aroma.image;
      if (aroma.image instanceof File) {
        imageUrl = await handleImageUpload(aroma.image);
      }
      const aromaData = { ...aroma, image: imageUrl };
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_URL}/category/${aroma._id}`, aromaData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/category`, aromaData);
      }
      fetchCategory();
      setNewCategory({ name: '', description: '', image: '', isActive: true });
      setEditingCategory(null);
    } catch (error) {
      console.error('Error submitting aroma:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`);
      fetchCategory();
    } catch (error) {
      console.error('Error deleting aroma:', error);
    }
  };

  const handleToggleActive = async (aroma) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/category/${aroma._id}`, {
        ...aroma,
        isActive: !aroma.isActive
      });
      fetchCategory();
    } catch (error) {
      console.error('Error toggling aroma active status:', error);
    }
  };

  const handleImageChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(prevState => ({ ...prevState, image: file }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Category Management</h1>

      {/* Add/Edit Aroma Form */}
      <form onSubmit={(e) => handleSubmit(e, editingCategory || newCategory, !!editingCategory)} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">{editingCategory ? 'Edit Aroma' : 'Add New Category'}</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Category Name"
            value={editingCategory ? editingCategory.name : newCategory.name}
            onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, name: e.target.value}) : setNewCategory({...newCategory, name: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Description"
            value={editingCategory ? editingCategory.description : newCategory.description}
            onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, description: e.target.value}) : setNewCategory({...newCategory, description: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Image URL"
              value={editingCategory ? editingCategory.image : newCategory.image}
              onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, image: e.target.value}) : setNewCategory({...newCategory, image: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="mx-2">or</span>
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
              <FiUpload className="w-8 h-8" />
              <span className="mt-2 text-base leading-normal">Select a file</span>
              <input
                type='file'
                className="hidden"
                onChange={(e) => handleImageChange(e, editingCategory ? setEditingCategory : setNewCategory)}
                accept="image/*"
              />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={editingCategory ? editingCategory.isActive : newCategory.isActive}
              onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, isActive: e.target.checked}) : setNewCategory({...newCategory, isActive: e.target.checked})}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Active</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : (editingCategory ? 'Update Category' : 'Add Category')}
        </button>
        {editingCategory && (
          <button
            onClick={() => setEditingCategory(null)}
            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        )}
      </form>

      {/* category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category?.map((aroma) => (
          <div key={aroma._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={aroma.image || "/placeholder.svg"} alt={aroma?.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{aroma?.name}</h3>
              <p className="text-gray-700 mb-2">{aroma?.description}</p>
              <p className="text-sm text-gray-500 mb-2">Created: {new Date(aroma?.createdAt).toLocaleDateString()}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => setEditingCategory(aroma)} className="text-blue-500 hover:text-blue-700">
                  <FiEdit2 />
                </button>
                <button onClick={() => handleDelete(aroma?._id)} className="text-red-500 hover:text-red-700">
                  <FiTrash2 />
                </button>
                <button onClick={() => handleToggleActive(aroma)} className={`text-${aroma?.isActive ? 'green' : 'gray'}-500 hover:text-${aroma?.isActive ? 'green' : 'gray'}-700`}>
                  {aroma?.isActive ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;