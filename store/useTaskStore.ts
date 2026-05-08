import { create } from 'zustand';

export interface Tarefa {
  id: string;
  titulo: string;
  horario: string;
  concluida: boolean;
}

interface TaskStore {
  tarefas: Tarefa[];
  alternarTarefa: (id: string) => void;
  adicionarTarefa: (titulo: string, horario: string) => void;
  removerTarefa: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({

  tarefas: [], 
  
  alternarTarefa: (id) => set((state) => ({
    tarefas: state.tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t)
  })),
  
  adicionarTarefa: (titulo, horario) => set((state) => ({
    tarefas: [...state.tarefas, { id: Math.random().toString(), titulo, horario, concluida: false }]
  })),

  removerTarefa: (id) => set((state) => ({
    tarefas: state.tarefas.filter(t => t.id !== id)
  })),
}));