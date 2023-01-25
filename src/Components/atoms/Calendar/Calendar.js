import React, { useState, useEffect } from "react";
import Timetable from "moedim";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCalendar = styled(Timetable)`
  --moedim-primary: green;
`;

const Calendar = ({ funcGetDate }) => {
  const [deadLineDate, setDeadLineDate] = useState(new Date());
const Calendar = ({
  handlerGetDateFromCalendar,
  fetchedDateStoredInTheDatabase,
}) => {
  let initialValues;
  if (fetchedDateStoredInTheDatabase) {
    initialValues = fetchedDateStoredInTheDatabase;
  } else {
    initialValues = new Date();
  }
  const [deadLineDate, setDeadLineDate] = useState(initialValues);
  const setDataInMs = new Date(deadLineDate).getTime();

  useEffect(() => {
    funcGetDate(setDataInMs);
  }, [deadLineDate, setDataInMs, funcGetDate]);
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
  funcGetDate: PropTypes.func.isRequired,
  handlerGetDateFromCalendar: PropTypes.func.isRequired,
};

export default Calendar;
