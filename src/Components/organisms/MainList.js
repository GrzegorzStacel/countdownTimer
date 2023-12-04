import React, { useEffect, useState } from "react";
import { orderBy, query, onSnapshot } from "firebase/firestore";
import { dateCollectionRefDeadEnds } from "../../firebase/firestore.collections";
import { ThreeDots as Loader } from "react-loader-spinner";
import styled from "styled-components";

import ButtonIcon from "../atoms/ButtonIcon/ButtonIcon";
import EditDateNote from "../molecules/EditDateNote/EditDateNote";
import { deleteDateNote } from "../../firebase/Utils/Delete";
import Heading from "../atoms/Heading/Heading";
import DateLabel from "../atoms/DateLabel/DateLabel";
import CountdownTimer from "../atoms/CountdownTimer/CountdownTimer";
import Tag from "../atoms/Tag/Tag";
import ButtonSort from "../atoms/ButtonSort/ButtonSort";
import Sort from "../molecules/Sort/Sort";

const LoaderCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.wrapperWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapperButtonSort = styled.div`
  position: relative;
  align-self: flex-start;
  width: 100%;
`;

const EventWrapper = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 10px;
  margin: 10px 50px;
  display: grid;
  grid-template-columns: minmax(400px, auto) 80px minmax(100px, 180px) 160px 150px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  width: 100%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonIconStyle = styled(ButtonIcon)`
  margin-right: 0;

  &:first-child {
    margin-right: 20px;
  }
`;

const NoResultsMessage = styled.h1`
  color: ${({ theme }) => theme.on.surface};
`;

const MainList = ({ handlerManageInfoLabel }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(false);

  const [sortListField, setSortListField] = useState("timeToEnd");
  const [sortListDirection, setSortListDirection] = useState("asc");
  const [isSortModuleAppear, setIsSortModuleAppear] = useState(false);

  useEffect(() => {
    const queryRef = query(
      dateCollectionRefDeadEnds,
      orderBy(sortListField, sortListDirection)
    );
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      let tmpEvents = [];
      snapshot.forEach((doc) => {
        const tag = doc.tag || {};

        tmpEvents.push({
          ...doc.data(),
          id: doc.id,
          tagColour: tag.colour,
          tagTitle: tag.title,
        });
      });
      setEvents(tmpEvents);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sortListField, sortListDirection]);

  const handleDelete = (eventId, eventTitle) => {
    deleteDateNote(eventId, eventTitle);
    handlerManageInfoLabel(`Usunięto "${eventTitle}"`);
  };

  const ButtonSortClick = () => {
    setIsSortModuleAppear(!isSortModuleAppear);
  };

  return (
    <Wrapper>
      <WrapperButtonSort>
        <ButtonSort onClick={ButtonSortClick}>Sortuj</ButtonSort>
        {isSortModuleAppear && <Sort />}
      </WrapperButtonSort>
      {loading ? (
        <LoaderCenter>
          <Loader color="white" height={80} width={80} />
        </LoaderCenter>
      ) : (
        (() => {
          const filteredEvents = events.filter((event) =>
            isTagSortEnable
              ? event.tagTitle.includes(isDataFilteredBySelectedTag)
              : true
          );
          const hasFilteredEvents = filteredEvents.length > 0;
          return (
            <>
              {!hasFilteredEvents && (
                <NoResultsMessage>
                  Brak wyników wyszukiwania z tagiem "
                  {isDataFilteredBySelectedTag}" 🤷‍♂️
                </NoResultsMessage>
              )}
              {filteredEvents.map((event, index) => (
                <EventWrapper key={event.id}>
                  <Heading>{event.title}</Heading>
                  <DateLabel>
                    {new Date(
                      new Date(event.timeToEnd.seconds * 1000)
                    ).toLocaleDateString()}
                  </DateLabel>
                  {
                    <CountdownTimer
                      countdownTimestampMs={
                        new Date(event.timeToEnd.seconds * 1000)
                      }
                      Day
                      Hour={index === 0}
                      Minute={index === 0}
                    />
                  }
                  <Tag color={event.tagColour} disableClick>
                    {event.tagTitle}
                  </Tag>
                  <ButtonsWrapper>
                    <ButtonIconStyle
                      icon="edit"
                      editButton
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsSortModuleAppear(false);
                      }}
                    />
                    <ButtonIconStyle
                      icon="delete"
                      deleteButton
                      onClick={() => {
                        handleDelete(event.id, event.title);
                        setIsSortModuleAppear(false);
                      }}
                    />
                  </ButtonsWrapper>
                  {selectedEvent && selectedEvent.id === event.id && (
                    <EditDateNote
                      eventData={selectedEvent}
                      onClose={() => setSelectedEvent(false)}
                      handlerManageInfoLabel={handlerManageInfoLabel}
                    />
                  )}
                </EventWrapper>
              ))}
            </>
          );
        })()
      )}
    </Wrapper>
  );
};

export default MainList;
