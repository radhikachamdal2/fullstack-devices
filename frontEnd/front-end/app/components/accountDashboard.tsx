"use client";

import { Button, Alert, Snackbar } from "@mui/material";
import AccountTable from "./accountTable";
import { taskHeaders, addNewTaskFields } from "../mockData";
import { useState, useCallback } from "react";
import Dialog from "./dialog";
import DialogData from "./dialogData";
import ToggleButtons from "./toggleButton";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS, GET_DEVICES } from "../queries/queries";

type Task = {
  id: number;
  title: string;
  description: string[];
  status: string;
};

const AccountDashboard = () => {
  const [addNewDialog, setAddNewDialog] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const checkboxHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, singleTask: Task) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        setSelectedTask(singleTask);
      } else {
        setSelectedTask(null);
      }
    },
    []
  );

  const {
    loading: AccountsLoad,
    error: AccountsError,
    data,
  } = useQuery(GET_ACCOUNTS);

  const { loading, error, data: DeviceData } = useQuery(GET_DEVICES);

  console.log(DeviceData, "data", loading, "loading", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onSubmit = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowAlert(true);
    setAddNewDialog(false);
  };

  const filterCompletedTasks = (tasks: Task[]): Task[] => {
    return tasks.filter((task) => task.status.toLowerCase() === "complete");
  };

  const displayedData = showCompleted ? DeviceData.devices : data?.accounts;

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
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
        />
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={() => setAddNewDialog(true)}
          aria-label="Open create new account form"
        >
          Create new account
        </Button>
      </div>

      <AccountTable
        selectedTask={selectedTask}
        checkboxHandler={checkboxHandler}
        taskHeaders={taskHeaders}
        tasks={displayedData}
      />
      <Dialog
        open={addNewDialog}
        handleClose={() => {
          setAddNewDialog(false);
        }}
        title="Create New Account"
        contentText="To create a new account, please fill out all the fields!"
      >
        <DialogData
          tasks={tasks}
          headers={addNewTaskFields}
          onSubmit={onSubmit}
          handleClose={() => {
            setAddNewDialog(false);
          }}
        />
        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          onClose={() => {
            setShowAlert(false);
          }}
        >
          <Alert
            onClose={() => {
              setShowAlert(false);
            }}
            severity="success"
            sx={{ width: "100%" }}
          >
            New Task Added
          </Alert>
        </Snackbar>
      </Dialog>
    </>
  );
};

export default AccountDashboard;
