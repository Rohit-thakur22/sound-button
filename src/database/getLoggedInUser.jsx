import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Adjust paths as necessary

// Key for storing user data in localStorage
const USER_STORAGE_KEY = 'logged_in_user';

// Function to get the logged-in user data from localStorage or Firestore
export const getLoggedInUser = async () => {
    try {
        // Check if user data exists in localStorage
        const localUser = localStorage.getItem(USER_STORAGE_KEY);

        if (localUser) {
            // Parse and return the user data from localStorage
            return JSON.parse(localUser);
        }

        // If not found in localStorage, fetch from Firestore
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error('No user is logged in');
        }

        const userRef = doc(db, 'USERS', currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
            throw new Error('User not found');
        }

        // Store fetched user data in localStorage
        const userData = { id: userSnapshot.id, ...userSnapshot.data() };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

        return userData;
    } catch (error) {
        console.error('Error fetching logged-in user:', error);
        throw new Error('Failed to fetch user');
    }
};