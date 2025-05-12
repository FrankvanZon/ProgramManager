import { DateArg, format, formatDistanceToNow } from "date-fns";
import { z } from "zod";

export function formatDate(date: DateArg<Date>) {
    return format(date, "yy'wk'ww")
}

export function timeAgo(date: DateArg<Date>) {
    return formatDistanceToNow(date) + ' ago'
}

export const requiredString = (fieldName: string) => z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` })

export function quarterToIndex(q: number): number {
    const year = Math.floor(q / 100); // e.g., 24
    const quarter = q % 100;          // e.g., 01
    return (year * 4) + (quarter - 1); // e.g., (24 * 4) + (1 - 1) = 96
}

// Utility to convert quarter index back to YYQQ format
export const indexToQuarter = (index: number): string => {
  const year = Math.floor(index / 4);
  const quarter = (index % 4) + 1;
  return `20${year.toString().padStart(2, "0")} Q${quarter}`;
};