import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface HeroSectionProps {
  name: string;
  title: string;
  summary: string;
}

export default function HeroSection({ name, title, summary }: HeroSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, var(--mui-palette-primary-main), var(--mui-palette-secondary-main))",
        color: "primary.contrastText",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700}>
          {name}
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
        <Typography variant="body1" component="p" sx={{ opacity: 0.85, maxWidth: 700, mx: "auto", mt: 2 }}>
          {summary}
        </Typography>
      </Container>
    </Box>
  );
}
