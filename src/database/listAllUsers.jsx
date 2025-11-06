import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

const USERS_STORAGE_KEY = 'all_users';

export const listAllUsers = async () => {
    try {
        // Check if users are cached in localStorage
        const cachedUsers = localStorage.getItem(USERS_STORAGE_KEY);
        if (cachedUsers) {
            return JSON.parse(cachedUsers);
        }

        // Query to fetch active and non-banned users sorted by downloads
        const usersQuery = query(
            collection(db, 'USERS'),
            where('is_active', '==', true),
            orderBy('downloads', 'desc') // Ensure index is set for this query
        );

        const usersSnapshot = await getDocs(usersQuery);

        // Map user data from query results
        const usersData = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() // Includes precomputed `downloads` field
        }));

        // Store fetched users in localStorage
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));

        return usersData;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};