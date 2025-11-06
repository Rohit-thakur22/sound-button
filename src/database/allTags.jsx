import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const TAGS_STORAGE_KEY = 'all_tags';

export const allTags = async () => {
    try {
        // Check if tags are cached
        const cachedTags = localStorage.getItem(TAGS_STORAGE_KEY);
        if (cachedTags) {
            return JSON.parse(cachedTags);
        }

        // Fetch tags from Firestore
        const tagsQuery = collection(db, 'TAGS');
        const querySnapshot = await getDocs(tagsQuery);

        const tags = querySnapshot.docs.map(doc => ({
            value: doc.id,
            label: doc.data().name
        }));

        // Cache the tags in localStorage
        localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(tags));

        return tags;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw new Error('Failed to fetch tags');
    }
};
