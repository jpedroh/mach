import { FlightRules, Weekdays } from "@mach-flight-planning/common"

export const resolveFlightRules = (route: string): FlightRules => {
    if (route.includes(' IFR ')) {
        return FlightRules.Z
    } else if (route.includes(' VFR ')) {
        return FlightRules.Y
    }
    return FlightRules.IFR
}

export const resolveFlightDate = (date: string): Date => {
    const day = parseInt(date.substr(0, 2));
    const month = parseInt(date.substr(2,2)) - 1;
    const year = parseInt(date.substr(4,2)) + 2000;

    return new Date(year, month, day);
}

export const resolveWeekDays = (weekdays: string): Weekdays[] => {
    return weekdays.split('').map(weekday => parseInt(weekday)).filter(day => day !== 0)
}

export const resolveEstimatedEnrouteMinutes = (eet: string): number => {
    const MINUTES_IN_AN_HOUR = 60;

    const hours = parseInt(eet.substr(0, 2))
    const minutes = parseInt(eet.substr(2))

    return (hours * MINUTES_IN_AN_HOUR) + minutes
}