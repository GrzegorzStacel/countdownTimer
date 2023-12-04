import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";

import MainList from "./Components/organisms/MainList";
import AddNewInstance from "./Components/molecules/AddNewInstance/AddNewInstance";
import withInfoLabel from "./hoc/withInfoLabel";
import GlobalStyle from "./theme/GlobalStyle";
import { theme } from "./theme/mainTheme";
import Navbar from "./Components/Navbar/Navbar";

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
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar handlerOnClick={toggleModal} />
        {isModalOpen ? (
          <AddNewInstance
            handlerToggleModal={toggleModal}
            handlerManageInfoLabel={manageInfoLabel}
          />
        ) : null}
        <MainList handlerManageInfoLabel={manageInfoLabel} />
      </ThemeProvider>
    </>
  );
}

export default withInfoLabel(App);
