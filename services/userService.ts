import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { UserProfile } from '../types/user';

export async function createUserProfile(
  userId: string,
  data: Pick<UserProfile, 'nome' | 'email' | 'curso'>
): Promise<void> {
  await setDoc(doc(db, 'users', userId), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, 'users', userId));
  if (!snapshot.exists()) return null;
  return snapshot.data() as UserProfile;
}
