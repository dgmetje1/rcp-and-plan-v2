import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isUndefined(value: unknown) {
  return value === undefined;
}

export function omitBy<T extends object>(value: T, predicate: (x: unknown) => boolean) {
  const result: Partial<T> = {};
  for (const key in value) {
    if (!predicate(value[key])) result[key] = value[key];
  }
  return result;
}
