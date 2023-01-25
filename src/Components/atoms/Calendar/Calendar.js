import React, { useState, useEffect } from "react";
import Timetable from "moedim";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCalendar = styled(Timetable)`
  --moedim-primary: green;
`;

const Calendar = ({
  handlerGetDateFromCalendar,
  fetchedDateStoredInTheDatabase,
}) => {
  // To set the starting date in the calendar we use one from two options:
  // Adding a new entry - setting the current date: new Date() example: Sun Jan 22 2023 10:55:05 GMT+0100 (czas środkowoeuropejski standardowy)
  // Editing an existing entry: editTimeSec example: Mon Jan 30 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)

  let initialValues;
  if (fetchedDateStoredInTheDatabase) {
    initialValues = fetchedDateStoredInTheDatabase;
  } else {
    initialValues = new Date();
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
    <StyledCalendar
      value={deadLineDate}
      onChange={(d) => {
        setDeadLineDate(d);
      }}
      locale={"pl-PL"}
    />
  );
};

Calendar.propTypes = {
  handlerGetDateFromCalendar: PropTypes.func.isRequired,
};

export default Calendar;
