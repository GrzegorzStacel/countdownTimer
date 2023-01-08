import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { ThreeDots as Loader } from "react-loader-spinner";
import DateNote from "../molecules/DateNote/DateNote";
import styled from "styled-components";

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

  useEffect(() => {
    const deadEndsRef = query(
      collection(db, "deadEnds"),
      orderBy("timeToEnd", "asc")
    );
    const unsubscribe = onSnapshot(deadEndsRef, (snapshot) => {
      let tmpEvents = [];
      snapshot.forEach((doc) => {
        tmpEvents.push({ ...doc.data(), id: doc.id });
      });
      setEvents(tmpEvents);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <LoaderCenter>
          <Loader color="black" height={80} width={80} />
        </LoaderCenter>
      ) : (
        events.map((event) => (
          <DateNote
            key={event.id}
            heading={event.title}
            deadEndDate={new Date(event.timeToEnd.seconds * 1000)}
          />
        ))
      )}
    </Wrapper>
  );
};

export default MainList;
