import type { TripResult } from "../types/trips";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function searchTrips(
  originId: string,
  destId: string,
): Promise<TripResult[]> {
  const url = `${BASE_URL}/trips/?originId=${originId}&destId=${destId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch trips");
  }
  const data = await response.json();
  return data;
}
