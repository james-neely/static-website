import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface ManifestoSectionProps {
  title: string;
  paragraphs: string[];
}

export default function ManifestoSection({ title, paragraphs }: ManifestoSectionProps) {
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
          {title}
        </Typography>
        {paragraphs.map((text, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{ mb: index < paragraphs.length - 1 ? 2 : 0, lineHeight: 1.8 }}
          >
            {text}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
