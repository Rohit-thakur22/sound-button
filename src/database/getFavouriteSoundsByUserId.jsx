import { soundsAPI } from "@/lib/apiServices";

export const getFavouriteSoundsByUserId = async (userId) => {
    try {
        // Use the API to get user sounds (which includes favoriteSounds)
        const response = await soundsAPI.getSoundsByUser(userId);
        
        // Transform the favorite sounds from the API response
        const favoriteSounds = response.data.favoriteSounds.map(sound => ({
            id: sound.id,
            name: sound.name,
            link: sound.url,
            description: sound.description,
            author: response.data.authId,
            color: sound.color,
            favorites: sound.favorites,
            downloads: sound.downloads,
            tags: [], // API doesn't provide tags in this response
            is_deleted: sound.isDeleted,
            created_at: sound.createdAt
        }));

        return { success: true, sounds: favoriteSounds };
    } catch (error) {
        console.error('Error fetching favorite sounds by user ID:', error);
        return { success: false, message: 'Error fetching favorite sounds' };
    }
};