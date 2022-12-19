import React, { useState } from "react";
import DateLabel from "../../atoms/DateLabel/DateLabel";
import CountdownTimer from "../../atoms/CountdownTimer/CountdownTimer";
import Calendar from "../../atoms/Calendar/Calendar";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  z-index: 9;
  width: 100%;
  min-height: 200px;
  background-color: white;
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

const AddNewInstance = ({ closeModalFn, addNewItem }) => {
  const [Title, setTitle] = useState("");
  const [DataFromCalendar, setDataFromCalendar] = useState(
    new Date().getTime()
  );
  const tileMaxLength = 20;

  const getDateFromCalendar = (DateFromCalendar) => {
    setDataFromCalendar(DateFromCalendar);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addNewItem({
      title: Title,
      data: new Date(DataFromCalendar),
      id: DataFromCalendar,
    });
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
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Tytuł:</label>
          <input
            type="text"
            maxLength={tileMaxLength}
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <p>
            {Title.length}/{tileMaxLength}
          </p>
          <DateLabel>
            {new Date(DataFromCalendar).toLocaleDateString()}
          </DateLabel>
          <CountdownTimer countdownTimestampMs={DataFromCalendar} />
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
