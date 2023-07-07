import { utcToZonedTime } from "date-fns-tz"

export const timezoneDate = (date: Date) => {
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  
  const Year = date.getFullYear()
  const Month = date.getMonth()
  const Date_Day = date.getDate()
  const Hours = date.getHours()
  const Minutes = date.getMinutes()
  const Ms = date.getMilliseconds()

  const utcDate = new Date(Date.UTC(Year, Month, Date_Day, Hours, Minutes, Ms))

  const timeZonedDate = utcToZonedTime(utcDate, clientTimezone)
  return timeZonedDate
}
