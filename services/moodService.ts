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
import type { HumorTipo, MoodCheckin } from '../types/mood';
import { fetchBreathingDateIdsInRange } from './breathingService';
import { addDays, calculateStreak, getDateId, humorToChartValues } from '../utils/moodUtils';

export async function saveMoodCheckin(userId: string, humor: HumorTipo): Promise<void> {
  const { nivel, destaque } = humorToChartValues(humor);
  const dateId = getDateId();

  await setDoc(
    doc(db, 'users', userId, 'moodCheckins', dateId),
    {
      humor,
      nivel,
      destaque,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function fetchMoodCheckinsInRange(
  userId: string,
  startDateId: string,
  endDateId: string
): Promise<Map<string, MoodCheckin>> {
  const ref = collection(db, 'users', userId, 'moodCheckins');
  const q = query(
    ref,
    where(documentId(), '>=', startDateId),
    where(documentId(), '<=', endDateId)
  );

  const snapshot = await getDocs(q);
  const map = new Map<string, MoodCheckin>();

  snapshot.forEach((docSnap) => {
    map.set(docSnap.id, docSnap.data() as MoodCheckin);
  });

  return map;
}

export async function loadMoodData(userId: string): Promise<{
  humorDeHoje: HumorTipo | null;
  checkins: Map<string, MoodCheckin>;
  streak: number;
  sessoesRespiracaoSemana: number;
  completouRespiracaoHoje: boolean;
}> {
  const todayId = getDateId();
  const weekStartId = getDateId(addDays(new Date(), -6));
  const streakStartId = getDateId(addDays(new Date(), -90));

  const [allCheckins, breathingStreakDates, breathingWeekDates] = await Promise.all([
    fetchMoodCheckinsInRange(userId, streakStartId, todayId),
    fetchBreathingDateIdsInRange(userId, streakStartId, todayId),
    fetchBreathingDateIdsInRange(userId, weekStartId, todayId),
  ]);

  const moodStreakDates = new Set(allCheckins.keys());

  const weekCheckins = new Map<string, MoodCheckin>();
  allCheckins.forEach((value, key) => {
    if (key >= weekStartId && key <= todayId) {
      weekCheckins.set(key, value);
    }
  });

  const today = allCheckins.get(todayId);

  const diasAtivos = new Set<string>([...moodStreakDates, ...breathingStreakDates]);

  return {
    humorDeHoje: today?.humor ?? null,
    checkins: weekCheckins,
    streak: calculateStreak(diasAtivos),
    sessoesRespiracaoSemana: breathingWeekDates.size,
    completouRespiracaoHoje: breathingStreakDates.has(todayId),
  };
}
