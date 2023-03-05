import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import { Polish } from "flatpickr/dist/l10n/pl";

const Calendar = ({
  handlerGetDateFromCalendar,
  handlerFetchedDateStoredInTheDatabase,
}) => {
  // To set the starting date in the calendar we use one from two options:
  // Adding a new entry - setting the current date: new Date() example: Sun Jan 22 2023 10:55:05 GMT+0100 (czas środkowoeuropejski standardowy)
  // Editing an existing entry: editTimeSec example: Mon Jan 30 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)

  let initialValues;
  if (handlerFetchedDateStoredInTheDatabase) {
    initialValues = handlerFetchedDateStoredInTheDatabase;
  } else {
    initialValues = new Date();
    initialValues.setHours(0, 0, 0, 0);
  }

  // deadLineDate - Time taken from TimeTable from moedim (StyledCalendar).
  // E.q output: Mon Jan 30 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)
  const [deadLineDate, setDeadLineDate] = useState(initialValues);

  // setDataInMs - e.q output: 1675033200000
  const setDataInMs = new Date(deadLineDate).getTime();

  useEffect(() => {
    handlerGetDateFromCalendar(setDataInMs);
  }, [deadLineDate, setDataInMs, handlerGetDateFromCalendar]);

  return (
    <Flatpickr
      options={{
        allowInput: true,
        dateFormat: "d-m-Y",
        inline: true,
        locale: Polish,
        disable: [
          {
            from: "1970-01-01",
            to: new Date(),
          },
        ],
      }}
      value={deadLineDate}
      onChange={(date) => {
        setDeadLineDate(date);
      }}
    />
  );
};

Calendar.propTypes = {
  handlerGetDateFromCalendar: PropTypes.func.isRequired,
};

export default Calendar;
