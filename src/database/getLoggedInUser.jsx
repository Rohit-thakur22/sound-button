import { getCurrentUser } from '../lib/auth';

// Function to get the logged-in user data from localStorage or API
export const getLoggedInUser = async () => {
    try {
        const user = await getCurrentUser();
        
        if (!user) {
            throw new Error('No user is logged in');
        }

        return user;
    } catch (error) {
        console.error('Error fetching logged-in user:', error);
        throw new Error('Failed to fetch user');
    }
};