import type { Stop } from "../../types/stops";

interface StopSearchResultsProps {
  results: Stop[];
  onSelect: (stop: Stop) => void;
}
const StopSearchResults = ({ results, onSelect }: StopSearchResultsProps) => {
  return (
    <div>
      <ul className="w-full rounded-xl mt-2 list-none border-t border-gray-200 space-y-1">
        {results.map((stop) => (
          <li
            key={stop.id}
            onClick={() => onSelect(stop)}
            className="cursor-pointer py-2 hover:bg-gray-200 rounded-lg px-2"
          >
            {stop.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StopSearchResults;
