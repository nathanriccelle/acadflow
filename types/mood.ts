export type HumorTipo = 'ruim' | 'neutro' | 'bem';

export interface MoodCheckin {
  humor: HumorTipo;
  nivel: number;
  destaque: boolean;
}
