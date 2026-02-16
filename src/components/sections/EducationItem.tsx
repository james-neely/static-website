import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { EducationEntry } from "@/data/types";

export default function EducationItem({ institution, credential, graduationDate, honors }: EducationEntry) {
  return (
    <Card component="article" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" fontWeight={600}>
          {institution}
        </Typography>
        <Typography variant="subtitle1" color="secondary.main" fontWeight={500}>
          {credential}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          {graduationDate}
          {honors && ` — ${honors}`}
        </Typography>
      </CardContent>
    </Card>
  );
}
