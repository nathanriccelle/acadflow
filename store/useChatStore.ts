import { Unsubscribe } from 'firebase/firestore';
import { create } from 'zustand';
import { addMessage, ensureWelcomeMessage, subscribeMessages } from '../services/chatService';
import type { Mensagem } from '../types/chat';
import { getRespostaBot, getSaudacaoBot } from '../utils/chatBot';

const BOT_DELAY_MS = 1500;

let unsubscribeMessages: Unsubscribe | null = null;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface ChatStore {
  mensagens: Mensagem[];
  loading: boolean;
  enviando: boolean;
  botDigitando: boolean;
  inicializar: (userId: string, primeiroNome: string) => () => void;
  enviarMensagem: (userId: string, texto: string) => Promise<void>;
  reset: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  mensagens: [],
  loading: false,
  enviando: false,
  botDigitando: false,

  reset: () => {
    unsubscribeMessages?.();
    unsubscribeMessages = null;
    set({ mensagens: [], loading: false, enviando: false, botDigitando: false });
  },

  inicializar: (userId: string, primeiroNome: string) => {
    get().reset();
    set({ loading: true });

    const nome = primeiroNome.trim() || 'estudante';

    void ensureWelcomeMessage(userId, getSaudacaoBot(nome)).catch(() => {});

    unsubscribeMessages = subscribeMessages(
      userId,
      (mensagens) => set({ mensagens, loading: false }),
      () => set({ loading: false })
    );

    return () => get().reset();
  },

  enviarMensagem: async (userId: string, texto: string) => {
    const trimmed = texto.trim();
    if (!trimmed || get().enviando || get().botDigitando) return;

    set({ enviando: true });
    try {
      await addMessage(userId, trimmed, true);
      set({ enviando: false, botDigitando: true });

      const resposta = getRespostaBot(trimmed);
      await delay(BOT_DELAY_MS);
      await addMessage(userId, resposta, false);
    } finally {
      set({ enviando: false, botDigitando: false });
    }
  },
}));
