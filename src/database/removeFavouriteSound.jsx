import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const removeFavouriteSound = async (soundId) => {
    const user = auth.currentUser;

    if (!user) {
        return { success: false, message: 'Not logged in' };
    }

    const userRef = doc(db, 'USERS', user.uid);
    const soundRef = doc(db, 'SOUNDS', soundId);

    try {
        // Fetch user document
        const userSnapshot = await getDoc(userRef);
        if (!userSnapshot.exists()) {
            return { success: false, message: 'User not found' };
        }

        const userData = userSnapshot.data();
        const currentSounds = userData.favourite_sounds || [];

        // Check if the sound exists in user's favorite sounds
        const soundToRemove = currentSounds.find(sound => sound.id === soundId);
        if (!soundToRemove) {
            return { success: false, message: 'Sound not found in favorites' };
        }

        // Remove the sound from favorite sounds in Firestore
        const updatedSounds = currentSounds.filter(sound => sound.id !== soundId);
        await updateDoc(userRef, {
            favourite_sounds: updatedSounds
        });

        // Update the favorites count in the SOUNDS collection
        await updateDoc(soundRef, {
            favorites: increment(-1),
        });

        // Update local storage
        const cachedData = JSON.parse(localStorage.getItem('logged_in_user')) || {};
        cachedData.favourite_sounds = updatedSounds;
        localStorage.setItem('logged_in_user', JSON.stringify(cachedData));

        return { success: true, message: 'Sound removed from favorites' };
    } catch (error) {
        console.error('Error removing favorite sound:', error);
        return { success: false, message: 'Error removing favorite sound' };
    }
};
