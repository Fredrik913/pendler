// hooks/useStopSearch.ts
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchStops } from "../api/stops";
import type { Stop } from "../types/stops";

export function useStopSearch() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Stop | null>(null);

  const { data: results = [], isFetching } = useQuery({
    queryKey: ["stops", query],
    queryFn: () => searchStops(query),
    enabled: query.length > 0,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSelected(null);
      setQuery(input);
    }
  };

  return {
    input,
    setInput,
    results,
    isFetching,
    selected,
    setSelected,
    handleKeyDown,
  };
}
