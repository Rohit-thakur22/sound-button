import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { allCategories } from './allCategories'; // Ensure the function path is correct

export const createCategory = async (categoryName) => {
    try {
        const categoryId = categoryName.toLowerCase().trim().replace(/ /g, '_');

        // Call getCategories to ensure categories are fetched from an optimized source
        const cachedCategories = await allCategories();
        const categoryExistsInCache = cachedCategories.some(category => category.value === categoryId);

        if (categoryExistsInCache) {
            return { success: true, message: 'Category already present in local' };
        }

        // Check if category exists in Firestore
        const categoryRef = doc(db, 'CATEGORY', categoryId);
        const existingCategory = await getDoc(categoryRef);
        if (existingCategory.exists()) {
            return { success: true, message: 'Category already present' };
        }

        // Add the category to Firestore
        await setDoc(categoryRef, { name: categoryName.trim() });

        // Update localStorage via allCategories (getCategories ensures consistency)
        const updatedCategories = [...cachedCategories, { value: categoryId, label: categoryName.trim() }];
        localStorage.setItem('all_categories', JSON.stringify(updatedCategories));

        return { success: true, message: 'Category created successfully' };
    } catch (error) {
        console.error('Error creating category:', error);
        return { success: false, message: error.message || 'Failed to create category' };
    }
};