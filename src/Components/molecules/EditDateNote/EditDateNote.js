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

function EditDateNote({ eventData, onClose, handlerManageInfoLabel }) {
  const [title, setTitle] = useState(eventData.title);
  // dataFromCalendar stores the milliseconds of a given date. E.g. 1675033200000
  const [dataFromCalendar, setDataFromCalendar] = useState();
  const [tagTitle, setTagTitle] = useState([]);
  const [tagColour, setTagColor] = useState([]);
  const [comments, setComments] = useState(eventData.comments);
  const titleMaxLength = 35;

  const formSubmit = (e) => {
    e.preventDefault();

    if (title === "" || dataFromCalendar === null) {
      return;
    }

    const docRef = doc(db, "deadEnds", eventData.id);
    const updateData = {
      title,
      tagTitle,
      tagColour,
      comments,
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

  const stateSetComments = (comment) => {
    setComments(comment);
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
          handlerSetComments={stateSetComments}
          fetchedTagTitle={eventData.tagTitle}
          fetchedTagColor={eventData.tagColour}
          fetchedComments={eventData.comments}
          maxLength={titleMaxLength}
          title={eventData.title}
          submitNameButton={"Zaktualizuj"}
        />
      </Container>
    </>
  );
}

export default EditDateNote;
