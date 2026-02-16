import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { ProjectEntry } from "@/data/types";

export default function ProjectItem({ name, description }: ProjectEntry) {
  return (
    <Card component="article" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
