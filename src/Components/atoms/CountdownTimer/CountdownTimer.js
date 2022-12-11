import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getRemainingTimeUntilMsTimestamp } from "../../../Utils/CountdownTimerUtils";

const Container = styled.div`
  height: 100px;
  padding: 0 15px;
  font-family: "Oswald";
  font-size: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  margin-left: 5px;
  margin-right: 5px;
`;

const TwoNumbers = styled.div`
  width: 2ch;
  text-align: right;
`;

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const CountdownTimer = ({ countdownTimestampMs }) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  return (
    <Container>
      <Span>
        <TwoNumbers>{remainingTime.days}</TwoNumbers>
      </Span>
      <Span>dni</Span>
      <Span>
        <TwoNumbers>{remainingTime.hours}</TwoNumbers>
      </Span>
      <Span>godzin</Span>
      <Span>
        <TwoNumbers>{remainingTime.minutes}</TwoNumbers>
      </Span>
      <Span>minut</Span>
      <Span>
        <TwoNumbers>{remainingTime.seconds}</TwoNumbers>
      </Span>
      <Span>sekund</Span>
    </Container>
  );
};

export default CountdownTimer;
