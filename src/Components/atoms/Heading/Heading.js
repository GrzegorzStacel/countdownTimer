import styled from "styled-components";

const Heading = styled.h1`
  font-size: 1.5em;
  font-weight: 700;
  color: ${({ theme }) => theme.on.surface};
`;

export default Heading;
