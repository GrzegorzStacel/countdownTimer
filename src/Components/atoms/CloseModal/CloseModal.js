import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;

  ${({ setBackground }) =>
    setBackground &&
    `
    background-color: rgba(0, 0, 0, 0.4);
  `};
`;

const CloseModal = ({ onClick, setBackground }) => {
  return <ModalOverlay onClick={onClick} setBackground={setBackground} />;
};

export default CloseModal;
