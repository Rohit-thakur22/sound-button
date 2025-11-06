import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// Function to get a single sound by its ID
export const getSoundById = async (soundId) => {
    try {
        if (!soundId) {
            throw new Error('Sound ID is required');
        }

        // Reference to the sound document
        const soundRef = doc(db, 'SOUNDS', soundId);

        // Fetch the sound document
        const soundSnapshot = await getDoc(soundRef);

        // Check if the document exists
        if (!soundSnapshot.exists()) {
            throw new Error('Sound not found');
        }

        // Construct the sound object
        const soundData = soundSnapshot.data();
        const sound = {
            id: soundSnapshot.id,
            ...soundData,
        };

        return sound;

    } catch (error) {
        console.error('Error during sound fetch process:', error);
        return { success: false, message: error.message || 'Failed to fetch sound' };
    }
};