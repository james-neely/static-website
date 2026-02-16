import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: "center",
        borderTop: 1,
        borderColor: "divider",
        mt: "auto",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} James Neely. All rights reserved.
      </Typography>
    </Box>
  );
}
