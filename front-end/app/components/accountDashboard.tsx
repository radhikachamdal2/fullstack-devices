"use client";

import { Button, Alert, Snackbar } from "@mui/material";
import AccountTable from "./accountTable";
import { accountHeaders, accountData } from "../mockData";
import { useState } from "react";
import Dialog from "./dialog";
import DialogData from "./dialogData";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ACCOUNTS, CREATE_ACCOUNT_MUTATION } from "../queries/queries";

const AccountDashboard = () => {
  interface Device {
    id: string;
    name: string;
    device: string;
    accountId: string;
  }

  interface Account {
    id: string;
    name: string;
    email: string;
    devices?: Device[]; // Optional in case some accounts have no devices
  }

  const [newAccountDialog, setNewAccountDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Queries
  const {
    loading: accountsLoading,
    error: accountsError,
    data: accountsData,
  } = useQuery(GET_ACCOUNTS);

  const isLoading = accountsLoading;
  const isError = !!accountsError;

  // Mutation
  const [
    createAccount,
    { loading: createAccountLoading, error: createAccountError },
  ] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted: () => {
      setShowAlert(true);
      setNewAccountDialog(false);
    },
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  const handleCreateAccount = (formData: Record<string, string>) => {
    createAccount({
      variables: { input: { name: formData.name, email: formData.email } },
    }).catch(console.error);
  };

  const filterData = () => {
    return {
      headers: accountHeaders,
      data: Array.isArray(accountsData?.accounts)
        ? accountsData.accounts.map((account: Account) => ({
            name: account.name,
            email: account.email,
            devices: account.devices || [], // Ensure it's always an array
          }))
        : [],
    };
  };

  const { headers, data } = filterData();

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          gap: "20px",
          marginTop: "1em",
          marginBottom: "1em",
        }}
      >
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={() => setNewAccountDialog(true)}
        >
          Create new account
        </Button>
      </div>

      {isLoading || (createAccountLoading && <p>Loading...</p>)}

      {isError && (
        <Snackbar
          open={showAlert}
          autoHideDuration={4000}
          onClose={() => setShowAlert(false)}
        >
          <Alert severity="error">
            {accountsError && <p>Accounts Error: {accountsError.message}</p>}
            {createAccountError && (
              <p>Create Account Error: {createAccountError.message}</p>
            )}
          </Alert>
        </Snackbar>
      )}

      {!isLoading && <AccountTable headers={headers} accountData={data} />}

      <Dialog
        open={newAccountDialog}
        handleClose={() => setNewAccountDialog(false)}
        title="Create New Account"
        contentText="Please fill all fields to add a new account"
      >
        <DialogData
          data={accountData}
          onSubmit={handleCreateAccount}
          handleClose={() => setNewAccountDialog(false)}
        />
      </Dialog>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          New Account Added
        </Alert>
      </Snackbar>
    </>
  );
};

export default AccountDashboard;
