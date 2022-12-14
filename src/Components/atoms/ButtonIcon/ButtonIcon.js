import styled from "styled-components";

const ButtonIcon = styled.button`
  display: block;
  width: 67px;
  height: 67px;
  border-radius: 20px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50% 50%;
  background-color: green;
  color: yellow;
  border: none;
  margin: 0 auto 30px auto;

  &:hover {
    background-color: white;
  }
`;

export default ButtonIcon;
