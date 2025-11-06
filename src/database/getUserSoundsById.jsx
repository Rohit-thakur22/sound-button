// This function is now deprecated - use soundsAPI.getSoundsByUser() directly
// Keeping for backward compatibility but not recommended for new code

import { soundsAPI } from "@/lib/apiServices";

export const getUserSoundsById = async (userId, page = 0, limitPerPage = 40) => {
    console.warn('getUserSoundsById is deprecated. Use soundsAPI.getSoundsByUser() directly.');
    
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }

        // Use the API to get user sounds
        const response = await soundsAPI.getSoundsByUser(userId);
        
        // Transform the API response to match the expected format
        const sounds = response.data.sounds.map(sound => ({
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

        return sounds;
    } catch (error) {
        console.error('Error fetching user sounds:', error);
        throw new Error('Failed to fetch user sounds');
    }
};