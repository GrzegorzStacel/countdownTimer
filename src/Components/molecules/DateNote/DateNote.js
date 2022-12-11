import React, { useState } from "react";
import CountdownTimer from "../../atoms/CountdownTimer/CountdownTimer";
import styled from "styled-components";
import plusIcon from "../../../assets/icons/Plusicon.svg";
import Calendar from "../../atoms/Calendar/Calendar";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon";
import Heading from "../../atoms/Heading/Heading";
import DateLabel from "../../atoms/DateLabel/DateLabel";
import PropTypes from "prop-types";

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  background-color: gray;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DateNote = ({ heading }) => {
  const [getTimeFromCalendar, setTimeFromCalendar] = useState(new Date());
  const [
    sendSpecificallyDataFromCalendar,
    setsendSpecificallyDataFromCalendar,
  ] = useState(new Date(getTimeFromCalendar).getTime());

  const getDateFromCalendar = (value, sendSpecificallyDataFromCalendar) => {
    setTimeFromCalendar((prevState) => (prevState = value));
    setsendSpecificallyDataFromCalendar(
      (prevState) => (prevState = sendSpecificallyDataFromCalendar)
    );
  };
  return (
    <>
      <ButtonIcon icon={plusIcon} />
    </>
  );
};

DateNote.prototypes = {
  heading: PropTypes.string.isRequired,
};

export default DateNote;
