import React, { useEffect, useState } from "react";
import DateLabel from "../DateLabel/DateLabel";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import Calendar from "../Calendar/Calendar";
import { convertToTimestamp } from "../../../firebase/firebase-config";

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
    <form onSubmit={handlerFormSubmit}>
      <h1>Edytuj notatkę</h1>
      <label htmlFor="title">Tytuł:</label>
      <input
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
      <p>
        {titleForm.length}/{maxLength}
      </p>
      <DateLabel>{new Date(dataFromCalendar).toLocaleDateString()}</DateLabel>
      <CountdownTimer countdownTimestampMs={dataFromCalendar} />
      <Calendar
        handlerGetDateFromCalendar={getDateFromCalendar}
        handlerFetchedDateStoredInTheDatabase={fetchedDateStoredInTheDatabase}
      />

      <button type="submit" value="Zaktualizuj">
        {submitNameButton}
      </button>
      <button onClick={handlerOnClose}>Anuluj</button>
    </form>
  );
};

export default Form;
