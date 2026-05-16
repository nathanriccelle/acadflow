import { create } from 'zustand';
import { DiaHumor } from '../components/GraficoHumor';
import { loadMoodData, saveMoodCheckin } from '../services/moodService';
import type { HumorTipo } from '../types/mood';
import { buildEmptyWeek, buildWeeklyChart } from '../utils/moodUtils';

interface MoodStoreData {
  humorDeHoje: HumorTipo | null;
  historicoSemanal: DiaHumor[];
  streak: number;
  sessoesRespiracaoSemana: number;
  completouRespiracaoHoje: boolean;
  loading: boolean;
  saving: boolean;
  inicializar: (userId: string) => Promise<void>;
  salvarHumorHoje: (userId: string, humor: HumorTipo) => Promise<void>;
  reset: () => void;
}

const initialState = {
  humorDeHoje: null as HumorTipo | null,
  historicoSemanal: buildEmptyWeek(),
  streak: 0,
  sessoesRespiracaoSemana: 0,
  completouRespiracaoHoje: false,
  loading: false,
  saving: false,
};

export const useMoodStore = create<MoodStoreData>((set, get) => ({
  ...initialState,

  reset: () => set({ ...initialState, historicoSemanal: buildEmptyWeek() }),

  inicializar: async (userId: string) => {
    set({ loading: true });
    try {
      const data = await loadMoodData(userId);
      set({
        humorDeHoje: data.humorDeHoje,
        historicoSemanal: buildWeeklyChart(data.checkins),
        streak: data.streak,
        sessoesRespiracaoSemana: data.sessoesRespiracaoSemana,
        completouRespiracaoHoje: data.completouRespiracaoHoje,
        loading: false,
      });
    } catch {
      set({ loading: false });
    }
  },

  salvarHumorHoje: async (userId: string, humor: HumorTipo) => {
    set({ saving: true });
    try {
      await saveMoodCheckin(userId, humor);
      await get().inicializar(userId);
    } finally {
      set({ saving: false });
    }
  },
}));
