const STYLE = {
  backgroundColor: "#f8f8f8",
  padding: "3%",
  borderRadius: "20%",
  display: "inline-block",
  margin: "1%",
};

export const STYLE_TITLE = { fontSize: "x-small", color: "gray" };
export const STYLE_BODY = { fontSize: "normal" };

export default function ChipOuter({ children }) {
  return <div style={STYLE}>{children}</div>;
}
