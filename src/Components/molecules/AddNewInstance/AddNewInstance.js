import React, { useState } from "react";
import Calendar from "../../atoms/Calendar/Calendar";
import DateLabel from "../../atoms/DateLabel/DateLabel";
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

const AddNewInstance = ({ closeModalFn }) => {
  const [DataFromCalendar, setDataFromCalendar] = useState(
    new Date().getTime()
  );

  const getDateFromCalendar = (DateFromCalendar) => {
    setDataFromCalendar(DateFromCalendar);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Do something
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
          <label htmlFor="title">Tytuł</label>
          <input type="text" id="title" required />
          <DateLabel>
            {new Date(DataFromCalendar).toLocaleDateString()}
          </DateLabel>
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
