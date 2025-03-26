import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRegistration(
  prefix: string,
  lastRegistrationNumber: number
) {
  return `${prefix}${lastRegistrationNumber.toString().padStart(6, "0")}`;
}
