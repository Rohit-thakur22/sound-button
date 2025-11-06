import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const userSocialUpdate = async (instagram, discord, youtube) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userRef = doc(db, 'USERS', user.uid);

    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        await updateDoc(userRef, {
            instagram: instagram,
            discord: discord,
            youtube: youtube,
        });
    }

    return userDoc.data();
};
