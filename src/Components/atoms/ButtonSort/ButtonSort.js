import React from "react";
import styled from "styled-components";
import SortIcon from "../../../assets/icons/SortIcon";

const Sort = styled.button`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.on.surface};
  font-size: ${({ theme }) => theme.fontSize.s};
  align-self: flex-start;
  padding: 10px 5px;
  min-width: 120px;
  border: none;
  border-radius: 35px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonSort = ({ children, setSortList }) => {
  return (
    <Sort onClick={() => setSortList("title")}>
      {children}
      <SortIcon />
    </Sort>
  );
};

export default ButtonSort;
