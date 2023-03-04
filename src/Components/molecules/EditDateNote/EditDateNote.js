import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";

import { db } from "../../../firebase/firebase-config";
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

function EditDateNote({ eventData, onClose, handlerManageInfoLabel }) {
  const [title, setTitle] = useState(eventData.title);
  // dataFromCalendar stores the milliseconds of a given date. E.g. 1675033200000
  const [dataFromCalendar, setDataFromCalendar] = useState();
  const titleMaxLength = 20;

  const formSubmit = (e) => {
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
    handlerManageInfoLabel(`Edycja została zapisana`);
  };

  const stateSetTitle = (e) => {
    setTitle(e);
  };

  const stateSetDataFromCalendar = (e) => {
    setDataFromCalendar(e);
  };

  return (
    <>
      <CloseModal onClick={onClose} />
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Form
          handlerFormSubmit={formSubmit}
          handlerSetTitle={stateSetTitle}
          handlerOnClose={onClose}
          handlerTimeToEnd={eventData.timeToEnd}
          handlerSetDataFromCalendar={stateSetDataFromCalendar}
          maxLength={titleMaxLength}
          title={eventData.title}
          submitNameButton={"Zaktualizuj"}
        />
      </Container>
    </>
  );
}

export default EditDateNote;
