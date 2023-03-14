import styled, { css, useTheme } from "styled-components";
import PropTypes from "prop-types";
import PlusIcon from "../../../assets/icons/PlusIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";

const Button = styled.button`
  display: block;
  position: relative;
  background-color: transparent;
  width: 60px;
  height: 50px;
  border-radius: 0;
  border: none;
  transition: 0.1s;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${({ addButton }) =>
    addButton &&
    css`
      background-color: ${({ theme }) => theme.primary};
      position: fixed;
      top: 0;
      right: 0;
      border-radius: 0 0 0 25px;
      &:hover {
        background-color: ${({ theme }) => theme.hover.surface};
      }
    `}
`;

const ButtonIcon = ({ onClick, addButton, editButton, deleteButton }) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      addButton={addButton}
      editButton={editButton}
      deleteButton={deleteButton}
    >
      {addButton && <PlusIcon theme={theme} />}
      {editButton && <EditIcon theme={theme} />}
      {deleteButton && <DeleteIcon theme={theme} />}
    </Button>
  );
};

ButtonIcon.propTypes = {
  onClick: PropTypes.func,
};

export default ButtonIcon;
