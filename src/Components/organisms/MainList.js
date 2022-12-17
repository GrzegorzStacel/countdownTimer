import React from "react";
import DateNote from "../molecules/DateNote/DateNote";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  background: green;
  padding-top: 30px;
`;
const MainList = ({ dummyValues }) => {
  return (
    <Wrapper>
      {dummyValues.map((e) => (
        <DateNote heading={e.title} deadEndDate={e.data} key={e.id} />
      ))}
    </Wrapper>
  );
};
};

export default MainList;
