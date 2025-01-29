import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FiPlus, FiMinus, FiUpload, FiPackage, FiDollarSign, FiBox, FiLayers } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/drbtvputr/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rowshanara';

const AddProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const queryClient = useQueryClient();
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      sku: '',
      details: [{ key: '', value: '' }],
      description: '',
      price: '',
      originalPrice: '',
      isNew: false,
      bestSeller: false,
      brand: '',
      stock: '',
      category: '',
      hotSale: false,
      isSale: false,
      images: [],
      isActive: true,
    }
  });

  const { fields: detailsFields, append: appendDetail, remove: removeDetail } = useFieldArray({
    control,
    name: "details"
  });
  const { fields: addionalInfromarion, append: appendAdditional, remove: removeAdditional } = useFieldArray({
    control,
    name: "additional"
  });

  // Fetch categories query
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
      return response.data;
    }
  });

  // Fetch brands query
  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/brand`);
      return response.data;
    }
  });
  // Fetch brands query
  const { data: aromas = [] } = useQuery({
    queryKey: ['aromas'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/aroma`);
      return response.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (productData) => {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/products`, productData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      reset();
      toast.success('Product added successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add product');
    },
  });

  const onSubmit = async (data) => {
    const imageUrls = await Promise.all(
      data.images.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        const response = await axios.post(CLOUDINARY_URL, formData);
        return response.data.secure_url;
      })
    );

    const productData = {
      ...data,
      images: imageUrls,
    };

    mutation.mutate(productData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 px-8">
            <h2 className="text-3xl font-extrabold text-white flex items-center">
              <FiPackage className="mr-4" />
              Add New Product
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  )}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                <Controller
                  name="sku"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  )}
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: 'Category is required' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setSelectedCategory(e.target.value);
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="">Select Category</option>
                      {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                <Controller
                  name="brand"
                  control={control}
                  rules={{ required: 'Brand is required' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="">Select Brand</option>
                      {brands?.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>}
              </div>
              <div>
                <label htmlFor="aroma" className="block text-sm font-medium text-gray-700">Aroma</label>
                <Controller
                  name="aroma"
                  control={control}
                 
                  render={({ field }) => (
                    <select
                      {...field}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="">Select Aroma</option>
                      {aromas?.map((aroma) => (
                        <option key={aroma._id} value={aroma._id}>
                          {aroma.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.aroma && <p className="mt-1 text-sm text-red-600">{errors.aroma.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Details</label>
              {detailsFields.map((field, index) => (
                <div key={field.id} className="flex mt-1 space-x-2">
                  <Controller
                    name={`details.${index}.key`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Key"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                  <Controller
                    name={`details.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Value"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                  <button type="button" onClick={() => removeDetail(index)} className="text-red-600 hover:text-red-800">
                    <FiMinus className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => appendDetail({ key: '', value: '' })} className="mt-1 flex items-center text-indigo-600 hover:text-indigo-800">
                <FiPlus className="h-5 w-5 mr-1" /> Add Detail
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Information</label>
              {addionalInfromarion.map((field, index) => (
                <div key={field.id} className="flex mt-1 space-x-2">
                  <Controller
                    name={`additional.${index}.key`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Key"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                  <Controller
                    name={`additional.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Value"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                  <button type="button" onClick={() => removeAdditional(index)} className="text-red-600 hover:text-red-800">
                    <FiMinus className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => appendAdditional({ key: '', value: '' })} className="mt-1 flex items-center text-indigo-600 hover:text-indigo-800">
                <FiPlus className="h-5 w-5 mr-1" /> Add Additional
              </button>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                )}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBangladeshiTakaSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    name="price"
                    control={control}
                    rules={{ required: 'Price is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        step="0.01"
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
              </div>

              <div>
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Original Price</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBangladeshiTakaSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    name="originalPrice"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        step="0.01"
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBox className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    name="stock"
                    control={control}
                    rules={{ required: 'Stock is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                </div>
                {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="isNew" className="flex items-center">
                  <Controller
                    name="isNew"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                  <span className="ml-2 text-sm text-gray-700">New Product</span>
                </label>
              </div>
              <div>
                <label htmlFor="bestSeller" className="flex items-center">
                  <Controller
                    name="bestSeller"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                  <span className="ml-2 text-sm text-gray-700">Best Seller</span>
                </label>
              </div>
              <div>
                <label htmlFor="hotSale" className="flex items-center">
                  <Controller
                    name="hotSale"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                  <span className="ml-2 text-sm text-gray-700">Hot Sale</span>
                </label>
              </div>
              <div>
                <label htmlFor="isSale" className="flex items-center">
                  <Controller
                    name="isSale"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    )}
                  />
                  <span className="ml-2 text-sm text-gray-700">On Sale</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload images</span>
                      <Controller
                        name="images"
                        control={control}
                        rules={{ required: 'At least one image is required' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              onChange(files);
                            }}
                            onBlur={onBlur}
                          />
                        )}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? (
                  'Adding Product...'
                ) : (
                  <>
                    <FiLayers className="mr-2 h-5 w-5" />
                    Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;