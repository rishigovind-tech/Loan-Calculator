// src/App.jsx
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";
// import About from "./components/About"; // Optional future route
// import ExchangeRates from "./components/ExchangeRates";
// import ErrorPage from "./components/ErrorPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
          <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
