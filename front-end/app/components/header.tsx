import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

interface HeaderProps {
  navigationHeader: string;
}

const Header: React.FC<HeaderProps> = ({ navigationHeader }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          data-testid="toolbar"
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h1"
            noWrap
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            {navigationHeader}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Avatar>R</Avatar>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
