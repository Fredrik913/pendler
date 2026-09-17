import { createFileRoute } from "@tanstack/react-router";
import "../index.css";
import SearchStop from "../components/SearchStop/SearchStop";

type TripSearch = {
  originId?: string;
  destId?: string;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): TripSearch => ({
    originId: search.originId as string | undefined,
    destId: search.destId as string | undefined,
  }),
  component: Index,
});

function Index() {
  //Usestate variable to store the fetched data

  return (
    <div className="max-w-[600px] mx-auto mt-6 p-4">
      <SearchStop />
    </div>
  );
}
