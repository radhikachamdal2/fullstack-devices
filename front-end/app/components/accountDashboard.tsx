"use client";

import { Button, Alert, Snackbar } from "@mui/material";
import AccountTable from "./accountTable";
import { accountHeaders, accountData, deviceHeaders } from "../mockData";
import { useState } from "react";
import Dialog from "./dialog";
import DialogData from "./dialogData";
import ToggleButtons from "./toggleButton";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ACCOUNTS,
  GET_DEVICES,
  CREATE_ACCOUNT_MUTATION,
} from "../queries/queries";

const AccountDashboard = () => {
  const [newAccountDialog, setNewAccountDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAllAccounts, setShowAllAccounts] = useState(false);

  // Queries
  const {
    loading: accountsLoading,
    error: accountsError,
    data: accountsData,
  } = useQuery(GET_ACCOUNTS);
  const {
    loading: devicesLoading,
    error: devicesError,
    data: devicesData,
  } = useQuery(GET_DEVICES);

  const isLoading = accountsLoading || devicesLoading;
  const isError = !!accountsError || !!devicesError;

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

  const filterData = () =>
    !showAllAccounts
      ? { data: accountsData?.accounts || [], headers: accountHeaders }
      : { data: devicesData?.devices || [], headers: deviceHeaders };

  const { data, headers } = filterData();

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
        <ToggleButtons
          showAllAccounts={showAllAccounts}
          setShowAllAccounts={setShowAllAccounts}
        />
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
            {devicesError && <p>Devices Error: {devicesError.message}</p>}
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
