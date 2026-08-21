import type { Stop } from "../types/stops";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function searchStops(query: string): Promise<Stop[]> {
  const url = `${BASE_URL}/stops/?query=${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch stops");
  }
  const data = await response.json();
  return data;
}
