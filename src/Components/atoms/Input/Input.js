import React from "react";
import styled from "styled-components";

const Input = styled.input`
  background-color: ${({ theme }) => theme.hover.surface};
  border: none;
  border-radius: 15px;
  padding: 10px 15px;
  color: ${({ theme }) => theme.on.surface};
  font-weight: ${({ theme }) => theme.bold};
  width: 300px;

  display: inline-block;
  position: relative;

  &:focus {
    outline: ${({ theme }) => theme.on.surface};
  }
`;

export default Input;
