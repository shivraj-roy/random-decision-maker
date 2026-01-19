import { LocalStorage } from "@raycast/api";

// Robust ID generator to avoid crypto ReferenceErrors in some environments
const generateId = () => Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

// Types
export interface Decision {
  id: string;
  type: "yes-no" | "wheel";
  question: string;
  options?: string[];
  result: string;
  timestamp: number;
}

export interface WheelPreset {
  id: string;
  name: string;
  options: string[];
  createdAt: number;
}

// Storage keys
const HISTORY_KEY = "decision-history";
const PRESETS_KEY = "wheel-presets";

// History functions
export async function getHistory(): Promise<Decision[]> {
  const data = await LocalStorage.getItem<string>(HISTORY_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addToHistory(decision: Omit<Decision, "id" | "timestamp">): Promise<void> {
  const history = await getHistory();
  const newDecision: Decision = {
    ...decision,
    id: generateId(),
    timestamp: Date.now(),
  };
  // Keep last 100 decisions
  const updated = [newDecision, ...history].slice(0, 100);
  await LocalStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export async function deleteDecision(id: string): Promise<void> {
  const history = await getHistory();
  const updated = history.filter((d) => d.id !== id);
  await LocalStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export async function clearHistory(): Promise<void> {
  await LocalStorage.removeItem(HISTORY_KEY);
}

// Preset functions
export async function getPresets(): Promise<WheelPreset[]> {
  const data = await LocalStorage.getItem<string>(PRESETS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function savePreset(name: string, options: string[]): Promise<void> {
  const presets = await getPresets();
  const newPreset: WheelPreset = {
    id: generateId(),
    name,
    options,
    createdAt: Date.now(),
  };
  await LocalStorage.setItem(PRESETS_KEY, JSON.stringify([newPreset, ...presets]));
}

export async function deletePreset(id: string): Promise<void> {
  const presets = await getPresets();
  const updated = presets.filter((p) => p.id !== id);
  await LocalStorage.setItem(PRESETS_KEY, JSON.stringify(updated));
}
