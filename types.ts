
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: ContributionLevel;
}

export interface TooltipData {
  x: number;
  y: number;
  date: string;
  count: number;
}
