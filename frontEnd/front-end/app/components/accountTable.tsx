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
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
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
          {tasks?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTask?.id === item.id}
                  onChange={(event) => checkboxHandler(event, item)}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email || item.device}</TableCell>
              <TableCell
                style={{
                  backgroundColor:
                    item.status === "Not Started"
                      ? "#cc2204" //red
                      : item.status === "In Progress"
                      ? "#fcba03" //amber
                      : "#2ea314", //green

                  color: "#FFFFFF",
                  textAlign: "center",
                  borderRadius: "2px",
                  fontWeight: 700,
                }}
              >
                {item.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountTable;
