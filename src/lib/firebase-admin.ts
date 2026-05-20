import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const storageBucket =
  process.env.FIREBASE_STORAGE_BUCKET ||
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  "remot3forg3.firebasestorage.app";

const adminApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        storageBucket,
      });

export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);