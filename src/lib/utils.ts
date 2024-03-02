import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function invokeAPI(url: string, args: { body?: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | "DELETE" }) {
  return await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...args
  })
}
