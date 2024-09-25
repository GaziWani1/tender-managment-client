import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatISO } from "date-fns";
const CustomDateTimePicker = ({ label ,onDateChange , placeholder , value}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateChange) {
      const isoDate = formatISO(date, { representation: 'complete' });      
      onDateChange(isoDate); 
    }
  };

  return (
    <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      showTimeSelect
      dateFormat="Pp"
      placeholderText={placeholder}
      value={value}
      className="mt-1 p-3 block w-full md:min-w-[230px]  rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
  
  );
};

export default CustomDateTimePicker;
