import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ReviewManagementPage = () => {
  const userState = useSelector((state) => state.user);
  const user = userState?.userInfo || JSON.parse(localStorage.getItem("userAccount"));

  // Fetch reviews
  const { data: reviews = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/review`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      return response.data;
    }
  });

  // Update review status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/review/${id}`, 
        { status }, 
        { headers: { Authorization: `Bearer ${user.token}` }}
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data);
      refetch();
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/review/${id}`, 
        { headers: { Authorization: `Bearer ${user.token}` }}
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data);
      refetch();
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  // Handle status update
  const handleUpdateStatus = (id, status) => {
    updateStatusMutation.mutate({ id, status });
  };

  // Handle delete review
  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReviewMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center">Something went wrong while fetching reviews.</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Review Management</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">Email</th>
                <th className="py-2 px-4 text-left">Rating</th>
                <th className="py-2 px-4 text-left hidden md:table-cell">Review</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{review.name}</td>
                  <td className="py-2 px-4 hidden sm:table-cell">{review.email}</td>
                  <td className="py-2 px-4">{review.rating}</td>
                  <td className="py-2 px-4 hidden md:table-cell">
                    <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {review.review}
                    </div>
                  </td>
                  <td className="py-2 px-4 capitalize">{review.status}</td>
                  <td className="py-2 px-4">
                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                        onClick={() => handleUpdateStatus(review._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        onClick={() => handleUpdateStatus(review._id, 'rejected')}
                      >
                        Reject
                      </button>
                      <button
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                        onClick={() => handleDeleteReview(review._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewManagementPage;