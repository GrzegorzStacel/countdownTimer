import React, { useEffect, useState } from "react";
import DateNote from "../molecules/DateNote/DateNote";
import styled from "styled-components";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import Loader from "react-loader-spinner";

const Wrapper = styled.div`
  display: block;
  background: green;
  padding-top: 30px;
`;

const MainList = ({ dummyValues }) => {
  const [eventFromDB, setEventFromDB] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "deadEnds"), orderBy("timeToEnd", "asc"));
      const unsubscribe = onSnapshot(q, (querySnapShot) => {
        let deadEndArr = [];
        querySnapShot.forEach((doc) => {
          deadEndArr.push({ ...doc.data(), id: doc.id });
        });
        setEventFromDB(deadEndArr);
        setIsLoading(false);
      });
      return () => unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {console.log("render")}
      {!isLoading &&
        eventFromDB.map((e) => (
          <DateNote
            key={e.id}
            heading={e.title}
            deadEndDate={new Date(e.timeToEnd.seconds * 1000)}
          />
        ))}
    </Wrapper>
  );
};

export default MainList;
