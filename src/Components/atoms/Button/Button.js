import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  width: 130px;
  background-color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 9px;
  margin-top: 15px;
  margin-right: 15px;
  border-radius: 10px;
  border: none;

  &:hover {
    filter: saturate(85%) brightness(85%);
    color: white;
  }

  ${({ cancel }) =>
    cancel &&
    css`
      background-color: ${({ theme }) => theme.red};
    `}
`;
export default Button;
