const STYLE_N = {
  fontSize: 12,
  fontWeight: "bold",
};

const STYLE_MPS = {
  fontSize: 9,
  color: "gray",
};

export default function PctWidget(props) {
  const { n } = props;
  if (n === 0) {
    return null;
  }

  const labelMP = " MP" + (n === 1 ? "" : "s");

  return (
    <div>
      <span style={STYLE_N}>{n}</span>
      <span style={STYLE_MPS}>{labelMP}</span>
    </div>
  );
}
