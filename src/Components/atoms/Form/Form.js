import React, { useEffect, useState } from "react";
import DateLabel from "../DateLabel/DateLabel";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import Calendar from "../Calendar/Calendar";
import { convertToTimestamp } from "../../../firebase/firebase-config";
import Heading from "../Heading/Heading";
import Label from "../Label/Label";
import Paragraph from "../Paragraph/Paragraph";
import Button from "../Button/Button";
import styled from "styled-components";
import Input from "../Input/Input";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
`;

const HeadingStyled = styled(Heading)`
  margin-bottom: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
  width: 100%;
`;

const ParagraphAbsoluteStyled = styled(Paragraph)`
  position: absolute;
  top: 40px;
  right: 0;
  margin: 0;
`;

const ParagraphBold = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.bold};
`;

const WrapperButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputStyled = styled(Input)`
  border-radius: 15px 15px 0 0;
  text-align: center;
  width: 309px;
`;

const Form = ({
  handlerFormSubmit,
  title = "",
  handlerSetTitle,
  maxLength,
  handlerOnClose,
  handlerTimeToEnd,
  handlerSetDataFromCalendar,
  submitNameButton,
}) => {
  const [titleForm, setTitleForm] = useState(title);
  const [dataFromCalendar, setDataFromCalendar] = useState(
    handlerTimeToEnd ? null : new Date().getTime()
  );

  useEffect(() => {
    const fetchDataFromCalendar = () => {
      handlerSetDataFromCalendar(dataFromCalendar);
    };

    fetchDataFromCalendar();
  }, [dataFromCalendar, handlerSetDataFromCalendar]);

  const getDateFromCalendar = (DateFromCalendar) => {
    setDataFromCalendar(DateFromCalendar);
  };

  const fetchedDateStoredInTheDatabase = handlerTimeToEnd
    ? convertToTimestamp(handlerTimeToEnd)
    : null;

  return (
    <StyledForm onSubmit={handlerFormSubmit}>
      <HeadingStyled>{heading}</HeadingStyled>
      <Wrapper>
        <Label htmlFor="title">Tytuł:</Label>
        <Input
          type="text"
          id="title"
          maxLength={maxLength}
          defaultValue={title}
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            handlerSetTitle(e.target.value);
            setTitleForm(e.target.value);
          }}
          required
        />
        <ParagraphAbsoluteStyled>
          {titleForm.length}/{maxLength}
        </ParagraphAbsoluteStyled>
      </Wrapper>
      <InputStyled
        center
        readOnly
        value={new Date(dataFromCalendar).toLocaleDateString()}
      />
      <Calendar
        handlerGetDateFromCalendar={getDateFromCalendar}
        handlerFetchedDateStoredInTheDatabase={fetchedDateStoredInTheDatabase}
      />
      <Wrapper>
        <ParagraphBold>Pozostało: </ParagraphBold>
        <CountdownTimer
          countdownTimestampMs={dataFromCalendar}
          Day
          Hour
          Minute
        />
      </Wrapper>
      <WrapperButton>
        <Button type="submit" value="Zaktualizuj">
          {submitNameButton}
        </Button>
        <Button onClick={handlerOnClose} cancel>
          Anuluj
        </Button>
      </WrapperButton>
    </StyledForm>
  );
};

export default Form;
