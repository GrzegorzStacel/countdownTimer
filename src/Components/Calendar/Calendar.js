import React, { useState, useEffect } from "react";
import Timetable from "moedim";
import styled from "styled-components";

const StyledCalendar = styled(Timetable)`
  --moedim-primary: green;
`;

const Calendar = ({ addValue }) => {
  const [value, setValue] = useState(new Date());
  const setData = new Date(value).getTime();

  useEffect(() => {
    addValue(value, setData);
  }, [value, setData, addValue]);

  return (
    <StyledCalendar
      value={value}
      onChange={(d) => {
        setValue(d);
      }}
      locale={"pl-PL"}
    />
  );
};

export default Calendar;
