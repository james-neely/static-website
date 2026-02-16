import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import type { SkillGroup } from "@/data/types";

export default function SkillCategory({ category, skills }: SkillGroup) {
  return (
    <Card component="article" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
          {category}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} variant="outlined" color="secondary" />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
