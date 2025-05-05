import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Dashboard = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyEMI, setMonthlyEMI] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [currency, setCurrency] = useState("USD");

  const supportedCurrencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const N = parseInt(loanTerm) * 12;

    if (!P || !annualRate || !N) return;

    const R = annualRate / 12 / 100;
    const emi =
      (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    setMonthlyEMI(emi.toFixed(2));
    generateSchedule(P, R, N, emi);
  };

  const generateSchedule = (P, R, N, emi) => {
    const scheduleData = [];
    let balance = P;

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principal = emi - interest;
      balance -= principal;

      scheduleData.push({
        month: i,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : "0.00",
      });
    }

    setSchedule(scheduleData);
  };

  const resetForm = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setMonthlyEMI(null);
    setSchedule([]);
    setCurrency("USD");
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Loan Amount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Interest Rate (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Term (Years)"
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3} display="flex" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={calculateEMI}
          >
            CALCULATE
          </Button>
        </Grid>
      </Grid>

      {monthlyEMI && (
        <>
          <Box my={3} display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h6">
                Monthly EMI: {currency} {monthlyEMI}
              </Typography>
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={currency}
                  label="Currency"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {supportedCurrencies.map((curr) => (
                    <MenuItem key={curr} value={curr}>
                      {curr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetForm}
              >
                Reset Table
              </Button>
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Amortization Schedule ({currency})
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>MONTH</TableCell>
                  <TableCell>PRINCIPAL</TableCell>
                  <TableCell>INTEREST</TableCell>
                  <TableCell>BALANCE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{row.principal} {currency}</TableCell>
                    <TableCell>{row.interest} {currency}</TableCell>
                    <TableCell>{row.balance} {currency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
