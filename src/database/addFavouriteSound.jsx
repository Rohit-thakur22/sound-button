import { doc, updateDoc, arrayUnion, increment, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const addFavoriteSound = async (soundId) => {
const user = auth.currentUser;

if (!user) {
  return { success: false, message: 'Not logged in' };
}

const userRef = doc(db, 'USERS', user.uid);
const soundRef = doc(db, 'SOUNDS', soundId);

try {
  // Fetch the sound object using the soundId
  const soundSnapshot = await getDoc(soundRef);
  if (!soundSnapshot.exists()) {
      return { success: false, message: 'Sound not found' };
  }

  const sound = soundSnapshot.data();

  // Retrieve cached user data
  const cachedData = JSON.parse(localStorage.getItem('logged_in_user')) || {};
  const favouriteSounds = new Set(
      (cachedData.favourite_sounds || []).map(fav => fav.id)
  );

  // Check if sound is already in favorites
  if (favouriteSounds.has(soundId)) {
      return { success: false, message: 'Sound is already a favorite' };
  }

  // Update Firestore: Add the full sound object to user's favorites and increment favorite count on the sound
  await updateDoc(userRef, {
      favourite_sounds: arrayUnion({
          id: soundSnapshot.id, // Include the document ID
          ...sound, // Include the full sound object
      }),
  });

  await updateDoc(soundRef, {
      favorites: increment(1),
  });

  // Update local storage
  cachedData.favourite_sounds = [
      ...(cachedData.favourite_sounds || []),
      {
          id: soundSnapshot.id, // Include the document ID
          ...sound, // Include the full sound object
      },
  ];
  localStorage.setItem('logged_in_user', JSON.stringify(cachedData));

  return { success: true, message: 'Sound added to favorites' };
} catch (error) {
  console.error('Error adding favorite sound:', error);
  return { success: false, message: 'Error adding favorite sound' };
}
};