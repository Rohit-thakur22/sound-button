import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import CryptoJS from 'crypto-js';
import { getAuth } from 'firebase/auth';

const generateSearchKeywords = (name) => {
    return name
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 0);
};

export const bulkUploadSounds = async (files, admin, categories) => {
    try {
        const storage = getStorage();
        const soundsCollection = collection(db, 'SOUNDS');
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('User is not authenticated');
        }

        const uploadResults = await Promise.all(
            Array.from(files).map(async (file, index) => {
                const soundId = `${user.uid}${Date.now()}_${index}`;
                const soundRef = ref(storage, `sounds/${soundId}`);

                await uploadBytes(soundRef, file);

                const downloadURL = await getDownloadURL(soundRef);

                const encryptedUrl = CryptoJS.AES.encrypt(downloadURL, 'myencryptiontext').toString();

                const searchKeywords = generateSearchKeywords(file.name.replace(/\.[^/.]+$/, ''));

                await addDoc(soundsCollection, {
                    name: file.name.replace(/\.[^/.]+$/, ''),
                    link: encryptedUrl,
                    description: '',
                    color: '#4285F4',
                    tags: [],
                    category: categories || [],
                    is_deleted: false,
                    created_at: new Date(),
                    downloads: 0,
                    favorites: 0,
                    author: admin,
                    uid: soundId,
                    search_keywords: searchKeywords,
                });

                return { name: file.name, downloadURL };
            })
        );
        return uploadResults;
    } catch (error) {
        console.error('Error during bulk upload:', error);
        throw new Error('Bulk upload failed');
    }
};