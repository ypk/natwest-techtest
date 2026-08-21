export const LAYOUT_STORAGE_KEY = "weather_layout_preference";

export const LAYOUTS = {
  LIST: "list",
  TABS: "tabs",
} as const;

export type LayoutMode = typeof LAYOUTS[keyof typeof LAYOUTS];
