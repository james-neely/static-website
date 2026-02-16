import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function PageContainer({ title, children }: PageContainerProps) {
  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
        {title}
      </Typography>
      <Box sx={{ mt: 3 }}>{children}</Box>
    </Container>
  );
}
