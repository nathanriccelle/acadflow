import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createUserProfile } from './userService';

export async function signIn(email: string, password: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return credential.user;
}

export async function signUp(
  email: string,
  password: string,
  nome: string,
  curso?: string
): Promise<User> {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );
  try {
    await createUserProfile(credential.user.uid, {
      nome: nome.trim(),
      email: email.trim(),
      curso: curso?.trim() ?? '',
    });
  } catch (error) {
    await credential.user.delete();
    throw error;
  }
  return credential.user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}
