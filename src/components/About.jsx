// src/components/About.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const About = () => {
  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          About This Application
        </Typography>

        <Typography variant="body1" paragraph>
          This Loan Calculator application is a tool designed to help users estimate their monthly loan repayments based on the loan amount, interest rate, and loan term. It also generates a detailed amortization schedule that shows the breakdown of principal and interest payments over time.
        </Typography>

        <Typography variant="body1" paragraph>
          Key features include:
        </Typography>

        <ul>
          <li>
            <Typography variant="body1">
              EMI (Equated Monthly Installment) calculation based on inputs
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Amortization schedule with monthly principal and interest breakdown
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Support for multiple currencies
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Live exchange rates to convert loan amounts
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Light/Dark theme toggle for better user experience
            </Typography>
          </li>
        </ul>

        <Typography variant="body1" paragraph>
          This tool is ideal for individuals planning to take a loan or financial institutions that want to provide quick loan insights to clients.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;
