import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const createUser = async () => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('No authenticated user found');
        }

        const userRef = doc(db, 'USERS', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            const newUser = {
                name: user.displayName || 'Anonymous',
                email: user.email || '',
                uid: user.uid,
                created_sounds: [],
                favourite_sounds: [],
                rank: 0,
                downloads: 0, // Initialize download count
                is_banned: false,
                is_active: true,
                location: ''
            };

            await setDoc(userRef, newUser);
            return newUser;
        }

        return userDoc.data();
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create or fetch user');
    }
};