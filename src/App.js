import React, { useState } from "react";
import "./App.css";
import MainList from "./Components/organisms/MainList";
import ButtonIcon from "./Components/atoms/ButtonIcon/ButtonIcon";
import AddNewInstance from "./Components/molecules/AddNewInstance/AddNewInstance";
import plusIcon from "./assets/icons/Plusicon.svg";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = [
    { title: "OC Peugeot", data: new Date("Dec 20, 2024"), id: 1 },
    { title: "Moje urodziny", data: new Date("Sept 25, 2023"), id: 2 },
    { title: "Przegląd Vectra", data: new Date("Jan 13, 2023"), id: 3 },
  ];

  const sortValues = () => {
    const sortedInitialValues = [].concat(initialValues);
    sortedInitialValues
      .sort((a, b) => (a.data.getTime() > b.data.getTime() ? 1 : -1))
      .map((item, i) => <div key={i}> {item.data}</div>);

    return sortedInitialValues;
  };

  const [stateValues, setStateValues] = useState(sortValues);

  const openModal = () => {
    setIsModalOpen(() => true);
  };

  const closeModal = () => {
    setIsModalOpen(() => false);
  };

  const updateInitialValues = (newItem) => {
    initialValues.push(newItem);
    setStateValues(sortValues);
  };

  return (
    <>
      <ButtonIcon icon={plusIcon} onClick={openModal} />
      <MainList openModalFn={openModal} dummyValues={stateValues} />
    </>
  );
}

export default App;
