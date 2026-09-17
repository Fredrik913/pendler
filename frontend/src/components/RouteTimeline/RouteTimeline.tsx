import type { Leg } from "../../types/trips";
import { formatTime } from "../../utils/format";
import { getLineColorClasses } from "../../utils/lineColors";

interface RouteTimelineProps {
  legs: Leg[];
}

export function RouteTimeline({ legs }: RouteTimelineProps) {
  const lastLeg = legs[legs.length - 1];

  return (
    <div className="flex flex-col p-4">
      {legs.map((leg, index) => {
        const nextLeg = legs[index + 1];
        return (
          <div key={index} className="pb-6">
            <div className="flex items-baseline gap-3">
              <span className="font-semibold text-base">
                {formatTime(leg.origin_time)}
              </span>
              <span className="text-sm text-gray-500">{leg.origin_name}</span>
            </div>
            <span
              className={`inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${getLineColorClasses(leg.transport_type)}`}
            >
              {leg.line_name}
            </span>
            {nextLeg && (
              <p className="mt-1.5 text-xs text-gray-400">
                Byte, avgår {formatTime(nextLeg.origin_time)}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex items-baseline gap-3">
        <span className="font-bold text-base">
          {formatTime(lastLeg.destination_time)}
        </span>
        <span className="font-bold text-sm">{lastLeg.destination_name}</span>
      </div>
    </div>
  );
}
