import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addDoc } from "firebase/firestore";

import { dateCollectionRef } from "../../../firebase/firestore.collections";
import Form from "../../atoms/Form/Form";

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

const AddNewInstance = ({
  handlerToggleModal,
  handlerManageShowingInfoLabelModal,
}) => {
  const [title, setTitle] = useState("");
  const [dataFromCalendar, setDataFromCalendar] = useState(
    new Date().getTime()
  );
  const titleMaxLength = 20;

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

    setTitle("");
    setDataFromCalendar(new Date().getTime());
    handlerManageShowingInfoLabelModal(title);
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
