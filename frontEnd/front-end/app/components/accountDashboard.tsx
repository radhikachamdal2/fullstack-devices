"use client";

import { Button, Alert, Snackbar } from "@mui/material";
import AccountTable from "./accountTable";
import { accountHeaders, accountData, deviceHeaders } from "../mockData";
import { useState } from "react";
import Dialog from "./dialog";
import DialogData from "./dialogData";
import ToggleButtons from "./toggleButton";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS, GET_DEVICES } from "../queries/queries";

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

  const onSubmit = () => {
    setShowAlert(true);
    setNewAccountDialog(false);
  };
  const filterData = () => {
    if (!showAllAccounts) {
      return {
        data: AccountsData?.accounts || [],
        headers: accountHeaders,
      };
    } else {
      return {
        data: DeviceData?.devices || [],
        headers: deviceHeaders,
      };
    }
  };

  const { data, headers } = filterData();

  console.log(data, "dataaa");

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
          aria-label="Open create new account form"
        >
          Create new account
        </Button>
      </div>

      {/* Loading and Error Handling */}
      {isLoading && <p>Loading...</p>}
      {isError && (
        <Snackbar open={showAlert} autoHideDuration={4000} onClose={() => {}}>
          <Alert severity="error">
            {AccountsError && `Accounts Error: ${AccountsError.message}`}
            {DeviceError && ` Devices Error: ${DeviceError.message}`}
          </Alert>
        </Snackbar>
      )}

      {/* Table */}
      {!isLoading && <AccountTable headers={headers} accountData={data} />}

      {/* Dialog for Creating New Accounts */}
      <Dialog
        open={newAccountDialog}
        handleClose={() => setNewAccountDialog(false)}
        title="Create New Account"
        contentText="To create a new account, please fill out all the fields!"
      >
        <DialogData
          data={accountData}
          onSubmit={onSubmit}
          handleClose={() => setNewAccountDialog(false)}
        />
      </Dialog>

      {/* Success Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          New Task Added
        </Alert>
      </Snackbar>
    </>
  );
};

export default AccountDashboard;
