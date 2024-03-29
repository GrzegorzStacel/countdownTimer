import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addDoc } from "firebase/firestore";

import { dateCollectionRefDeadEnds } from "../../../firebase/firestore.collections";
import Form from "../../atoms/Form/Form";
import CloseModal from "../../atoms/CloseModal/CloseModal";

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

const AddNewInstance = ({ handlerToggleModal, handlerManageInfoLabel }) => {
  const [title, setTitle] = useState("");
  const [dataFromCalendar, setDataFromCalendar] = useState(
    new Date().getTime()
  );
  const [tagTitle, setTagTitle] = useState(["Dom"]);
  const [tagColour, setTagColor] = useState(["#FFA500"]);
  const [comments, setComments] = useState("");
  const titleMaxLength = 35;

  const formSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      return;
    }

    addDoc(dateCollectionRefDeadEnds, {
      title,
      tagTitle,
      tagColour,
      comments,
      timeToEnd: new Date(dataFromCalendar),
    }).catch((err) => {
      console.log(
        "In AddNewInstance file the addDoc func caught an error: ",
        err.message
      );
    });

    handlerManageInfoLabel(`Dodano "${title}"`);
    setTitle("");
    setComments("");
    setDataFromCalendar(new Date().getTime());
    handlerToggleModal();
  };

  const stateSetTitle = (title) => {
    setTitle(title);
  };

  const stateSetComments = (comment) => {
    setComments(comment);
  };

  const stateSetDataFromCalendar = (e) => {
    setDataFromCalendar(e);
  };

  const stateSetTag = (title, color) => {
    setTagTitle(title);
    setTagColor(color);
  };

  return (
    <>
      <CloseModal onClick={handlerToggleModal} setBackground />
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
          handlerSetTag={stateSetTag}
          handlerSetComments={stateSetComments}
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
