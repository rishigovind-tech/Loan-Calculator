// src/components/ExchangeRates.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from "@mui/material";

const ExchangeRates = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  const supportedCurrencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
        );
        setRates(response.data.conversion_rates);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      }
      setLoading(false);
    };

    fetchRates();
  }, [baseCurrency]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Live Exchange Rates
      </Typography>

      <FormControl sx={{ mt: 2, mb: 4, minWidth: 200 }}>
        <InputLabel>Base Currency</InputLabel>
        <Select
          value={baseCurrency}
          label="Base Currency"
          onChange={(e) => setBaseCurrency(e.target.value)}
        >
          {supportedCurrencies.map((curr) => (
            <MenuItem key={curr} value={curr}>
              {curr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Currency</strong>
                </TableCell>
                <TableCell>
                  <strong>Rate</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(rates).map(([currency, rate]) =>
                supportedCurrencies.includes(currency) ? (
                  <TableRow key={currency}>
                    <TableCell>{currency}</TableCell>
                    <TableCell>{rate}</TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ExchangeRates;
