import { useState, useEffect } from "react";
import axios from "axios";
import { FaCloudUploadAlt, FaInfo, FaTimes, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const CustomerBanner = () => {
  const [bannerPhotos, setBannerPhotos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drbtvputr/upload";
  const CLOUDINARY_PRESET = "rowshanara";

  const fetchBannerPhotos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/banner`);
      setBannerPhotos(response.data || []);
    } catch (error) {
      toast.error("Error fetching banner photos");
    }
  };

  useEffect(() => {
    fetchBannerPhotos();
  }, []);

  const uploadPhotos = async () => {
    if (selectedFiles.length === 0) {
      return toast.error('Please select at least one file');
    }

    setLoading(true);

    try {
      const uploadedUrls = [];
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_PRESET);

        const cloudinaryResponse = await axios.post(CLOUDINARY_URL, formData);
        const { secure_url } = cloudinaryResponse.data;
        uploadedUrls.push(secure_url);
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/banner`, {
        bannerPhoto: uploadedUrls,
      });

      toast.success('Photos uploaded successfully!');
      setSelectedFiles([]);
      setPreviewUrls([]);
      fetchBannerPhotos();
    } catch (error) {
      console.error('Error uploading photos:', error);
      toast.error('Error uploading photos');
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/banner/${id}`);
      toast.success("Photo deleted successfully.");
      setBannerPhotos(bannerPhotos.filter((photo) => photo._id !== id));
    } catch (error) {
      toast.error("Error deleting photo");
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const newPreviewUrls = fileArray.map((file) => URL.createObjectURL(file));
  
      setSelectedFiles(fileArray);
      setPreviewUrls(newPreviewUrls);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen  md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-2 md:p-6">
        <div className="flex md:justify-between flex-col md:flex-row md:items-center mb-8 gap-2">
          <h1 className="text-3xl font-bold text-gray-800">Cover Photo Manager</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 flex items-center"
          >
            <FaInfo className="mr-2" /> Upload Rules
          </button>
        </div>

        <div className="mb-8">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition duration-300"
          >
            <FaCloudUploadAlt className="text-4xl text-gray-400 mr-4" />
            <span className="text-lg font-medium text-gray-600">
              {selectedFiles.length > 0 ? 'Change Photos' : 'Select Photos'}
            </span>
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
        </div>

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img src={url || "/placeholder.svg"} alt={`Preview ${index}`} className="w-full h-48 object-cover rounded-lg" />
                <button
                  onClick={() => {
                    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
                    const updatedUrls = previewUrls.filter((_, i) => i !== index);
                    setSelectedFiles(updatedFiles);
                    setPreviewUrls(updatedUrls);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={uploadPhotos}
          disabled={loading || selectedFiles.length === 0}
          className={`w-full py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 ${loading || selectedFiles.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Uploading..." : "Upload Photos"}
        </button>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Cover Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bannerPhotos?.map((photo, index) => (
              <div key={index} className="relative group">
                <img src={photo?.bannerPhoto || "/placeholder.svg"} alt={`Banner ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => deletePhoto(photo._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Rules</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center"><span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">1</span> Image aspect ratio must be 16:9.</li>
              <li className="flex items-center"><span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">2</span> Maximum file size: 10MB.</li>
              <li className="flex items-center"><span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">3</span> Supported formats: JPG, PNG, JPEG, webp.</li>
              <li className="flex items-center"><span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">4</span> Minimum resolution: qHD (540 × 960) pixels.</li>
              <li className="flex items-center"><span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">5</span> Maximum resolutions:</li>
              <ul className="ml-9 space-y-2">
                <li>• HD (720 × 1280) pixels</li>
                <li>• Full HD (1080 × 1920) pixels</li>
                <li>• QHD (1440 × 2560) pixels</li>
                <li>• 4K UHD (2160 × 3840) pixels</li>
              </ul>
            </ul>
            <div className="mt-8 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerBanner;