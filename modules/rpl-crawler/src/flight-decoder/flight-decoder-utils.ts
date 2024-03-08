import { FlightRules, Weekdays } from '@mach/shared/database'

export const resolveFlightRules = (route: string): FlightRules => {
  if (route.includes(' IFR ')) {
    return 'Z'
  } else if (route.includes(' VFR ')) {
    return 'Y'
  }
  return 'IFR'
}

export const resolveFlightDate = (date: string): string => {
  return `20${date.substr(4, 2)}-${date.substr(2, 2)}-${date.substr(0, 2)}`
}

export const resolveWeekDays = (weekdays: string): Weekdays[] => {
  const weekdaysMap = {
    '1': 'MONDAY',
    '2': 'TUESDAY',
    '3': 'WEDNESDAY',
    '4': 'THURSDAY',
    '5': 'FRIDAY',
    '6': 'SATURDAY',
    '7': 'SUNDAY',
  }

  return weekdays
    .split('')
    .map((weekday) => weekdaysMap[weekday])
    .filter((day) => day !== undefined)
}

export const resolveEstimatedEnrouteMinutes = (eet: string): number => {
  const MINUTES_IN_AN_HOUR = 60

  const hours = parseInt(eet.substr(0, 2))
  const minutes = parseInt(eet.substr(2))

  return hours * MINUTES_IN_AN_HOUR + minutes
}
