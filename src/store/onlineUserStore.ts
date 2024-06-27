import { create } from "zustand";

interface ActiveListStore {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

export const useActive = create<ActiveListStore>((set) => ({
  members: [],
  add: (id) =>
    set((state) => ({
      members: [...state.members.filter((item) => item !== id), id],
    })),
  remove: (id) =>
    set((state) => ({
      members: state.members.filter((item) => item !== id),
    })),
  set: (ids) => {
    if (Array.isArray(ids)) {
      set(() => ({
        members: ids,
      }));
    } else {
      console.error("The provided ids are not an array:", ids);
    }
  },
}));
