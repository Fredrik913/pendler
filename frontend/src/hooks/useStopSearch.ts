// hooks/useStopSearch.ts
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchStops } from "../api/stops";
import type { Stop } from "../types/stops";

export function useStopSearch() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Stop | null>(null);
  const MIN_QUERY_LENGTH = 3;
  //Hanterar debouncing för att användaren inte ska behöva att trycka på Enter-tangenten för att söka.
  useEffect(() => {
    const timer = setTimeout(() => setQuery(input.trim()), 350);
    return () => clearTimeout(timer);
  }, [input]);
  // Hämtar sökresultat från API:et baserat på användarens input.
  const { data: results = [], isFetching } = useQuery({
    queryKey: ["stops", query],
    queryFn: () => searchStops(query),
    enabled: query.length >= MIN_QUERY_LENGTH && !selected,
  });
  // Hanterar Enter-tangenten för att söka på hållplats.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSelected(null);
      setQuery(input.trim());
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setSelected(null);
  };

  const handleSelect = (stop: Stop) => {
    setSelected(stop);
    setInput(stop.name);
  };

  return {
    input,
    setInput: handleInputChange,
    results,
    isFetching,
    selected,
    setSelected: handleSelect,
    handleKeyDown,
  };
}
