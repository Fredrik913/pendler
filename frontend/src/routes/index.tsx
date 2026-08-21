import { createFileRoute } from "@tanstack/react-router";
import "../index.css";
import { useState } from "react";
import { searchTrips } from "../api/trips";
import type { TripResult } from "../types/trips";

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
  const [data, setData] = useState<TripResult[]>([]);

  //Function to handle the button click and fetch data from the API
  const handleClick = async () => {
    const trips = await searchTrips("740000003", "740000044");
    console.log(trips);
    setData(trips);
  };
  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary">
        Sök resa
      </button>
      {data.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-lg font-semibold">Resor</h2>
          {data.map((trip) => (
            <div
              key={`${trip.departure_time}-${trip.arrival_time}`}
              className="card card-border bg-base-100 shadow-sm"
            >
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-base-content/60">
                      {trip.origin_name}
                    </p>
                    <p className="text-xl font-semibold">
                      {new Date(trip.departure_time).toLocaleTimeString(
                        "sv-SE",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col items-center px-4 text-base-content/50">
                    <span className="text-xs">
                      {trip.duration.replace("PT", "").toLowerCase()}
                    </span>
                    <div className="my-1 h-px w-16 bg-base-content/20" />
                    <span className="text-xs">
                      {trip.transfer_count === 0
                        ? "Direkt"
                        : `${trip.transfer_count} byte${trip.transfer_count > 1 ? "n" : ""}`}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-base-content/60">
                      {trip.destination_name}
                    </p>
                    <p className="text-xl font-semibold">
                      {new Date(trip.arrival_time).toLocaleTimeString("sv-SE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
