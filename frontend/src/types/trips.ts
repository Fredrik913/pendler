type Leg = {
  origin_name: string;
  origin_time: string;
  destination_name: string;
  destination_time: string;
  line_name: string;
  transport_type: string;
  operator: string;
  duration: string;
};

type TripResult = {
  origin_name: string;
  departure_time: string;
  destination_name: string;
  arrival_time: string;
  duration: string;
  transfer_count: number;
  legs: Leg[];
};

export type { Leg, TripResult };
