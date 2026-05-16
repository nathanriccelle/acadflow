import { Unsubscribe } from 'firebase/firestore';
import { create } from 'zustand';
import {
  createTask,
  deleteTask,
  subscribeTasks,
  toggleTask,
} from '../services/taskService';
import type { Tarefa } from '../types/task';

export type { Tarefa };

let unsubscribeTasks: Unsubscribe | null = null;

interface TaskStore {
  tarefas: Tarefa[];
  loading: boolean;
  saving: boolean;
  inicializar: (userId: string) => void;
  reset: () => void;
  adicionarTarefa: (userId: string, titulo: string, horario: string) => Promise<void>;
  alternarTarefa: (userId: string, id: string) => Promise<void>;
  removerTarefa: (userId: string, id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tarefas: [],
  loading: false,
  saving: false,

  reset: () => {
    unsubscribeTasks?.();
    unsubscribeTasks = null;
    set({ tarefas: [], loading: false, saving: false });
  },

  inicializar: (userId: string) => {
    unsubscribeTasks?.();
    set({ loading: true });

    unsubscribeTasks = subscribeTasks(
      userId,
      (tarefas) => set({ tarefas, loading: false }),
      () => set({ loading: false })
    );
  },

  adicionarTarefa: async (userId, titulo, horario) => {
    set({ saving: true });
    try {
      await createTask(userId, titulo, horario);
    } finally {
      set({ saving: false });
    }
  },

  alternarTarefa: async (userId, id) => {
    const tarefa = get().tarefas.find((t) => t.id === id);
    if (!tarefa) return;

    set({ saving: true });
    try {
      await toggleTask(userId, id, !tarefa.concluida);
    } finally {
      set({ saving: false });
    }
  },

  removerTarefa: async (userId, id) => {
    set({ saving: true });
    try {
      await deleteTask(userId, id);
    } finally {
      set({ saving: false });
    }
  },
}));
