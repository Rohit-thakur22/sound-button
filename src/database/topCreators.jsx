import { soundsAPI } from "@/lib/apiServices";

export const topCreators = async () => {
    try {
        // Fetch top users from the API
        const response = await soundsAPI.getTopUsers();
        
        // Transform the API response to match the expected format
        const topCreators = response.data.map(creator => ({
            id: creator.id,
            name: creator.name,
            email: creator.email,
            authid: creator.authid,
            downloads: parseInt(creator.soundcount) || 0,
            soundcount: creator.soundcount,
            rank: creator.rank
        }));

        return topCreators;
    } catch (error) {
        console.error('Error fetching top creators:', error);
        throw error;
    }
};