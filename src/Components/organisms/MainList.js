import React, { useEffect, useState } from "react";
import { orderBy, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { dateCollectionRef } from "../../firebase/firestore.collections";
import { ThreeDots as Loader } from "react-loader-spinner";
import styled from "styled-components";

import DateNote from "../molecules/DateNote/DateNote";
import ButtonIcon from "../atoms/ButtonIcon/ButtonIcon";
import deleteIcon from "../../assets/icons/DeleteIcon.svg";
import editIcon from "../../assets/icons/EditIcon.svg";
import EditDateNote from "../molecules/EditDateNote/EditDateNote";

const Wrapper = styled.div`
  display: block;
  background: green;
  padding-top: 30px;
`;

const LoaderCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(false);

  useEffect(() => {
    const queryRef = query(dateCollectionRef, orderBy("timeToEnd", "asc"));
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      let tmpEvents = [];
      snapshot.forEach((doc) => {
        tmpEvents.push({ ...doc.data(), id: doc.id });
      });
      setEvents(tmpEvents);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function deleteDateNote(id, title) {
    const docRef = doc(db, "deadEnds", id);
    deleteDoc(docRef)
      .then(() => console.log(`Document "${title}" is deleted`))
      .catch((err) => console.log(err.message));
  }

  return (
    <Wrapper>
      {loading ? (
        <LoaderCenter>
          <Loader color="black" height={80} width={80} />
        </LoaderCenter>
      ) : (
        events.map((event) => (
          <>
            <DateNote
              key={event.id}
              heading={event.title}
              deadEndDate={new Date(event.timeToEnd.seconds * 1000)}
            />
            <ButtonIcon
              key={event.id + "delete"}
              icon={deleteIcon}
              onClick={() => deleteDateNote(event.id, event.title)}
            />
            <ButtonIcon
              key={event.id + "edit"}
              icon={editIcon}
              onClick={() => setSelectedEvent(event)}
            />
            {selectedEvent && selectedEvent.id === event.id && (
              <EditDateNote
                eventData={selectedEvent}
                onClose={() => setSelectedEvent(false)}
              />
            )}
          </>
        ))
      )}
    </Wrapper>
  );
};

export default MainList;
