import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const deleteSound = async (soundId) => {
    try {
        // Reference to the sound document in Firestore
        const soundRef = doc(db, 'SOUNDS', soundId);

        // Mark the sound as deleted
        await updateDoc(soundRef, { is_deleted: true });

        return { success: true, message: 'Sound successfully deleted' };
    } catch (error) {
        console.error('Error deleting sound:', error);
        return { success: false, message: 'Failed to delete sound' };
    }
};