import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getCurrentUser } from '../lib/auth';

export const userSocialUpdate = async (instagram, discord, youtube) => {
    const user = await getCurrentUser();
    
    if (!user) {
        throw new Error('User not authenticated');
    }

    const userId = user.id || user.uid || user._id;
    if (!userId) {
        throw new Error('User ID not found');
    }

    const userRef = doc(db, 'USERS', userId);

    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        await updateDoc(userRef, {
            instagram: instagram,
            discord: discord,
            youtube: youtube,
        });
    }

    return userDoc.data();
};
