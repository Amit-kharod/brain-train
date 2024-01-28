import { create } from "zustand";

interface CalculationSettings {
  sets: number;
  values: number;
  rangefrom: number;
  rangeto: number;
  operators: string;
}

interface DualCalculationSettings {
  fistValueRange: string;
  secondValueRange: string;
  operator: string;
}

interface TableSettings {
  fistValueRange: string;
  secondValueRange: string;
}

interface PowerSettings {
  range: string;
  powerMethod: string;
}

interface CalculationSettingsStore {
  settings: CalculationSettings;
  setSettings: (data: CalculationSettings) => void;
}

interface DualCalculationSettingsStore {
  settings: DualCalculationSettings;
  setSettings: (data: DualCalculationSettings) => void;
}

interface TableSettingsStore {
  settings: TableSettings;
  setSettings: (data: TableSettings) => void;
}

interface PowerSettingsStore {
  settings: PowerSettings;
  setSettings: (data: PowerSettings) => void;
}

export const useCalculationSettings = create<CalculationSettingsStore>()(
  (set) => ({
    settings: {
      sets: 5,
      values: 5,
      rangefrom: 0,
      rangeto: 100,
      operators: "+",
    },
    setSettings: (data) =>
      set(() => ({
        settings: data,
      })),
  })
);

export const useDualCalculationSettings =
  create<DualCalculationSettingsStore>()((set) => ({
    settings: {
      fistValueRange: "1-100",
      secondValueRange: "1-100",
      operator: "-",
    },
    setSettings: (data) =>
      set(() => ({
        settings: data,
      })),
  }));

export const useTableSettings = create<TableSettingsStore>()((set) => ({
  settings: {
    fistValueRange: "1-100",
    secondValueRange: "200",
  },
  setSettings: (data) =>
    set(() => ({
      settings: data,
    })),
}));

export const usePowerSettings = create<PowerSettingsStore>()((set) => ({
  settings: {
    range: "1-20",
    powerMethod: "square",
  },
  setSettings: (data) =>
    set(() => ({
      settings: data,
    })),
}));
