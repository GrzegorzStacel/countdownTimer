import React, { useEffect, useState } from "react";
import { orderBy, query, onSnapshot } from "firebase/firestore";
import { dateCollectionRef } from "../../firebase/firestore.collections";
import { ThreeDots as Loader } from "react-loader-spinner";
import styled from "styled-components";

import DateNote from "../molecules/DateNote/DateNote";
import ButtonIcon from "../atoms/ButtonIcon/ButtonIcon";
import deleteIcon from "../../assets/icons/DeleteIcon.svg";
import editIcon from "../../assets/icons/EditIcon.svg";
import EditDateNote from "../molecules/EditDateNote/EditDateNote";
import { deleteDateNote } from "../../firebase/Utils/Delete";
import InfoLabel from "../atoms/InfoLabel/InfoLabel";

const Wrapper = styled.div`
  background-color: #3d3b3b;
  padding: 50px;
`;

const LoaderCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const EventWrapper = styled.div`
  background-color: dimgray;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const IconWrapper = styled(ButtonIcon)`
  display: flex;
`;

const MainList = ({ handlerManageInfoLabel }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [showInfoLabel, setShowInfoLabel] = useState(false);
  // The use of setInfoLabelMessage is required because InfoLabel does not have access to the event variable from the map function in the return() function
  const [infoLabelMessage, setInfoLabelMessage] = useState("");

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

  const handleDelete = (eventId, eventTitle) => {
    deleteDateNote(eventId, eventTitle);
    setInfoLabelMessage(`Usunięto "${eventTitle}"`);
    setShowInfoLabel(true);
    setTimeout(() => {
      setShowInfoLabel(false);
    }, 5000);
  };

  return (
    <Wrapper>
      <InfoLabel show={showInfoLabel} message={infoLabelMessage} />
      {loading ? (
        <LoaderCenter>
          <Loader color="black" height={80} width={80} />
        </LoaderCenter>
      ) : (
        events.map((event) => (
          <EventWrapper key={event.id}>
            <DateNote
              heading={event.title}
              deadEndDate={new Date(event.timeToEnd.seconds * 1000)}
            />
            <IconWrapper
              icon={deleteIcon}
              onClick={() => handleDelete(event.id, event.title)}
            />
            <IconWrapper
              icon={editIcon}
              onClick={() => setSelectedEvent(event)}
            />
            {selectedEvent && selectedEvent.id === event.id && (
              <EditDateNote
                eventData={selectedEvent}
                onClose={() => setSelectedEvent(false)}
              />
            )}
          </EventWrapper>
        ))
      )}
    </Wrapper>
  );
};

export default MainList;
