import AircraftWakeTurbulence from "../enum/aircraft-wake-turbulence";

export default class Aircraft {
  public readonly icaoCode: string;
  public readonly equipment: string;
  public readonly wakeTurbulence: AircraftWakeTurbulence;
}
