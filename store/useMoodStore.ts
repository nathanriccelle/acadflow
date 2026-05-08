import { create } from 'zustand';
import { DiaHumor } from '../components/GraficoHumor';


interface MoodStoreData {
  historicoSemanal: DiaHumor[];
  humorDeHoje: string | null;
  salvarHumorHoje: (humor: 'ruim' | 'neutro' | 'bem') => void;
}

export const useMoodStore = create<MoodStoreData>((set) => ({
  
  humorDeHoje: null,
  historicoSemanal: [
    { dia: 'S', nivel: 45, destaque: true },
    { dia: 'T', nivel: 60, destaque: true },
    { dia: 'Q', nivel: 30, destaque: false },
    { dia: 'Q', nivel: 90, destaque: true },
    { dia: 'S', nivel: 70, destaque: true },
    { dia: 'S', nivel: 20, destaque: false },
    { dia: 'D', nivel: 0, destaque: false },
  ],

  salvarHumorHoje: (humor) => set((state) => {
    

    let nivel = 0;
    let destaque = false;

    if (humor === 'ruim') { nivel = 20; destaque = false; }
    else if (humor === 'neutro') { nivel = 50; destaque = false; }
    else if (humor === 'bem') { nivel = 100; destaque = true; }

    const novoHistorico = [...state.historicoSemanal];
    novoHistorico[novoHistorico.length - 1] = { dia: 'D', nivel, destaque };

    return {
      humorDeHoje: humor,
      historicoSemanal: novoHistorico
    };
  }),
}));