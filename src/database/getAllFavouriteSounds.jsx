import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const getAllFavouriteSounds = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, message: 'Not logged in' };
        }

        const userRef = doc(db, 'USERS', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return { success: false, message: 'User document does not exist' };
        }

        const userData = userDoc.data();
        const favouriteSounds = userData.favourite_sounds || [];

        // Cache the data
        localStorage.setItem('logged_in_user', JSON.stringify(userData));
        return { success: true, sounds: favouriteSounds };
    } catch (error) {
        console.error('Error fetching favorite sounds:', error);
        return { success: false, message: 'Error fetching favorite sounds' };
    }
};