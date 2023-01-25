import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addDoc } from "firebase/firestore";
import { dateCollectionRef } from "../../../firebase/firestore.collections";

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

const AddNewInstance = ({ handlerToggleModal }) => {
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

    addDoc(dateCollectionRef, {
      title,
      timeToEnd: new Date(dataFromCalendar),
    }).catch((err) => {
      console.log(err.message);
    });

    setTitle("");
    setDataFromCalendar(new Date().getTime());
    handlerToggleModal();
  };

  return (
    <>
      <CloseModal onClick={handlerToggleModal} />
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
          <button onClick={handlerToggleModal}>Anuluj</button>
        </form>
      </Container>
    </>
  );
};

AddNewInstance.propTypes = {
  handlerToggleModal: PropTypes.func.isRequired,
};

export default AddNewInstance;
