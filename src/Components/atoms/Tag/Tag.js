import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  width: 100px;
  text-align: center;
  padding: 5px 10px;
  border: 2px solid transparent;
  background-color: ${({ color }) => color};

  &:hover {
    filter: saturate(85%) brightness(85%);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: black;
    `}
`;
const Tag = ({
  color,
  children,
  isActive,
  id,
  handleSetSelectedTag,
  disableClick,
}) => {
  const [localIsActive, setLocalIsActive] = useState();

  const handlerOnClick = () => {
    if (!disableClick) {
      console.log("click");
      handleSetSelectedTag(children, color, id);
    }
  };

  useEffect(() => {
    setLocalIsActive(isActive);
  }, [isActive]);

  return (
    <Wrapper
      color={color}
      onClick={handlerOnClick}
      isActive={localIsActive}
      disableClick={disableClick}
    >
      {children}
    </Wrapper>
  );
};

Tag.defaultProps = {
  isActive: false,
  color: "green",
};

Tag.propTypes = {
  handleSetSelectedTag: PropTypes.func,
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  id: PropTypes.string,
  disableClick: PropTypes.bool,
};

export default Tag;
