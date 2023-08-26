import { create } from 'zustand';

interface settings {
  sets: number;
  values: number;
  rangefrom: number;
  rangeto: number;
  operators: string;
}

interface CalculationSettings {
  settings: settings;
  setSettings: (data: settings) => void;
}

export const useCalculationSettings = create<CalculationSettings>()((set) => ({
  settings: {
    sets: 5,
    values: 5,
    rangefrom: 0,
    rangeto: 100,
    operators: '+',
  },
  setSettings: (data) =>
    set(() => ({
      settings: data,
    })),
}));
