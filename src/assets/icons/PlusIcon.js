import React from "react";

const PlusIcon = ({ theme }) => {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" aria-label="Ikona plusa">
      <path
        d="M12 5v14M5 12h14"
        stroke={theme.on.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
