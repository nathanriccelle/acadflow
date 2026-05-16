import { Unsubscribe } from 'firebase/firestore';
import { create } from 'zustand';
import {
  createPost,
  subscribePosts,
  subscribeUserLikes,
  toggleLike,
} from '../services/muralService';
import type { Desabafo } from '../types/mural';

let unsubscribePosts: Unsubscribe | null = null;
let unsubscribeLikes: Unsubscribe | null = null;
let likedPostIds = new Set<string>();
let latestPosts: Pick<Desabafo, 'id' | 'texto' | 'likes'>[] = [];

function buildDesabafos(): Desabafo[] {
  return latestPosts.map((post) => ({
    ...post,
    curtiu: likedPostIds.has(post.id),
  }));
}

interface MuralStore {
  desabafos: Desabafo[];
  loading: boolean;
  saving: boolean;
  inicializar: (userId: string) => () => void;
  publicar: (userId: string, texto: string) => Promise<void>;
  alternarLike: (userId: string, postId: string) => Promise<void>;
  reset: () => void;
}

export const useMuralStore = create<MuralStore>((set, get) => ({
  desabafos: [],
  loading: false,
  saving: false,

  reset: () => {
    unsubscribePosts?.();
    unsubscribeLikes?.();
    unsubscribePosts = null;
    unsubscribeLikes = null;
    likedPostIds = new Set();
    latestPosts = [];
    set({ desabafos: [], loading: false, saving: false });
  },

  inicializar: (userId: string) => {
    get().reset();
    set({ loading: true });

    const sync = () => set({ desabafos: buildDesabafos(), loading: false });

    unsubscribeLikes = subscribeUserLikes(
      userId,
      (ids) => {
        likedPostIds = ids;
        sync();
      },
      () => set({ loading: false })
    );

    unsubscribePosts = subscribePosts(
      (posts) => {
        latestPosts = posts;
        sync();
      },
      () => set({ loading: false })
    );

    return () => get().reset();
  },

  publicar: async (userId, texto) => {
    set({ saving: true });
    try {
      await createPost(userId, texto);
    } finally {
      set({ saving: false });
    }
  },

  alternarLike: async (userId, postId) => {
    set({ saving: true });
    try {
      await toggleLike(postId, userId);
    } finally {
      set({ saving: false });
    }
  },
}));
