import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const allCategories = async () => {

    try {

        // Fetch categories from Firestore
        const categoriesQuery = collection(db, 'CATEGORY');
        const querySnapshot = await getDocs(categoriesQuery);

        const categories = querySnapshot.docs.map(doc => ({
            value: doc.id,
            label: doc.data().name
        }));

        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories');
    }
};