"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import HandymanIcon from "@mui/icons-material/Handyman";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";

const overviewCards = [
  { label: "Experience", href: "/experience", icon: <WorkIcon fontSize="large" color="secondary" /> },
  { label: "Education", href: "/education", icon: <SchoolIcon fontSize="large" color="secondary" /> },
  { label: "Skills", href: "/skills", icon: <CodeIcon fontSize="large" color="secondary" /> },
  { label: "Projects", href: "/projects", icon: <BuildIcon fontSize="large" color="secondary" /> },
  { label: "Tools", href: "/tools", icon: <HandymanIcon fontSize="large" color="secondary" /> },
  { label: "Contact", href: "/contact", icon: <EmailIcon fontSize="large" color="secondary" /> },
];

export default function OverviewCards() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Grid container spacing={3}>
        {overviewCards.map((card) => (
          <Grid key={card.href} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: "100%" }}>
              <CardActionArea component={Link} href={card.href} sx={{ height: "100%", p: 2, textAlign: "center" }}>
                <CardContent>
                  {card.icon}
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {card.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
