import React from "react";
import HomePage from "./stateful/pages/HomePage.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";



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
