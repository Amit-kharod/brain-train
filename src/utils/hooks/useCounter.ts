import { create } from "zustand";

interface CounterStore {
  counter: number;
  incrementCounter: () => void;
  resetCounter: () => void;
}

export const useCounter = create<CounterStore>((set) => ({
  counter: 1,
  incrementCounter: () => set((state) => ({ counter: state.counter + 1 })),
  resetCounter: () => set({ counter: 1 }),
}));
