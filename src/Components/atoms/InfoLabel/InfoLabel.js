import React from "react";
import styled from "styled-components";

const InfoLabelWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  animation: slide-in-bottom 0.5s ease-in-out forwards,
    slide-out-bottom 1s ease-in-out forwards 5s;
  display: ${({ show }) => (show ? "none" : "block")};

  @keyframes slide-in-bottom {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translate(-50%, 0);
    }
  }

  @keyframes slide-out-bottom {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(100%);
    }
  }
`;

const InfoLabel = ({ show, message = "some message" }) => {
  return show ? (
    <InfoLabelWrapper>
      <p>{message}</p>
    </InfoLabelWrapper>
  ) : null;
};

export default InfoLabel;
