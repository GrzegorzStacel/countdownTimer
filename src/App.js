import "./App.css";
import React, { useState } from "react";
import CountdownTimer from "./Components/CountdownTimer/CountdownTimer";
import styled from "styled-components";
import Calendar from "moedim";

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  background-color: gray;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCalendar = styled(Calendar)`
  --moedim-primary: green;
`;

function App() {
  const [value, setValue] = useState(new Date());
  const setData = new Date(value).getTime();

  return (
    <AppContainer>
      <h1>OC Peugeot</h1>
      <CountdownTimer countdownTimestampMs={setData} />
      <StyledCalendar
        value={value}
        onChange={(d) => setValue(d)}
        locale={"pl-PL"}
      />
    </AppContainer>
  );
}

export default App;
