import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Mensagem } from '../types/chat';

const SESSION_ID = 'principal';

function sessionDoc(userId: string) {
  return doc(db, 'users', userId, 'chatSessions', SESSION_ID);
}

function messagesCollection(userId: string) {
  return collection(db, 'users', userId, 'chatSessions', SESSION_ID, 'messages');
}

export async function ensureSession(userId: string): Promise<void> {
  await setDoc(sessionDoc(userId), { updatedAt: serverTimestamp() }, { merge: true });
}

export async function ensureWelcomeMessage(
  userId: string,
  textoBoasVindas: string
): Promise<void> {
  await ensureSession(userId);

  const snap = await getDocs(query(messagesCollection(userId), limit(1)));
  if (!snap.empty) return;

  await addDoc(messagesCollection(userId), {
    texto: textoBoasVindas,
    isUsuario: false,
    createdAt: serverTimestamp(),
  });
}

export function subscribeMessages(
  userId: string,
  onChange: (mensagens: Mensagem[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(messagesCollection(userId), orderBy('createdAt', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const mensagens = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        texto: docSnap.data().texto as string,
        isUsuario: Boolean(docSnap.data().isUsuario),
      }));
      onChange(mensagens);
    },
    (error) => onError?.(error)
  );
}

export async function addMessage(
  userId: string,
  texto: string,
  isUsuario: boolean
): Promise<void> {
  await ensureSession(userId);
  await addDoc(messagesCollection(userId), {
    texto: texto.trim(),
    isUsuario,
    createdAt: serverTimestamp(),
  });
}
