import React from "react";

const STYLE = {
  display: "inline-block",
  marginBottom: "1%",
  marginTop: "1%",
  marginLeft: "1%",
  marginRight: "10%",
  maxWidth: 250,
};

export const STYLE_TITLE = { fontSize: "xx-small", color: "gray" };
export const STYLE_BODY = { fontSize: "small" };

export default function ChipOuter({ children }) {
  return <div style={STYLE}>{children}</div>;
}
