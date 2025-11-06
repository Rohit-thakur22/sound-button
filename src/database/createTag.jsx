import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { allTags } from './allTags'; // Ensure the function path is correct

export const createTag = async (tagName) => {
    try {
        const tagId = tagName.toLowerCase().trim().replace(/ /g, '_');

        // Call getTags to ensure tags are fetched from an optimized source
        const cachedTags = await allTags();
        const tagExistsInCache = cachedTags.some(tag => tag.value === tagId);

        if (tagExistsInCache) {
            return { success: true, message: 'Tag already present in local' };
        }

        // Check if tag exists in Firestore
        const tagRef = doc(db, 'TAGS', tagId);
        const existingTag = await getDoc(tagRef);
        if (existingTag.exists()) {
            return { success: true, message: 'Tag already present' };
        }

        // Add the tag to Firestore
        await setDoc(tagRef, { name: tagName.trim() });

        // Update localStorage via allTags (getTags ensures consistency)
        const updatedTags = [...cachedTags, { value: tagId, label: tagName.trim() }];
        localStorage.setItem('all_tags', JSON.stringify(updatedTags));

        return { success: true, message: 'Tag created successfully' };
    } catch (error) {
        console.error('Error creating tag:', error);
        return { success: false, message: error.message || 'Failed to create tag' };
    }
};