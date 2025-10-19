"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface DateSelectorProps {
  value: Range;
  onChange: (ranges: RangeKeyDict) => void;
  bookedDates?: Date[];
}

const DateSelector: React.FC<DateSelectorProps> = ({
  value,
  onChange,
  bookedDates = [],
}) => {
  return (
    <DateRange
      className="W-full-border border-gray-400 rounded-xl mb-4"
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={bookedDates}
    />
  );
};

export default DateSelector;
