import React from "react";
import styled from "styled-components";
import SortIcon from "../../../assets/icons/SortIcon";

const Button = styled.button`
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
  position: relative;
`;

const ButtonSort = ({ children, onClick }) => {
  return (
    <Button onClick={onClick}>
      {children}
      <SortIcon />
    </Button>
  );
};

export default ButtonSort;
