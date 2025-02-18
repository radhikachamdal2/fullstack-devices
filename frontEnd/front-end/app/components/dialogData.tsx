import { Button, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION, GET_ACCOUNTS } from "../queries/queries";

interface DialogDataProps {
  headers: Array<{
    title: string;
    description: string[];
    type: string;
  }>;
  handleClose?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSubmit: (newTask: {
    id: number;
    title: string;
    description: string[];
    status: string;
  }) => void;
  tasks: Array<{
    id: number;
    title: string;
    description: string[];
    status: string;
  }>;
}

const DialogData: React.FC<DialogDataProps> = ({ headers, handleClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [createAccount, { loading, error }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: (data) => {
        console.log("Account created successfully:", data);
      },
      onError: (err) => {
        console.error("Error creating account:", err);
      },

      refetchQueries: [
        {
          query: GET_ACCOUNTS,
        },
      ],
    }
  );

  const submitHandler = useCallback(
    (data: Record<string, string>) => {
      const input = {
        name: data.title,
        email: data.description,
      };

      createAccount({ variables: { input } });
    },

    [createAccount]
  );

  return (
    <form role="form" onSubmit={handleSubmit(submitHandler)}>
      {headers?.map((item, index) => (
        <Controller
          key={index}
          name={item.title.toLowerCase()}
          control={control}
          rules={{
            required: `${item.title} is required`,
          }}
          render={({ field: controllerField }) => (
            <TextField
              {...controllerField}
              sx={{ width: "80%", padding: "10px" }}
              id={item.title}
              name={item.title}
              label={item.title}
              variant="standard"
              error={!!errors[item.title.toLowerCase()]}
              value={controllerField.value || ""}
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
          variant={"contained"}
          color="primary"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          sx={{ backgroundColor: "black", textTransform: "none" }}
          variant={"contained"}
          type="submit"
          color="primary"
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default DialogData;
