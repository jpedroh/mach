import AircraftWakeTurbulence from "../enum/aircraft-wake-turbulence";

export default class Aircraft {
  public readonly icaoCode: string;
  public readonly equipment: string;
  public readonly wakeTurbulence: AircraftWakeTurbulence;

  public constructor(icaoCode: string, equipment: string, wakeTurbulence: AircraftWakeTurbulence) {
    this.icaoCode = icaoCode;
    this.equipment = equipment;
    this.wakeTurbulence = wakeTurbulence;
  }
}
