import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

// Cloudinary configuration


const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState({ name: '', description: '', image: null });
  const [editingBrand, setEditingBrand] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/brand`);
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

 

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
     
      await axios.post(`${import.meta.env.VITE_API_URL}/brand`, { ...newBrand,  });
      setNewBrand({ name: '', description: '', });
      fetchBrands();
    } catch (error) {
      console.error('Error adding brand:', error);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!editingBrand) return;
    try {
      
      await axios.put(`${import.meta.env.VITE_API_URL}/brand/${editingBrand._id}`, { ...editingBrand, });
      setEditingBrand(null);
      fetchBrands();
    } catch (error) {
      console.error('Error updating Brand:', error);
    }
  };

  const handleDeleteCategory = async (brandId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/brand/${brandId}`);
      fetchBrands();
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };

  const handleToggleActive = async (category) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/category/${category._id}`, { ...category, isActive: !category.isActive });
      fetchBrands();
    } catch (error) {
      console.error('Error toggling category active status:', error);
    }
  };

 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Brand Management</h1>

      {/* Add New Category Form */}
      <form onSubmit={handleAddCategory} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Add New Brand</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Brand Name"
            value={newBrand.name}
            onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Description"
            value={newBrand.description}
            onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
       
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Category
        </button>
      </form>

      {/* Brands List */}
      <div className="space-y-6">
        {brands.map((brand) => (
          <div key={brand._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {editingBrand && editingBrand._id === brand._id ? (
              <form onSubmit={handleEditCategory} className="mb-4">
                <input
                  type="text"
                  value={editingBrand.name}
                  onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                  type="text"
                  value={editingBrand.description}
                  onChange={(e) => setEditingBrand({ ...editingBrand, description: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
               
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Save
                </button>
                <button onClick={() => setEditingBrand(null)} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{brand.name}</h3>
                  <div>
                    <button onClick={() => setEditingBrand(brand)} className="text-blue-500 hover:text-blue-700 mr-2">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDeleteCategory(brand._id)} className="text-red-500 hover:text-red-700 mr-2">
                      <FiTrash2 />
                    </button>
                    <button onClick={() => handleToggleActive(brand)} className={`text-${brand.isActive ? 'green' : 'gray'}-500 hover:text-${brand.isActive ? 'green' : 'gray'}-700`}>
                      {brand.isActive ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{brand.description}</p>
                
                <p className="text-sm text-gray-500">Created at: {new Date(brand.createdAt).toLocaleString()}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;