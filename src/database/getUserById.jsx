import { soundsAPI } from "@/lib/apiServices";

export const getUserById = async (userId) => {
  try {
      // Use the API to get user data
      const response = await soundsAPI.getSoundsByUser(userId);
      
      // Transform the API response to match the expected format
      const userData = {
          id: response.data.id,
          authId: response.data.authId,
          name: response.data.name,
          email: response.data.email,
          photoUrl: response.data.photoUrl,
          phoneNumber: response.data.phoneNumber,
          location: response.data.location,
          downloads: response.data.downloads,
          is_banned: response.data.isBanned,
          is_active: response.data.isActive,
          rank: response.data.rank
      };

      return userData;
  } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Failed to fetch user');
  }
};
