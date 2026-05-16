import { DiaHumor } from '../components/GraficoHumor';
import type { HumorTipo, MoodCheckin } from '../types/mood';

const LABELS_DIA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function humorToChartValues(humor: HumorTipo): Pick<MoodCheckin, 'nivel' | 'destaque'> {
  if (humor === 'ruim') return { nivel: 20, destaque: false };
  if (humor === 'neutro') return { nivel: 50, destaque: false };
  return { nivel: 100, destaque: true };
}

export function getDateId(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDayLabel(date: Date): string {
  return LABELS_DIA[date.getDay()];
}

export function buildEmptyWeek(): DiaHumor[] {
  const result: DiaHumor[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = addDays(new Date(), -i);
    result.push({ dia: getDayLabel(date), nivel: 0, destaque: false });
  }
  return result;
}

export function buildWeeklyChart(checkins: Map<string, MoodCheckin>): DiaHumor[] {
  const result: DiaHumor[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = addDays(new Date(), -i);
    const dateId = getDateId(date);
    const checkin = checkins.get(dateId);
    result.push({
      dia: getDayLabel(date),
      nivel: checkin?.nivel ?? 0,
      destaque: checkin?.destaque ?? false,
    });
  }
  return result;
}

export function calculateStreak(checkinDateIds: Iterable<string>): number {
  const ids = new Set(checkinDateIds);
  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  if (!ids.has(getDateId(current))) {
    current = addDays(current, -1);
  }

  while (ids.has(getDateId(current))) {
    streak++;
    current = addDays(current, -1);
  }

  return streak;
}
