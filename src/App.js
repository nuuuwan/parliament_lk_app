import React, { Component } from "react";
import ReactGA from "react-ga";
import HomePage from "./stateful/pages/HomePage.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

export default class App extends Component {
  render() {
    try {
      ReactGA.initialize("UA-228120741-2"); // HACK: Unittests
    } catch {}

    const theme = createTheme({
      typography: {
        fontFamily: ["PT Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
