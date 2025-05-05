// src/components/ErrorPage.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      bgcolor="background.paper"
      textAlign="center"
    >
      <Typography variant="h3" color="black" gutterBottom>
      Something went wrong in the application.
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")} // Redirect to the homepage
        sx={{ marginTop: 2 }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
