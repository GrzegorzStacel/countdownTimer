import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InfoLabelWrapperStyle = styled.div`
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
  display: ${(show) => (show ? "block" : "none")};

  @keyframes slide-in-bottom {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translate(-50%, -15px);
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

const InfoLabel = ({ message, visible, duration }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
    if (visible) {
      setTimeout(() => {
        setIsVisible(false);
      }, duration);
    }
  }, [visible, duration]);

  return isVisible ? (
    <InfoLabelWrapperStyle> {message}</InfoLabelWrapperStyle>
  ) : null;
};

InfoLabel.propTypes = {
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
};

InfoLabel.defaultProps = {
  visible: false,
  duration: 3000,
};

export default InfoLabel;
