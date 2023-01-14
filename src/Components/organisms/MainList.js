import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ThreeDots as Loader } from "react-loader-spinner";
import DateNote from "../molecules/DateNote/DateNote";
import styled from "styled-components";
import ButtonIcon from "../atoms/ButtonIcon/ButtonIcon";
import deleteIcon from "../../assets/icons/DeleteIcon.svg";

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
              icon={deleteIcon}
              onClick={() => deleteDateNote(event.id, event.title)}
            />
          </>
        ))
      )}
    </Wrapper>
  );
};

export default MainList;
