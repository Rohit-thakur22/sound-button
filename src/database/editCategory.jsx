import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { allCategories } from './allCategories'; // Ensure the correct path to fetch all categories

export const editCategory = async (categoryId, newCategoryName) => {
    try {
        if (!categoryId || !newCategoryName) {
            throw new Error('Category ID and new name are required');
        }

        // Reference to the specific category document in Firestore
        const categoryRef = doc(db, 'CATEGORY', categoryId);

        // Check if category exists
        const categoryDoc = await getDoc(categoryRef);
        if (!categoryDoc.exists()) {
            throw new Error('Category does not exist');
        }

        // Update the name of the category in Firestore
        await updateDoc(categoryRef, {
            name: newCategoryName.trim(),
        });

        // Update localStorage cache if categories are cached
        const cachedCategories = await allCategories();
        const updatedCategories = cachedCategories.map(category =>
            category.value === categoryId
                ? { ...category, label: newCategoryName.trim() }
                : category
        );
        localStorage.setItem('all_categories', JSON.stringify(updatedCategories));

        return { success: true, message: 'Category updated successfully' };
    } catch (error) {
        console.error('Error updating category name:', error);
        return { success: false, message: error.message || 'Unable to update category name.' };
    }
};