import React, { useState } from "react";
import "./App.css";
import MainList from "./Components/organisms/MainList";
import ButtonIcon from "./Components/atoms/ButtonIcon/ButtonIcon";
import AddNewInstance from "./Components/molecules/AddNewInstance/AddNewInstance";
import plusIcon from "./assets/icons/PlusIcon.svg";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(() => true);
  };

  const closeModal = () => {
    setIsModalOpen(() => false);
  };

  return (
    <>
      <ButtonIcon icon={plusIcon} onClick={openModal} />
      {isModalOpen ? <AddNewInstance closeModalFn={closeModal} /> : null}
      <MainList openModalFn={openModal} />
    </>
  );
}

export default App;
