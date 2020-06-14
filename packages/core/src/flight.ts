import Weekdays from "./enum/weekdays";
import Aircraft from "./vo/aircraft";

export default class Flight {
  public constructor(
    public readonly id: string,
    public readonly days: Weekdays[],
    public readonly callsign: string,
    public readonly company: string,
    public readonly flightNumber: number,
    public readonly aircraft: Aircraft,
    public readonly departureIcao: string,
    public readonly departureTime: string,
    public readonly cruisingSpeed: string,
    public readonly cruisingLevel: number,
    public readonly route: string,
    public readonly destinationIcao: string,
    public readonly estimatedEnrouteMinutes: number,
    public readonly remarks: string,
    public readonly beginDate: Date,
    public readonly endDate?: Date
  ) {}
}
