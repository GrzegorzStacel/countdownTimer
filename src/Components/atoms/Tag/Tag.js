import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Tag = ({
  color,
  children,
  isActive,
  id,
  handleSetSelectedTag,
  disableClick,
  onClickSortByTag,
}) => {
  const [localIsActive, setLocalIsActive] = useState(true);

  const handlerOnClick = () => {
    if (onClickSortByTag) {
      // Execute this code if you want to sort the data in the MainList component by a specific tag
      onClickSortByTag(children, true, "asc");
      return;
    }
    if (!disableClick) {
      // Execute this code when we don't add disableClick prop
      // isActive = true;
      // console.log("isactive", isActive);
      handleSetSelectedTag(children, color);
    }

    // Do nothing when we add disableClick prop to the alone Tag component
  };

  useEffect(() => {
    setLocalIsActive(isActive);
    // console.log("Tag-useeffect");
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
  color: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  id: PropTypes.string,
  disableClick: PropTypes.bool,
};

export default Tag;

const Wrapper = styled.div`
  width: 155px;
  text-align: center;
  padding: 5px 10px;
  background-color: ${({ color }) => color};
  cursor: default;
  color: ${({ theme }) => theme.surface};
  filter: brightness(70%);

  &:hover {
    filter: ${({ isActive }) =>
      isActive ? "brightness(120%)" : "saturate(85%) brightness(100%)"};
  }

  ${({ disableClick }) =>
    disableClick &&
    css`
      filter: brightness(100%);
      color: black;
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      filter: brightness(120%);
      color: ${({ theme }) => theme.on.secondary};
    `}
`;
