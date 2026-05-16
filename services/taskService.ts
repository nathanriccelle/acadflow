import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Unsubscribe,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Tarefa } from '../types/task';

function mapDocToTarefa(id: string, data: Record<string, unknown>): Tarefa {
  return {
    id,
    titulo: data.titulo as string,
    horario: data.horario as string,
    concluida: Boolean(data.concluida),
  };
}

export function subscribeTasks(
  userId: string,
  onChange: (tarefas: Tarefa[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const ref = collection(db, 'users', userId, 'tasks');
  const q = query(ref, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const tarefas = snapshot.docs.map((docSnap) =>
        mapDocToTarefa(docSnap.id, docSnap.data())
      );
      onChange(tarefas);
    },
    (error) => onError?.(error)
  );
}

export async function createTask(
  userId: string,
  titulo: string,
  horario: string
): Promise<void> {
  await addDoc(collection(db, 'users', userId, 'tasks'), {
    titulo,
    horario,
    concluida: false,
    createdAt: serverTimestamp(),
  });
}

export async function toggleTask(
  userId: string,
  taskId: string,
  concluida: boolean
): Promise<void> {
  await updateDoc(doc(db, 'users', userId, 'tasks', taskId), {
    concluida,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTask(userId: string, taskId: string): Promise<void> {
  await deleteDoc(doc(db, 'users', userId, 'tasks', taskId));
}
