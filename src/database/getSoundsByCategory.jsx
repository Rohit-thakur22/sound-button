import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

export const getSoundsByCategory = async (category, page = 0) => {
  const catQuery = collection(db, "CATEGORY");
  const catSnapshot = await getDocs(catQuery);

  let catList = {};
  catSnapshot.docs.forEach((doc) => {
    catList[doc.id] = doc.data().name;
  });

  let lastVisible = null;
  if (page > 0) {
    const previousQuery = query(
      collection(db, "SOUNDS"),
      where("category", "array-contains", category),
      where("is_deleted", "==", false),
      limit(page * 40)
    );
    const previousSnapshot = await getDocs(previousQuery);
    const docs = previousSnapshot.docs;
    if (docs.length > 0) {
      lastVisible = docs[docs.length - 1];
    }
  }

  const soundsQuery = lastVisible
    ? query(
        collection(db, "SOUNDS"),
        where("category", "array-contains", category),
        where("is_deleted", "==", false),
        startAfter(lastVisible)
      )
    : query(
        collection(db, "SOUNDS"),
        where("category", "array-contains", category),
        where("is_deleted", "==", false)
      );

  const querySnapshot = await getDocs(soundsQuery);

  const sounds = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    cat: (doc.data().category || []).map((catId) => catList[catId] || catId),
    ...doc.data(),
  }));

  return sounds;
};

// just added function to get sounds
export const getJustAddedSounds = async (page = 0) => {
  let lastVisible = null;

  if (page > 0) {
    const previousQuery = query(
      collection(db, "SOUNDS"),
      where("is_deleted", "==", false),
      orderBy("created_at", "desc"),
      limit(page * 40)
    );
    const previousSnapshot = await getDocs(previousQuery);
    const docs = previousSnapshot.docs;
    if (docs.length > 0) {
      lastVisible = docs[docs.length - 1];
    }
  }

  const soundsQuery = lastVisible
    ? query(
        collection(db, "SOUNDS"),
        where("is_deleted", "==", false),
        orderBy("created_at", "desc"),
        startAfter(lastVisible),
        limit(40)
      )
    : query(
        collection(db, "SOUNDS"),
        where("is_deleted", "==", false),
        orderBy("created_at", "desc"),
        limit(40)
      );

  const querySnapshot = await getDocs(soundsQuery);

  const sounds = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return sounds;
};
