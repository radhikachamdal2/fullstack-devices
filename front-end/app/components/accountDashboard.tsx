"use client";

import { Button, Alert, Snackbar } from "@mui/material";
import AccountTable from "./accountTable";
import { accountHeaders, accountData, deviceHeaders } from "../mockData";
import { useState } from "react";
import Dialog from "./dialog";
import DialogData from "./dialogData";
import ToggleButtons from "./toggleButton";
import { useQuery } from "@apollo/client";
import {
  GET_ACCOUNTS,
  GET_DEVICES,
  CREATE_ACCOUNT_MUTATION,
} from "../queries/queries";
import { useMutation } from "@apollo/client";

const AccountDashboard = () => {
  const [newAccountDialog, setNewAccountDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAllAccounts, setShowAllAccounts] = useState(false);

  const {
    loading: AccountsLoad,
    error: AccountsError,
    data: AccountsData,
  } = useQuery(GET_ACCOUNTS);
  const {
    loading: DeviceLoading,
    error: DeviceError,
    data: DeviceData,
  } = useQuery(GET_DEVICES);

  const isLoading = AccountsLoad || DeviceLoading;
  const isError = AccountsError || DeviceError;

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
      ? { data: AccountsData?.accounts || [], headers: accountHeaders }
      : { data: DeviceData?.devices || [], headers: deviceHeaders };

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

      {/* Loading and Error Handling */}
      {isLoading || (createAccountLoading && <p>Loading...</p>)}
      {isError ||
        (createAccountError && (
          <Snackbar open={showAlert} autoHideDuration={4000} onClose={() => {}}>
            <Alert severity="error">
              {AccountsError && `Accounts Error`}
              {DeviceError && ` Devices Error`}
            </Alert>
          </Snackbar>
        ))}

      {!isLoading && <AccountTable headers={headers} accountData={data} />}

      <Dialog
        open={newAccountDialog}
        handleClose={() => setNewAccountDialog(false)}
        title="Create New Account"
        contentText="Please fill all fields to add new account"
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
