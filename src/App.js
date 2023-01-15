import React, { useState } from "react";
import "./App.css";
import MainList from "./Components/organisms/MainList";
import ButtonIcon from "./Components/atoms/ButtonIcon/ButtonIcon";
import AddNewInstance from "./Components/molecules/AddNewInstance/AddNewInstance";
import plusIcon from "./assets/icons/PlusIcon.svg";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <ButtonIcon icon={plusIcon} onClick={toggleModal} />
      {modalOpen ? <AddNewInstance closeModalFn={toggleModal} /> : null}
      <MainList openModalFn={toggleModal} />
    </>
  );
}

export default App;
