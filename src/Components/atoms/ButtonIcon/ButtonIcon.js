import styled, { css, useTheme } from "styled-components";
import PropTypes from "prop-types";
import PlusIcon from "../../../assets/icons/PlusIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.red};
  margin: 5px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  transition: 0.1s;

  ${({ addButton }) =>
    addButton &&
    css`
      background-color: ${({ theme }) => theme.primary};
      position: fixed;
      top: 0;
      right: 0;
      border-radius: 0 0 0 25px;
      width: 60px;
      &:hover {
        background-color: ${({ theme }) => theme.hover.surface};
      }
    `}

  ${({ deleteButton }) =>
    deleteButton &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.hover.red};
      }
    `}

  ${({ editButton }) =>
    editButton &&
    css`
      background-color: ${({ theme }) => theme.on.secondary};

      &:hover {
        background-color: ${({ theme }) => theme.hover.surface};
      }
    `}
  
  ${({ closeButton }) =>
    closeButton &&
    css`
      background: transparent;
      border: none;
      width: 60px;
      height: 60px;
    `}
`;

const ButtonIcon = ({
  onClick,
  addButton,
  editButton,
  deleteButton,
  closeButton,
}) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      addButton={addButton}
      editButton={editButton}
      deleteButton={deleteButton}
      closeButton={closeButton}
    >
      {addButton && <PlusIcon theme={theme} />}
      {editButton && <EditIcon theme={theme} />}
      {deleteButton && <DeleteIcon theme={theme} />}
      {closeButton && <CloseIcon theme={theme} />}
    </Button>
  );
};

ButtonIcon.propTypes = {
  onClick: PropTypes.func,
};

export default ButtonIcon;
