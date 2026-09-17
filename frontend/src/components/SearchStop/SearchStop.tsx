import { useStopSearch } from "../../hooks/useStopSearch";
import { StopSearchInput } from "../StopSearchInput/StopSearchInput";
import TripPlanner from "../TripPlanner/TripPlanner";

const SearchStop = () => {
  const origin = useStopSearch();
  const dest = useStopSearch();

  return (
    <div className="text-xl">
      <StopSearchInput
        placeholder="Sök startpunkt..."
        input={origin.input}
        onInputChange={origin.setInput}
        onKeyDown={origin.handleKeyDown}
        results={origin.results}
        isFetching={origin.isFetching}
        onSelect={origin.setSelected}
        selected={origin.selected}
      />
      <StopSearchInput
        placeholder="Sök destination..."
        input={dest.input}
        onInputChange={dest.setInput}
        onKeyDown={dest.handleKeyDown}
        results={dest.results}
        isFetching={dest.isFetching}
        onSelect={dest.setSelected}
        selected={dest.selected}
      />
      <div className="mt-4">
        <TripPlanner
          originId={origin.selected?.id}
          destId={dest.selected?.id}
        />
      </div>
    </div>
  );
};

export default SearchStop;
