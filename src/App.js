import React, { useState } from "react";
import "./App.css";
import MainList from "./Components/organisms/MainList";
import ButtonIcon from "./Components/atoms/ButtonIcon/ButtonIcon";
import AddNewInstance from "./Components/molecules/AddNewInstance/AddNewInstance";
import plusIcon from "./assets/icons/PlusIcon.svg";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <ButtonIcon icon={plusIcon} onClick={toggleModal} />
      {isModalOpen ? <AddNewInstance handlerToggleModal={toggleModal} /> : null}
      <MainList handlerToggleModal={toggleModal} />
    </>
  );
}

export default App;
