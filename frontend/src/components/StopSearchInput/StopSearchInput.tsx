import type { Stop } from "../../types/stops";
import StopSearchResults from "./StopSearchResults";

type Props = {
  placeholder: string;
  input: string;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  results: Stop[];
  isFetching: boolean;
  onSelect: (stop: Stop) => void;
  selected: Stop | null;
};
// Tar emot input från användaren och visar sökresultat för hållplatser.
export function StopSearchInput({
  placeholder,
  input,
  onInputChange,
  onKeyDown,
  results,
  isFetching,
  onSelect,
  selected,
}: Props) {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-2xl p-2 w-full mb-3 focus-within:ring-2 focus-within:ring-sky-600">
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="w-full bg-gray-100 outline-none border-none"
      />
      {isFetching && <p>Söker...</p>}
      {!selected && results.length > 0 && (
        <StopSearchResults results={results} onSelect={onSelect} />
      )}
    </div>
  );
}
