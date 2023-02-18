import React, { useState } from "react";
import "./App.css";
import MainList from "./Components/organisms/MainList";
import ButtonIcon from "./Components/atoms/ButtonIcon/ButtonIcon";
import AddNewInstance from "./Components/molecules/AddNewInstance/AddNewInstance";
import plusIcon from "./assets/icons/PlusIcon.svg";
import InfoLabel from "./Components/atoms/InfoLabel/InfoLabel";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInfoLabelInModalOpen, setInfoLabelInModalOpen] = useState(false);
  const [InfoLabelMessage, setInfoLabelMessage] = useState("");

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const manageShowingInfoLabelModal = (message) => {
    setInfoLabelInModalOpen(true);
    setInfoLabelMessage(message);
    setTimeout(() => {
      setInfoLabelInModalOpen(false);
      setInfoLabelMessage("");
    }, 3000);
  };

  return (
    <>
      <ButtonIcon icon={plusIcon} onClick={toggleModal} />
      {isModalOpen ? (
        <AddNewInstance
          handlerToggleModal={toggleModal}
          handlerManageShowingInfoLabelModal={manageShowingInfoLabelModal}
        />
      ) : null}
      <MainList handlerToggleModal={toggleModal} />
    </>
  );
}

export default App;
