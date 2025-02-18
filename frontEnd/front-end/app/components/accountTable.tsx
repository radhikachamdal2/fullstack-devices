"use client";
import {
  Paper,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Checkbox,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

type Task = {
  id: number;
  title: string;
  description: string[];
  status: string;
};

interface AccountTableProps {
  tasks: Task[];
  taskHeaders: string[];
  checkboxHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    task: Task
  ) => void;
  selectedTask: Task | null;
}

const AccountTable: React.FC<AccountTableProps> = ({
  tasks,
  taskHeaders,
  checkboxHandler,
  selectedTask,
}) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {taskHeaders?.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks?.map((account) => (
            <React.Fragment key={account.id}>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={selectedTask?.id === account.id}
                    onChange={(event) => checkboxHandler(event, account)}
                  />
                </TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>
                  {account.devices?.map((device) => device.name).join(", ") ||
                    "No Devices"}
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountTable;
