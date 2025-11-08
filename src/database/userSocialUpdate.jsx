import api from '../lib/api';

export const userSocialUpdate = async (instagram, discord, youtube) => {
    try {
        const response = await api.post('/auth/update-profile', {
            instagramLink: instagram || '',
            discordLink: discord || '',
            youtubeLink: youtube || '',
        });

        return response.data;
    } catch (error) {
        console.error('Error updating social links:', error);
        throw error;
    }
};
