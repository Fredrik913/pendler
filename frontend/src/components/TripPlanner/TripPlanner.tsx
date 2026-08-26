import { useQuery } from "@tanstack/react-query";
import { searchTrips } from "../../api/trips";
import {
  formatDuration,
  formatTime,
  formatTransferCount,
} from "../../utils/format";

interface TripPlannerProps {
  originId?: string;
  destId?: string;
}

const TripPlanner = ({ originId, destId }: TripPlannerProps) => {
  const { data: tripsResults = [] } = useQuery({
    queryKey: ["trips", originId, destId],
    queryFn: () => searchTrips(originId!, destId!),
    enabled: !!originId && !!destId,
  });

  return (
    <div>
      {tripsResults.length > 0 ? (
        <ul className="space-y-3">
          {tripsResults.map((trip) => (
            <li
              key={trip.id}
              className="card card-border bg-base-100 shadow-sm"
            >
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-base-content/60">
                      {trip.origin_name}
                    </p>
                    <p className="text-xl font-semibold">
                      {formatTime(trip.departure_time)}
                    </p>
                  </div>

                  <div className="flex flex-col items-center px-4 text-base-content/50">
                    <span className="text-xs">
                      {formatDuration(trip.duration)}
                    </span>
                    <div className="my-1 h-px w-16 bg-base-content/20" />
                    <span className="text-xs">
                      {formatTransferCount(trip.transfer_count)}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-base-content/60">
                      {trip.destination_name}
                    </p>
                    <p className="text-xl font-semibold">
                      {formatTime(trip.arrival_time)}
                    </p>
                  </div>
                </div>

                <ul className="mt-3 space-y-1 border-t border-base-content/10 pt-2">
                  {trip.legs.map((leg, index) => (
                    <li
                      key={`${trip.id}-${index}`}
                      className="text-sm text-base-content/70"
                    >
                      {formatTime(leg.origin_time)} {leg.origin_name} →{" "}
                      {formatTime(leg.destination_time)} {leg.destination_name}
                      {" — "}
                      {leg.line_name} ({leg.operator})
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No trips found.</p>
      )}
      <p>Origin: {originId ?? "-"}</p>
      <p>Destination: {destId ?? "-"}</p>
    </div>
  );
};

export default TripPlanner;
