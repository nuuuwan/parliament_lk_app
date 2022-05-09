import React from "react";
import ReactGA from "react-ga";
import HomePage from "./stateful/pages/HomePage.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

const TRACKING_ID = "UA-228120741-2";
ReactGA.initialize(TRACKING_ID);

const theme = createTheme({
  typography: {
    fontFamily: ["PT Sans", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
