import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface EarlyBackgroundProps {
  text: string;
}

export default function EarlyBackground({ text }: EarlyBackgroundProps) {
  return (
    <Card component="aside" sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
          Early Background
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
