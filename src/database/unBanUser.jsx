import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { listAllUsers } from './listAllUsers'; // Ensure the function path is correct

export const unBanUser = async (userId) => {
    try {
        // Reference to the user's Firestore document
        const userRef = doc(db, 'USERS', userId);

        // Update the user's document to set is_banned to false
        await updateDoc(userRef, { is_banned: false });

        // Use listAllUsers to fetch or update the local cache
        const cachedUsers = await listAllUsers();
        const updatedUsers = cachedUsers.map(user =>
            user.id === userId ? { ...user, is_banned: false } : user
        );
        localStorage.setItem('all_users', JSON.stringify(updatedUsers));

        return { success: true, message: 'Ban revoked successfully' };
    } catch (error) {
        console.error('Error revoking ban:', error);
        return { success: false, message: 'Unable to revoke ban' };
    }
};