const STYLE_L = {
  color: "#8d153a",
};
const STYLE_A = {
  color: "#eb7400",
};
const STYLE_N = {
  color: "#ffbe29",
};
const STYLE_K = {
  color: "#00534e",
};
const STYLE_A2 = {
  color: "#00000",
};

export default function SriLankaLogo() {
  return (
    <span>
      {"Sri "}
      <span style={STYLE_L}>L</span>
      <span style={STYLE_A}>a</span>
      <span style={STYLE_N}>n</span>
      <span style={STYLE_K}>k</span>
      <span style={STYLE_A2}>a</span>
    </span>
  );
}
