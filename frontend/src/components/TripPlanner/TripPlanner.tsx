import { useQuery } from "@tanstack/react-query";
import { searchTrips } from "../../api/trips";
import {
  formatDuration,
  formatTime,
  formatTransferCount,
} from "../../utils/format";
import { RouteTimeline } from "../RouteTimeline/RouteTimeline";

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
        <>
          {tripsResults.map((trip, index) => (
            <details key={index}>
              <summary
                key={index}
                className="mt-4 p-8 flex font-semibold justify-between gap-4 rounded-2xl text-sm ring-1 ring-inset ring-gray-200"
              >
                <span className="flex flex-col gap-1">
                  {trip.origin_name}
                  <span className="text-base text-gray-800 font-bold">
                    {formatTime(trip.departure_time)}
                  </span>
                </span>
                <span className="flex flex-col items-center gap-1.5 min-w-[60px] shrink-0">
                  <span className="font-semibold text-[15px] text-[#4e5666]">
                    {formatDuration(trip.duration)}
                  </span>
                  <span className="relative pt-2 text-[13px] text-[#8b8579] before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-7 before:border-t-[1.5px] before:border-dashed before:border-[#e3ded0]">
                    {formatTransferCount(trip.transfer_count)}
                  </span>
                </span>
                <span className="flex flex-col gap-1">
                  {trip.destination_name}
                  <span className="text-base text-gray-800 font-bold">
                    {formatTime(trip.arrival_time)}
                  </span>
                </span>
              </summary>
              <RouteTimeline legs={trip.legs} />
            </details>
          ))}
        </>
      ) : (
        <p>No trips found.</p>
      )}
    </div>
  );
};

export default TripPlanner;
