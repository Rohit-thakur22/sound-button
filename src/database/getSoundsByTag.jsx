import { collection, query, where, getDocs, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase';

export const getSoundsByTag = async (tag, page = 0, pageSize = 40) => {
    // Validate tag input
    if (!Array.isArray(tag) || tag.length === 0) {
        return []; // Return an empty array if no tags are provided
    }

    try {
        // Define the query with pagination
        const soundQuery = query(
            collection(db, 'SOUNDS'),
            where('tags', 'array-contains-any', tag),
            where('is_deleted', '==', false),
            limit(pageSize) // Limit the number of results per page
        );

        // Fetch the query results
        const querySnapshot = await getDocs(soundQuery);

        // Process and return sound data
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching sounds by tag:', error);
        return []; // Return an empty array in case of errors
    }
};