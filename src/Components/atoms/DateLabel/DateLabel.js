import styled from "styled-components";

const DateLabel = styled.h2`
  font-size: 1.1em;
  font-weight: 400;
  color: ${({ theme }) => theme.on.surface};
  text-align: center;
`;

export default DateLabel;
