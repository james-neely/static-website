import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface ProfessionalSummaryProps {
  summary: string;
}

export default function ProfessionalSummary({ summary }: ProfessionalSummaryProps) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight={700} textAlign="center">
        About Me
      </Typography>
      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
            {summary}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
