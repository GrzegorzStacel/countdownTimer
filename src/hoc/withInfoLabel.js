import React, { useState } from "react";
import InfoLabelWrapper from "../Components/atoms/InfoLabelWrapper/InfoLabelWrapper";

const withInfoLabel = (WrappedComponent) => {
  return (props) => {
    const [infoLabelMessage, setInfoLabelMessage] = useState("");
    const [infoLabelOpen, setInfoLabelOpen] = useState(false);

    const handleManageShowingInfoLabel = (message) => {
      setInfoLabelMessage(message);
      setInfoLabelOpen(true);
      setTimeout(() => {
        setInfoLabelOpen(false);
        setInfoLabelMessage("");
      }, 3000);
    };

    return (
      <>
        {infoLabelOpen && <InfoLabelWrapper message={infoLabelMessage} />}
        <WrappedComponent
          {...props}
          manageShowingInfoLabel={handleManageShowingInfoLabel}
        />
      </>
    );
  };
};

export default withInfoLabel;
