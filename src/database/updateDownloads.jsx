import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust your Firebase import path

export const updateDownloads = async (soundId, authorId) => {
    const soundRef = doc(db, 'SOUNDS', soundId);
    const userRef = doc(db, 'USERS', authorId);
    try {
        // Increment downloads in the sound document
        await updateDoc(soundRef, {
            downloads: increment(1)
        });

        // Increment downloads in the author's user document
        await updateDoc(userRef, {
            downloads: increment(1)
        });

        return { success: true, message: 'Downloads updated successfully' };
    } catch (error) {
        console.error('Error updating downloads:', error);
        return { success: false, message: 'Error updating downloads' };
    }
};