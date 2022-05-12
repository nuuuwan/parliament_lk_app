import Typography from "@mui/material/Typography";

export default function QualificationsBlurb({ body }) {
  if (!body) {
    return null;
  }
  return (
    <Typography
      variant="body2"
      sx={{
        maxWidth: 300,
        fontSize: "small",
        margin: 1,
        fontStyle: "italic",
      }}
    >
      {body}
    </Typography>
  );
}
