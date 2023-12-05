import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import logo from "../../../assets/icons/logo.png";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon";

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.wrapperWidth};
  margin: 10px auto 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  padding: 20px;
`;

const Navbar = ({ handlerOnClick }) => {
  return (
    <Wrapper>
      <Logo src={logo} alt="Logo" />
      <ButtonIcon addButton onClick={handlerOnClick} />
    </Wrapper>
  );
};

Navbar.defaultProps = {
  handlerOnClick: () => console.log("Handler onClick not defined"),
};

Navbar.propTypes = {
  handlerOnClick: PropTypes.func.isRequired,
};
export default Navbar;
