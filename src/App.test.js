import { render, screen } from "@testing-library/react";

import { DATE_LAST_UPDATE } from "./constants/Constants.js";

import App from "./App.js";

jest.setTimeout(20_000);

test("renders basic components", async () => {
  render(<App />);
  const text = "Last Updated " + DATE_LAST_UPDATE;
  const versionElement = await screen.findByText(text);
  expect(versionElement).toBeInTheDocument();

  const langEnElement = screen.getByText("En");
  expect(langEnElement).toBeInTheDocument();

  const randomMPElement = screen.getByText("Random MP");
  expect(randomMPElement).toBeInTheDocument();
});
