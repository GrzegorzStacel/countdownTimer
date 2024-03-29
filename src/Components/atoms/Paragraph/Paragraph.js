import React from "react";
import styled from "styled-components";

const Paragraph = styled.p`
  color: ${({ theme }) => theme.on.surface};
  display: inline-block;
`;

export default Paragraph;
