import React from "react";
import styled from "styled-components";

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.on.surface};
  font-weight: bold;
  padding-right: 10px;
`;

export default Label;
