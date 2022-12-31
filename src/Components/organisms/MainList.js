import React, { useEffect, useState } from "react";
import DateNote from "../molecules/DateNote/DateNote";
import styled from "styled-components";
import PropTypes from "prop-types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const Wrapper = styled.div`
  display: block;
  background: green;
  padding-top: 30px;
`;

const MainList = ({ dummyValues }) => {
  const [eventFromDB, setEventFromDB] = useState();

  useEffect(() => {
    console.log(eventFromDB);
  }, [eventFromDB]);

  useEffect(() => {
    getEventFromDB();
  }, []);

  const getEventFromDB = () => {
    const eventsCollectionRef = collection(db, "deadEnds");
    getDocs(eventsCollectionRef)
      .then((res) => {
        const events = res.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setEventFromDB(events);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Wrapper>
      {Array.isArray(eventFromDB)
        ? eventFromDB.map((e) => (
            <DateNote
              heading={e.data.title}
              deadEndDate={new Date(e.data.timeToEnd.seconds * 1000)}
            />
          ))
        : console.log("null", eventFromDB)}
      {/*  {dummyValues.map((e) => (*/}
      {/*  <DateNote heading={e.title} deadEndDate={e.data} key={e.id} />*/}
      {/*))}*/}
    </Wrapper>
  );
};

MainList.propTypes = {
  dummyValues: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      data: PropTypes.instanceOf(Date).isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};

export default MainList;
