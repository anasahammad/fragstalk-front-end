import axios from "axios";

export const getUserByIdForUser = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me/${userId}`,
        {
          withCredentials: true,
        }
  
      );
  
      console.log("response", response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };