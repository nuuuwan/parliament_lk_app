import Typography from "@mui/material/Typography";

export default function PctWidget(props) {
  const { count } = props;
  if (count === 0) {
    return null;
  }

  const labelMP = " MP" + (count === 1 ? "" : "s");

  return (
    <>
      <Typography variant="caption">{count}</Typography>
      <Typography variant="outlined">{labelMP}</Typography>
    </>
  );
}
