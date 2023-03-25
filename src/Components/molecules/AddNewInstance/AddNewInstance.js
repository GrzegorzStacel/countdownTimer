import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addDoc } from "firebase/firestore";

import { dateCollectionRef } from "../../../firebase/firestore.collections";
import Form from "../../atoms/Form/Form";

const Container = styled.div`
  z-index: 9;
  background-color: ${({ theme }) => theme.surface};
  padding: 25px;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 500px;
  display: flex;
  justify-content: center;
`;

const CloseModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const AddNewInstance = ({ handlerToggleModal, handlerManageInfoLabel }) => {
  const [title, setTitle] = useState("");
  const [dataFromCalendar, setDataFromCalendar] = useState(
    new Date().getTime()
  );
  const titleMaxLength = 30;

  const formSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      return;
    }

    addDoc(dateCollectionRef, {
      title,
      timeToEnd: new Date(dataFromCalendar),
    }).catch((err) => {
      console.log(
        "In AddNewInstance file the addDoc func caught an error: ",
        err.message
      );
    });

    handlerManageInfoLabel(`Dodano "${title}"`);
    setTitle("");
    setDataFromCalendar(new Date().getTime());
    handlerToggleModal();
  };

  const stateSetTitle = (e) => {
    setTitle(e);
  };

  const stateSetDataFromCalendar = (e) => {
    setDataFromCalendar(e);
  };

  return (
    <>
      <CloseModal onClick={handlerToggleModal} />
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Form
          heading="Dodaj nową notatkę"
          handlerFormSubmit={formSubmit}
          handlerSetTitle={stateSetTitle}
          handlerOnClose={handlerToggleModal}
          handlerSetDataFromCalendar={stateSetDataFromCalendar}
          maxLength={titleMaxLength}
          submitNameButton={"Wyślij"}
        />
      </Container>
    </>
  );
};

AddNewInstance.propTypes = {
  handlerToggleModal: PropTypes.func.isRequired,
};

export default AddNewInstance;
