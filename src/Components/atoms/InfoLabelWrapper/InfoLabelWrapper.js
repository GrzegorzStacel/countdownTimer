import React, { useState, useEffect } from "react";
import InfoLabel from "../InfoLabel/InfoLabel";

const InfoLabelWrapper = ({ message, timeout = 3000 }) => {
  const [show, setShow] = useState(false);

  console.log("wrapper", message, show);
  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [message, timeout]);

  return <InfoLabel visible={show} message={message} />;
};

export default InfoLabelWrapper;
