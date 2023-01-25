import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";

import DateLabel from "../../atoms/DateLabel/DateLabel";
import CountdownTimer from "../../atoms/CountdownTimer/CountdownTimer";
import Calendar from "../../atoms/Calendar/Calendar";
import { db, convertToTimestamp } from "../../../firebase/firebase-config";

const Container = styled.div`
  z-index: 9;
  width: 100%;
  min-height: 200px;
  background-color: #606060;
  padding: 25px;
  position: relative;
`;

const CloseModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

function EditDateNote({ eventData, onClose }) {
  const [title, setTitle] = useState(eventData.title);
  // dataFromCalendar stores the milliseconds of a given date. E.g. 1675033200000
  const [dataFromCalendar, setDataFromCalendar] = useState();
  const tileMaxLength = 20;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (title === "" || dataFromCalendar === null) {
      return;
    }

    const docRef = doc(db, "deadEnds", eventData.id);

    const updateData = {
      title,
      timeToEnd: new Date(dataFromCalendar),
    };
    updateDoc(docRef, updateData).catch((err) =>
      console.log(
        "In EditDateNote file the updateDoc func caught an error",
        err
      )
    );
    onClose();
  };

  const getDateFromCalendar = (DateFromCalendar) => {
    setDataFromCalendar(DateFromCalendar);
  };

  return (
    <>
      <CloseModal onClick={onClose} />
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <h1>Edytuj notatkę</h1>
          <label htmlFor="title">Tytuł:</label>
          <input
            type="text"
            id="title"
            defaultValue={eventData.title}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <p>
            {title.length}/{tileMaxLength}
          </p>
          <DateLabel>
            {new Date(dataFromCalendar).toLocaleDateString()}
          </DateLabel>
          <CountdownTimer countdownTimestampMs={dataFromCalendar} />
          <Calendar
            handlerGetDateFromCalendar={getDateFromCalendar}
            fetchedDateStoredInTheDatabase={convertToTimestamp(
              eventData.timeToEnd
            )}
          />
          <button type="submit" value="Zaktualizuj">
            Zaktualizuj
          </button>
          <button onClick={onClose}>Anuluj</button>
        </form>
      </Container>
    </>
  );
}

export default EditDateNote;
