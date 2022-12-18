import React, { useState } from "react";
import "./App.css";
import MainList from "./Components/organisms/MainList";
import ButtonIcon from "./Components/atoms/ButtonIcon/ButtonIcon";
import AddNewInstance from "./Components/molecules/AddNewInstance/AddNewInstance";
import plusIcon from "./assets/icons/Plusicon.svg";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = [
    { title: "OC Peugeot", data: new Date("December 20, 2023"), id: 1 },
    { title: "Moje urodziny", data: new Date("September 25, 2023"), id: 2 },
    { title: "Przegląd Vectra", data: new Date("January 13, 2023"), id: 3 },
  ];

  const sortedInitialValues = [].concat(initialValues);
  sortedInitialValues
    .sort((a, b) => (a.data.getTime() > b.data.getTime() ? 1 : -1))
    .map((item, i) => <div key={i}> {item.data}</div>);

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
      <MainList openModalFn={openModal} dummyValues={sortedInitialValues} />
    </>
  );
}

export default App;
