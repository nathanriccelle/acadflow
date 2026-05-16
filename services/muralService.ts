import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Desabafo } from '../types/mural';

const MAX_TEXTO = 2000;

type PostBase = Pick<Desabafo, 'id' | 'texto' | 'likes'>;

export function subscribePosts(
  onChange: (posts: PostBase[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(collection(db, 'desabafos'), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const posts = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        texto: docSnap.data().texto as string,
        likes: (docSnap.data().likes as number) ?? 0,
      }));
      onChange(posts);
    },
    (error) => onError?.(error)
  );
}

/** Índice dos posts curtidos pelo usuário (evita collectionGroup + documentId). */
export function subscribeUserLikes(
  userId: string,
  onChange: (likedPostIds: Set<string>) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const ref = collection(db, 'users', userId, 'muralLikes');

  return onSnapshot(
    ref,
    (snapshot) => {
      const ids = new Set(snapshot.docs.map((docSnap) => docSnap.id));
      onChange(ids);
    },
    (error) => onError?.(error)
  );
}

export async function createPost(userId: string, texto: string): Promise<void> {
  const trimmed = texto.trim();
  if (!trimmed) throw new Error('Texto vazio');
  if (trimmed.length > MAX_TEXTO) throw new Error('Texto muito longo');

  await addDoc(collection(db, 'desabafos'), {
    texto: trimmed,
    likes: 0,
    authorId: userId,
    createdAt: serverTimestamp(),
  });
}

export async function toggleLike(postId: string, userId: string): Promise<void> {
  const postRef = doc(db, 'desabafos', postId);
  const likeRef = doc(db, 'desabafos', postId, 'likes', userId);
  const userLikeIndexRef = doc(db, 'users', userId, 'muralLikes', postId);

  await runTransaction(db, async (transaction) => {
    const postSnap = await transaction.get(postRef);
    const likeSnap = await transaction.get(likeRef);

    if (!postSnap.exists()) return;

    const currentLikes = (postSnap.data().likes as number) ?? 0;

    if (likeSnap.exists()) {
      transaction.delete(likeRef);
      transaction.delete(userLikeIndexRef);
      transaction.update(postRef, { likes: Math.max(0, currentLikes - 1) });
    } else {
      transaction.set(likeRef, { createdAt: serverTimestamp() });
      transaction.set(userLikeIndexRef, { createdAt: serverTimestamp() });
      transaction.update(postRef, { likes: currentLikes + 1 });
    }
  });
}

export { MAX_TEXTO };
