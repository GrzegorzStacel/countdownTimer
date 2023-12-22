import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getRemainingTimeUntilMsTimestamp } from "../../../Utils/CountdownTimerUtils";
import Paragraph from "../Paragraph/Paragraph";

const Container = styled.div`
  padding: 0 15px;
  font-size: ${({ theme }) => theme.fontSize.s};
  text-align: right;
`;

const Span = styled.span`
  margin-right: 5px;
`;

const TwoNumbers = styled.div`
  text-align: right;
  display: inline;
`;

const ParagraphLeftPadding = styled(Paragraph)`
  padding-left: 1px;
  margin: 0;
  color: inherit;
`;

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const CountdownTimer = ({
  countdownTimestampMs,
  Day,
  Hour,
  Minute,
  Second,
}) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 120000); // Refresh every 2 minutes

    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  return (
    <Container>
      {Day && (
        <Span>
          <TwoNumbers>{remainingTime.days}</TwoNumbers>
          <ParagraphLeftPadding>D</ParagraphLeftPadding>
        </Span>
      )}
      {Hour && (
        <Span>
          <TwoNumbers>{remainingTime.hours}</TwoNumbers>
          <ParagraphLeftPadding>h</ParagraphLeftPadding>
        </Span>
      )}
      {Minute && (
        <Span>
          <TwoNumbers>{remainingTime.minutes}</TwoNumbers>
          <ParagraphLeftPadding>m</ParagraphLeftPadding>
        </Span>
      )}
      {Second && (
        <Span>
          <TwoNumbers>{remainingTime.seconds}</TwoNumbers>
          <ParagraphLeftPadding>s</ParagraphLeftPadding>
        </Span>
      )}
    </Container>
  );
};

export default CountdownTimer;
