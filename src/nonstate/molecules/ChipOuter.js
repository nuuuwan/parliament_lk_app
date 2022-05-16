const STYLE = {
  backgroundColor: "#f8f8f8",
  padding: "1%",
  borderRadius: "5%",
  display: "inline-block",
  margin: "1%",
  maxWidth: 100,
};

export const STYLE_TITLE = { fontSize: "xx-small", color: "gray" };
export const STYLE_BODY = { fontSize: "small" };

export default function ChipOuter({ children }) {
  return <div style={STYLE}>{children}</div>;
}
