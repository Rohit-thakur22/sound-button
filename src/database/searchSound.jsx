import { collection, query, where, orderBy, getDocs, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust import paths

export const searchSounds = async (searchString, page = 0, limitPerPage = 40) => {
    const normalizedSearchString = searchString.trim().toLowerCase();
    const searchTerms = normalizedSearchString.split(/\s+/).filter(term => term.length > 0);
    if (searchTerms.length === 0) {
        return [];
    }

    try {
        let lastVisible = null;

        if (page > 0) {
            const previousQuery = query(
                collection(db, 'SOUNDS'),
                where('is_deleted', '==', false),
                where('search_keywords', 'array-contains-any', searchTerms),
                orderBy('downloads', 'desc'),
                limit(page * limitPerPage)
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
                where('is_deleted', '==', false),
                where('search_keywords', 'array-contains-any', searchTerms),
                orderBy('downloads', 'desc'),
                startAfter(lastVisible),
                limit(limitPerPage)
            )
            : query(
                collection(db, 'SOUNDS'),
                where('is_deleted', '==', false),
                where('search_keywords', 'array-contains-any', searchTerms),
                orderBy('downloads', 'desc'),
                limit(limitPerPage)
            );

        const querySnapshot = await getDocs(soundQuery);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error during sound search:', error);
        throw new Error('Failed to search sounds');
    }
};