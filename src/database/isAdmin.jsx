import { checkIsAdmin, getCurrentUser } from '../lib/auth';

// Function to check if current user is admin
export const isAdmin = async (userId = null) => {
    try {
        const user = await getCurrentUser();
        
        if (!user) {
            return false;  // No user is signed in
        }

        // If userId is provided, check if it matches current user
        if (userId && user.id !== userId && user.uid !== userId && user._id !== userId) {
            return false;
        }

        // Check admin status
        const adminStatus = await checkIsAdmin();
        return adminStatus;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
};
