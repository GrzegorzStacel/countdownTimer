import React, { useState } from "react";
import "./App.css";
import MainList from "./Components/organisms/MainList";
import ButtonIcon from "./Components/atoms/ButtonIcon/ButtonIcon";
import AddNewInstance from "./Components/molecules/AddNewInstance/AddNewInstance";
import logo from "./assets/icons/logo.png";
import plusIcon from "./assets/icons/PlusIcon.svg";
import withInfoLabel from "./hoc/withInfoLabel";
import GlobalStyle from "./theme/GlobalStyle";

function App({ manageShowingInfoLabel }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const manageInfoLabel = (message) => {
    manageShowingInfoLabel(message);
  };

  return (
    <>
      <GlobalStyle />
      <img src={logo} alt="Moja ikona" />
      <ButtonIcon icon={plusIcon} onClick={toggleModal} />
      {isModalOpen ? (
        <AddNewInstance
          handlerToggleModal={toggleModal}
          handlerManageInfoLabel={manageInfoLabel}
        />
      ) : null}
      <MainList
        handlerToggleModal={toggleModal}
        handlerManageInfoLabel={manageInfoLabel}
      />
    </>
  );
}

export default withInfoLabel(App);
