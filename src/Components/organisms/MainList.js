import React from "react";
import DateNote from "../molecules/DateNote/DateNote";
import styled from "styled-components";
import PropTypes from "prop-types";

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
