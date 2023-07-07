"use client"

import { timezoneDate } from "@/app/helpers/timezone-date"
import { initialDateRange } from "@/app/listings/[listingId]/components/listing-client"
import { DateRange, Range, RangeKeyDict } from "react-date-range"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface DatePickerProps {
  value: Range
  onChange: (value: RangeKeyDict) => void
  disabledDates?: Date[]
}

export const Calendar: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      // date={initialDateRange.startDate}
      onChange={onChange}
      direction="vertical"
      // showDateDisplay={false}
      minDate={initialDateRange.startDate}
      disabledDates={disabledDates}
    />
  )
}