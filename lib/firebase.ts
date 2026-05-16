import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { Auth, getAuth, initializeAuth, type Persistence } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Variável ${name} não definida. Configure o arquivo .env na raiz do projeto.`
    );
  }
  return value;
}

const firebaseConfig = {
  apiKey: requireEnv('EXPO_PUBLIC_FIREBASE_API_KEY'),
  authDomain: requireEnv('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: requireEnv('EXPO_PUBLIC_FIREBASE_PROJECT_ID'),
  appId: requireEnv('EXPO_PUBLIC_FIREBASE_APP_ID'),
  ...(process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET && {
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  }),
  ...(process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID && {
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  }),
};

function createAuth(app: FirebaseApp): Auth {
  if (Platform.OS === 'web') {
    return getAuth(app);
  }

  const { getReactNativePersistence } = require('@firebase/auth') as {
    getReactNativePersistence: (storage: typeof AsyncStorage) => Persistence;
  };

  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(app);
  }
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth: Auth = createAuth(app);
export const db: Firestore = getFirestore(app);
