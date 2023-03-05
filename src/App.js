import React, { useState } from "react";
import "./App.css";
import MainList from "./Components/organisms/MainList";
import AddNewInstance from "./Components/molecules/AddNewInstance/AddNewInstance";
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
      <Navbar handlerOnClick={toggleModal} />
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
