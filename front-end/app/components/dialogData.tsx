import { Button, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

interface DialogDataProps {
  data: Array<{
    title: string;
    description: string[];
    type: string;
  }>;
  handleClose?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSubmit: (formData: Record<string, string>) => void;
}

const DialogData: React.FC<DialogDataProps> = ({
  data,
  handleClose,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = useCallback(
    (formData: Record<string, string>) => {
      onSubmit(formData);
      if (handleClose) handleClose();
    },
    [onSubmit, handleClose]
  );

  return (
    <form role="form" onSubmit={handleSubmit(submitHandler)}>
      {data?.map((item, index) => (
        <Controller
          key={index}
          name={item.title.toLowerCase()}
          control={control}
          defaultValue=""
          rules={{ required: `${item.title} is required` }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "80%", padding: "10px" }}
              id={item.title}
              label={item.title}
              variant="standard"
              error={!!errors[item.title.toLowerCase()]}
              helperText={errors[item.title.toLowerCase()]?.message || " "}
            />
          )}
        />
      ))}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          gap: "20px",
        }}
      >
        <Button
          sx={{ backgroundColor: "black", textTransform: "none" }}
          variant="contained"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          sx={{ backgroundColor: "black", textTransform: "none" }}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default DialogData;
