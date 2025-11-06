import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { listAllUsers } from './listAllUsers'; // Ensure the function path is correct

// Function to ban a user
export const banUser = async (userId) => {
    try {
        // Reference to the user's Firestore document
        const userRef = doc(db, 'USERS', userId);

        // Update the user's document to set is_banned to true
        await updateDoc(userRef, { is_banned: true });

        // Use listAllUsers to fetch or update the local cache
        const cachedUsers = await listAllUsers();
        const updatedUsers = cachedUsers.map(user =>
            user.id === userId ? { ...user, is_banned: true } : user
        );
        localStorage.setItem('all_users', JSON.stringify(updatedUsers));

        return { success: true, message: 'User successfully banned' };
    } catch (error) {
        console.error('Error banning user:', error);
        return { success: false, message: 'Unable to ban user' };
    }
};