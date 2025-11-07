import { getCurrentUser } from '../lib/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CryptoJS from 'crypto-js';
import { db, storage } from '../../firebase'; // Adjust import paths

// Helper function to generate search keywords
const generateSearchKeywords = (name) => {
    return name
        .toLowerCase()
        .split(/\s+/) // Split by whitespace
        .filter(word => word.length > 0); // Remove empty words
};

export const uploadSound = async (file, soundData) => {
    const user = await getCurrentUser();

    if (!user) throw new Error('User not authenticated');

    const userId = user.id || user.uid || user._id;
    if (!userId) throw new Error('User ID not found');

    const soundId = `${userId}${Date.now()}`;
    const soundRef = ref(storage, `sounds/${soundId}`);

    // Upload the file to Firebase Storage
    await uploadBytes(soundRef, file);
    const url = await getDownloadURL(soundRef);

    // Encrypt the download URL
    const encryptedUrl = CryptoJS.AES.encrypt(url, 'myencryptiontext').toString();

    // Generate search keywords from the sound's name
    const searchKeywords = generateSearchKeywords(soundData.name);

    // Prepare the sound object for Firestore
    const soundObj = {
        ...soundData,
        uid: soundId,
        link: encryptedUrl,
        author: userId,
        downloads: 0,
        favorites: 0,
        tags: soundData.tags,
        category: soundData.category,
        search_keywords: searchKeywords,
        is_deleted: false
    };

    // Save the sound object to Firestore 
    await setDoc(doc(db, 'SOUNDS', soundId), soundObj);

    return { success: true, message: 'Sound uploaded successfully' };
};