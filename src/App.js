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

    const url = window.location.href;

    let selectedLang;
    let activeMPId;
    let xDim;
    let yDim;

    const params = decodeURI(url).split("#");
    if (params && params.length >= 5) {
      selectedLang = params[1];
      activeMPId = params[2];
      xDim = params[3];
      yDim = params[4];
    }

    return (
      <ThemeProvider theme={theme}>
        <HomePage
          selectedLang={selectedLang}
          activeMPId={activeMPId}
          xDim={xDim}
          yDim={yDim}
        />
      </ThemeProvider>
    );
  }
}
