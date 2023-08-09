import { FlightRules, WakeTurbulence, Weekdays } from "./enum";

export * from "./enum";

type Flight = {
  id: string;
  callsign: string;
  beginDate: Date;
  endDate: Date | null;
  company: string;
  flightNumber: number;
  aircraft: {
    icaoCode: string;
    equipment: string;
    wakeTurbulence: WakeTurbulence;
  };
  departureIcao: string;
  estimatedOffBlockTime: string;
  cruisingSpeed: string;
  weekdays: Weekdays[];
  cruisingLevel: number;
  route: string;
  arrivalIcao: string;
  estimatedEnrouteMinutes: number;
  remarks: string;
  flightRules: FlightRules;
};

export default Flight;
