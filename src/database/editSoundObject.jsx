import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const editSoundObject = async (soundId, newData) => {
    const soundRef = doc(db, 'SOUNDS', soundId);
    await updateDoc(soundRef, newData);
};