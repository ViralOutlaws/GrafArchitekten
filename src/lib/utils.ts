import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatYear(year: number): string {
  return year.toString();
}

export function formatYearRange(start: number, end?: number): string {
  if (!end || end === start) return start.toString();
  return `${start}–${end}`;
}
