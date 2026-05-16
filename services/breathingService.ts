import {
  collection,
  doc,
  documentId,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getDateId } from '../utils/moodUtils';

export const DURACAO_SESSAO_SEGUNDOS = 134;

export async function saveCompletedSession(
  userId: string,
  duracaoSegundos: number
): Promise<void> {
  const dateId = getDateId();

  await setDoc(
    doc(db, 'users', userId, 'breathingSessions', dateId),
    {
      duracaoSegundos,
      concluida: true,
      completedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function fetchBreathingDateIdsInRange(
  userId: string,
  startDateId: string,
  endDateId: string
): Promise<Set<string>> {
  const ref = collection(db, 'users', userId, 'breathingSessions');
  const q = query(
    ref,
    where(documentId(), '>=', startDateId),
    where(documentId(), '<=', endDateId)
  );

  const snapshot = await getDocs(q);
  const ids = new Set<string>();
  snapshot.forEach((docSnap) => ids.add(docSnap.id));
  return ids;
}
