import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";

import { db } from "../../../firebase/firebase-config";
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

function EditDateNote({ eventData, onClose, handlerManageInfoLabel }) {
  const [title, setTitle] = useState(eventData.title);
  // dataFromCalendar stores the milliseconds of a given date. E.g. 1675033200000
  const [dataFromCalendar, setDataFromCalendar] = useState();
  const [tagTitle, setTagTitle] = useState([]);
  const [tagColour, setTagColor] = useState([]);
  const titleMaxLength = 30;

  const formSubmit = (e) => {
    e.preventDefault();

    if (title === "" || dataFromCalendar === null) {
      return;
    }

    const tmpObjStoreTagData = {
      title: tagTitle,
      colour: tagColour,
    };

    const docRef = doc(db, "deadEnds", eventData.id);

    const updateData = {
      tag: tmpObjStoreTagData,
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

  const stateSetTag = (title, color) => {
    setTagTitle(title);
    setTagColor(color);
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
          heading="Edytuj notatkę"
          handlerFormSubmit={formSubmit}
          handlerSetTitle={stateSetTitle}
          handlerOnClose={onClose}
          handlerTimeToEnd={eventData.timeToEnd}
          handlerSetDataFromCalendar={stateSetDataFromCalendar}
          handlerSetTag={stateSetTag}
          maxLength={titleMaxLength}
          title={eventData.title}
          submitNameButton={"Zaktualizuj"}
        />
      </Container>
    </>
  );
}

export default EditDateNote;
