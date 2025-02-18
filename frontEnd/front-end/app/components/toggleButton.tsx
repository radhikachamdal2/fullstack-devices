import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface ToggleButtonsProps {
  showCompleted: boolean;
  setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  showCompleted,
  setShowCompleted,
}) => {
  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setShowCompleted(newValue === "completed");
    }
  };

  return (
    <ToggleButtonGroup
      value={showCompleted ? "completed" : "all"}
      exclusive
      onChange={handleToggle}
      aria-label="View Accounts"
    >
      <ToggleButton
        role="button"
        value="completed"
        aria-label=" View All Devices"
      >
        All Devices
      </ToggleButton>
      <ToggleButton role="button" value="all" aria-label="View All Accounts">
        All Accounts
      </ToggleButton>
      <ToggleButton role="button" value="all" aria-label="View All Accounts">
        View Accounts with Devices
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
