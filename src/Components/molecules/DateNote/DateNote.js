import React from "react";
import CountdownTimer from "../../atoms/CountdownTimer/CountdownTimer";
import styled from "styled-components";
import Heading from "../../atoms/Heading/Heading";
import DateLabel from "../../atoms/DateLabel/DateLabel";
import PropTypes from "prop-types";

const AppContainer = styled.div`
  //border-top: 2px solid black;
  //margin: 0 auto;
  //padding: 0;
  //background-color: gray;
  //width: 50vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //flex-direction: column;
`;

const DateNote = ({ heading, deadEndDate }) => {
  return (
    <AppContainer>
      <Heading>{heading}</Heading>
      <DateLabel>{new Date(deadEndDate).toLocaleDateString()}</DateLabel>
      <CountdownTimer countdownTimestampMs={deadEndDate} />
    </AppContainer>
  );
};

DateNote.prototypes = {
  heading: PropTypes.string.isRequired,
  deadEndDate: PropTypes.instanceOf(Date).isRequired,
};

export default DateNote;
