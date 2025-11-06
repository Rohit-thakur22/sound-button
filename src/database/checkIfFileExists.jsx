import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Assuming db is your initialized Firestore instance

export const checkIfFilesExist = async (filesObject) => {
    try {
        const soundsCollection = collection(db, 'SOUNDS'); // Firestore collection reference

        // Extract unique file names from the input object
        const fileNames = Array.from(
            new Set(
                Object.values(filesObject).flatMap(file => {
                    const fullName = file.name; // e.g., "my.sound.boom.mp3"
                    const nameWithoutExtension = fullName.replace(/\.[^/.]+$/, ''); // e.g., "my.sound.boom"
                    return [nameWithoutExtension, `${nameWithoutExtension}.mp3`, `${nameWithoutExtension}.wav`];
                })
            )
        );

        // Combine batches into a single Firestore call when possible
        const batches = [];
        for (let i = 0; i < fileNames.length; i += 10) {
            batches.push(fileNames.slice(i, i + 10));
        }

        const batchedResults = await Promise.all(
            batches.map(async (batch) => {
                const q = query(
                    soundsCollection,
                    where('name', 'in', batch),
                    where('is_deleted', '==', false) // Only check non-deleted files
                );
                const querySnapshot = await getDocs(q);
                return querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            })
        );

        const existingFiles = batchedResults.flat();
        const filesFound = existingFiles.length > 0;

        return { filesFound, existingFiles };
    } catch (error) {
        console.error('Error checking files:', error);
        return { filesFound: false, existingFiles: [] };
    }
};