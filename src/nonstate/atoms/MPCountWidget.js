import Typography from "@mui/material/Typography";

export default function MPCountWidget({ mpCount }) {
  if (mpCount === 0) {
    return null;
  }
  return <Typography sx={{ fontSize: "x-small" }}>{mpCount}</Typography>;
}
