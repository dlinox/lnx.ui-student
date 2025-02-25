export const PERIOD_TYPES_OPTIONS = [
  "REGULAR",
  "VACACIONAL",
  "NIVELACION",
  "RECUPERACION",
] as const;
export type PeriodType = (typeof PERIOD_TYPES_OPTIONS)[number];
