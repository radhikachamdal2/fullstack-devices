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

type Device = {
  name: string;
  device: string;
};

type Account = {
  id: number;
  name: string;
  email: string;
  devices: [Device];
};

interface AccountTableProps {
  accountData: Account[];
  headers: string[];
}

const AccountTable: React.FC<AccountTableProps> = ({
  accountData,
  headers,
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

  const getDeviceColumnContent = (devices: Device[]) => {
    if (!devices?.length) {
      return <span style={{ color: "gray" }}>No Devices</span>;
    }

    const deviceNames = devices.map(({ device }) => device).join(", ");

    return <span>{deviceNames}</span>;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers?.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {accountData?.map((account) => (
            <React.Fragment key={account.id}>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{account.name}</TableCell>
                {/* Conditionally render the email cell if email is present */}
                {account.email && <TableCell>{account.email}</TableCell>}
                <TableCell>{getDeviceColumnContent(account.devices)}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountTable;
