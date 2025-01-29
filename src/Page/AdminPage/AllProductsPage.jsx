
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiEye, FiEdit, FiTrash2, FiPackage } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const AllProductsPage = () => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const user = userState?.userInfo?.user || JSON.parse(localStorage.getItem("userAccount"));
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer/products`);
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (productId) => axios.delete(`${import.meta.env.VITE_API_URL}/admin/products/${productId}`, {headers: {Authorization: `Bearer ${user.token}`}}),
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete product');
      console.error('Delete error:', error);
    },
  });

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(productId);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error loading products: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <Link
          to="/admin/add-product"
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FiPackage className="mr-2 -ml-1 h-5 w-5" />
          Add New Product
        </Link>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SKU</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Stock</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.sku}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${product.price.toFixed(2)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.stock}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.category}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/productdetails/${product._id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <FiEye className="inline-block h-5 w-5" />
                          <span className="sr-only">View</span>
                        </Link>
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="text-yellow-600 hover:text-yellow-900 mr-4"
                        >
                          <FiEdit className="inline-block h-5 w-5" />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="inline-block h-5 w-5" />
                          <span className="sr-only">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;