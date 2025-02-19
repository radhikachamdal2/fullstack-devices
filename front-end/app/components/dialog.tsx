import React from "react";
import {
  Dialog as ReusableDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

interface DialogProps {
  title: string;
  contentText: string;
  children: React.ReactNode;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  contentText,
  children,
  open,
  handleClose,
}) => {
  return (
    <>
      <ReusableDialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          {children}
        </DialogContent>
      </ReusableDialog>
    </>
  );
};

export default Dialog;
