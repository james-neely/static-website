import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { ExperienceEntry } from "@/data/types";

export default function ExperienceItem({ role, company, location, startDate, endDate, highlights }: ExperienceEntry) {
  return (
    <Card component="article" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" fontWeight={600}>
          {role}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5, mb: 1.5 }}>
          <Typography variant="subtitle1" color="secondary.main" fontWeight={500}>
            {company}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            &middot; {location}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            &middot; {startDate} – {endDate}
          </Typography>
        </Box>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          {highlights.map((item) => (
            <Typography key={item} component="li" variant="body1" sx={{ mb: 0.5 }}>
              {item}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
