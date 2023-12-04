import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { onSnapshot, query } from "firebase/firestore";
import { dateCollectionRefTags } from "../../../firebase/firestore.collections";

import Tag from "../../atoms/Tag/Tag";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  margin: 20px 0 50px 0;
`;

const Tags = ({ handlerSetTag, className }) => {
  const [events, setEvents] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const queryRef = query(dateCollectionRefTags);
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const tmpEvents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(tmpEvents);
      setSelectedTag(tmpEvents[0]?.id);
    });

    return () => unsubscribe();
  }, []);

  const handleSetSelectedTag = useCallback(
    (tagTitle, tagColor, tagID) => {
      setSelectedTag(tagID);
      handlerSetTag(tagTitle, tagColor);
    },
    [handlerSetTag]
  );

  return (
    <Wrapper className={className}>
      {events.map((item) => (
        <Tag
          key={item.id}
          id={item.id}
          color={item.color}
          isActive={item.id === selectedTag}
          handleSetSelectedTag={handleSetSelectedTag}
          onClickSortByTag={onClickSortByTag}
        >
          {item.title}
        </Tag>
      ))}
    </Wrapper>
  );
};

Tags.propTypes = {
  handlerSetTag: PropTypes.func,
};

export default Tags;
