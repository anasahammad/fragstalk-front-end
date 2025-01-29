import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

// Cloudinary configuration
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/drbtvputr/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rowshanara';



const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', image: null });
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url;
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = newCategory.image;
      if (newCategory.image instanceof File) {
        imageUrl = await uploadImage(newCategory.image);
      }
      await axios.post(`${import.meta.env.VITE_API_URL}/category`, { ...newCategory, image: imageUrl });
      setNewCategory({ name: '', description: '', image: null });
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      let imageUrl = editingCategory.image;
      if (editingCategory.image instanceof File) {
        imageUrl = await uploadImage(editingCategory.image);
      }
      await axios.put(`${import.meta.env.VITE_API_URL}/category/${editingCategory._id}`, { ...editingCategory, image: imageUrl });
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/category/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleToggleActive = async (category) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/category/${category._id}`, { ...category, isActive: !category.isActive });
      fetchCategories();
    } catch (error) {
      console.error('Error toggling category active status:', error);
    }
  };

  const handleImageChange = (e, setter) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(prevState => ({ ...prevState, image: file }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Category Management</h1>

      {/* Add New Category Form */}
      <form onSubmit={handleAddCategory} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category-image">
            Category Image
          </label>
          <input
            id="category-image"
            type="file"
            onChange={(e) => handleImageChange(e, setNewCategory)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
            
          />
        </div> */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Category
        </button>
      </form>

      {/* Categories List */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {editingCategory && editingCategory._id === category._id ? (
              <form onSubmit={handleEditCategory} className="mb-4">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                  type="text"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                {/* <input
                  type="file"
                  onChange={(e) => handleImageChange(e, setEditingCategory)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  accept="image/*"
                /> */}
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Save
                </button>
                <button onClick={() => setEditingCategory(null)} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <div>
                    <button onClick={() => setEditingCategory(category)} className="text-blue-500 hover:text-blue-700 mr-2">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDeleteCategory(category._id)} className="text-red-500 hover:text-red-700 mr-2">
                      <FiTrash2 />
                    </button>
                    <button onClick={() => handleToggleActive(category)} className={`text-${category.isActive ? 'green' : 'gray'}-500 hover:text-${category.isActive ? 'green' : 'gray'}-700`}>
                      {category.isActive ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{category.description}</p>
                {/* <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-40 object-cover rounded mb-4" /> */}
                <p className="text-sm text-gray-500">Created at: {new Date(category.createdAt).toLocaleString()}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;