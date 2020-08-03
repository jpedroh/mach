export enum Weekdays {
    MONDAY = 1, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

export enum FlightRules {
    IFR = 'IFR', Y = 'Y', Z = 'Z'
}

export enum WakeTurbulence {
    LIGHT = 'L',
    MEDIUM = 'M',
    HEAVY = 'H',
    SUPER = 'S'
}

export default {
    Weekdays, FlightRules, WakeTurbulence
}