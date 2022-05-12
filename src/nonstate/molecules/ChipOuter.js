const STYLE = {
  backgroundColor: "#f8f8f8",
  padding: "5%",
  borderRadius: "30%",
  display: "inline-block",
  margin: "1%",
};

export default function ChipOuter({ children }) {
  return <div style={STYLE}>{children}</div>;
}
