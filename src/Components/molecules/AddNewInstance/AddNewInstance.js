import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

import DateLabel from "../../atoms/DateLabel/DateLabel";
import CountdownTimer from "../../atoms/CountdownTimer/CountdownTimer";
import Calendar from "../../atoms/Calendar/Calendar";

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

const AddNewInstance = ({ closeModalFn }) => {
  const [title, setTitle] = useState("");
  const [dataFromCalendar, setDataFromCalendar] = useState(
    new Date().getTime()
  );
  const tileMaxLength = 20;

  const getDateFromCalendar = (DateFromCalendar) => {
    setDataFromCalendar(DateFromCalendar);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      return;
    }

    const deadEndsTimerCollRef = collection(db, "deadEnds");
    addDoc(deadEndsTimerCollRef, {
      title,
      timeToEnd: new Date(dataFromCalendar),
    }).catch((err) => {
      console.log(err.message);
    });

    setTitle("");
    setDataFromCalendar(new Date().getTime());
    closeModalFn();
  };

  return (
    <>
      <CloseModal onClick={closeModalFn} />
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Tytuł:</label>
          <input
            type="text"
            maxLength={tileMaxLength}
            id="title"
            value={title}
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
          <Calendar funcGetDate={getDateFromCalendar} />
          <button type="submit" value="Wyślij">
            Wyślij
          </button>
          <button onClick={closeModalFn}>Anuluj</button>
        </form>
      </Container>
    </>
  );
};

AddNewInstance.propTypes = {
  closeModalFn: PropTypes.func.isRequired,
};

export default AddNewInstance;
