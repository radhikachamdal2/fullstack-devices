import { Button, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION, GET_ACCOUNTS } from "../queries/queries";

interface DialogDataProps {
  data: Array<{
    title: string;
    description: string[];
    type: string;
  }>;
  handleClose?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;

  onSubmit: () => void;
}

const DialogData: React.FC<DialogDataProps> = ({ data, handleClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [createAccount, { loading, error }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: (data) => {
        console.log("Account created successfully:", data);
        reset(); // Clear the form after successful submission
      },
      onError: (err) => {
        console.error("Error creating account:", err.message);
      },
      refetchQueries: [{ query: GET_ACCOUNTS }],
    }
  );

  const submitHandler = useCallback(
    (data: Record<string, string>) => {
      const input = {
        name: data.name,
        email: data.email,
      };

      createAccount({ variables: { input } })
        .then(() => {
          if (handleClose) {
            handleClose();
          }
        })
        .catch((err) => {
          console.error("Error creating account:", err.message);
        });
    },
    [createAccount, handleClose]
  );

  return (
    <form role="form" onSubmit={handleSubmit(submitHandler)}>
      {data?.map((item, index) => (
        <Controller
          key={index}
          name={item.title.toLowerCase()}
          control={control}
          defaultValue=""
          rules={{
            required: `${item.title} is required`,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "80%", padding: "10px" }}
              id={item.title}
              label={item.title}
              value={field.value || ""}
              variant="standard"
              error={!!errors[item.title.toLowerCase()]}
              helperText={errors[item.title.toLowerCase()]?.message || " "}
            />
          )}
        />
      ))}

      {/* Mutation Error Handling */}
      {error && <p style={{ color: "red" }}> Error: {error.message}</p>}

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
          color="primary"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          sx={{ backgroundColor: "black", textTransform: "none" }}
          variant="contained"
          type="submit"
          color="primary"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>
    </form>
  );
};

export default DialogData;
