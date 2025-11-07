import { getCurrentUser } from '../lib/auth';
import { collection, query, where, getDocs, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase';

export const getUserSounds = async (page = 0, limitPerPage = 40) => {
    const user = await getCurrentUser();
    
    if (!user) throw new Error('User not authenticated');
    
    const userId = user.id || user.uid || user._id;
    if (!userId) throw new Error('User ID not found');
    let lastVisible = null;

    if (page > 0 ) {
        const previousQuery = query(
            collection(db, 'SOUNDS'),
            where('author', '==', userId),
            where('is_deleted', '==', false),
            // limit(page * limitPerPage)
        );
        const previousSnapshot = await getDocs(previousQuery);
        const docs = previousSnapshot.docs;
        if (docs.length > 0) {
            lastVisible = docs[docs.length - 1];
        }
    }

    const soundQuery = lastVisible
        ? query(
            collection(db, 'SOUNDS'),
            where('author', '==', userId),
            where('is_deleted', '==', false),
            startAfter(lastVisible),
            // limit(limitPerPage)
        ) : query(
                collection(db, 'SOUNDS'),
                where('author', '==', userId),
                where('is_deleted', '==', false),
                // limit(limitPerPage)
            );

    const querySnapshot = await getDocs(soundQuery);

    return querySnapshot.docs.map(doc => {
        const sound = { id: doc.id, ...doc.data() };

        return sound;
    });
};