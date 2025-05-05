// src/App.jsx
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";
import ExchangeRates from "./components/ExchangeRates";
import ErrorPage from "./components/ErrorPage"; 
import About from "./components/About";
import { Navigate } from "react-router-dom";


const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

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
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/exchange-rates"
            element={
              <MainLayout>
                <ExchangeRates />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route path="/error" element={<ErrorPage />} />
          {/* Redirect undefined routes to /error */}
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
