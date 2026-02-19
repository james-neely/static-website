import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

const principles = [
  {
    title: "Proportional to actual risk",
    description:
      "Not every system needs the same controls. A public marketing page and a financial trading platform have fundamentally different threat models. Treat them differently.",
  },
  {
    title: "Designed with the user, not against them",
    description:
      "If a security control is routinely bypassed, the control has failed, not the user. Study how people actually work and build security that fits their workflow.",
  },
  {
    title: "Transparent in its reasoning",
    description:
      'Every security requirement should have a clear "because." If you can\'t articulate the specific risk a control mitigates, question whether the control is necessary.',
  },
  {
    title: "Measured by outcomes, not checkbox compliance",
    description:
      "A hundred completed compliance checklists mean nothing if a single unpatched vulnerability leads to a breach. Focus on what actually reduces risk.",
  },
  {
    title: "Enables rather than obstructs",
    description:
      "The goal of security is to allow people to build and operate systems with confidence. If security is the reason people can't get their work done, it has failed at its job.",
  },
];

export default function PrinciplesList() {
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
          Principles of Useable Security
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          There is an alternative. Security that actually works looks different from security that
          merely performs authority. It follows a set of principles:
        </Typography>
        {principles.map((principle, index) => (
          <Box key={index} sx={{ mb: index < principles.length - 1 ? 3 : 0 }}>
            <Typography variant="h6" component="h3" fontWeight={600}>
              {index + 1}. {principle.title}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              {principle.description}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
