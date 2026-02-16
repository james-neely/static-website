import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import GitHubIcon from "@mui/icons-material/GitHub";
import PageContainer from "@/components/common/PageContainer";
import ProtectedContactInfo from "@/components/sections/ProtectedContactInfo";
import { encode } from "@/utils/obfuscate";
import resumeData from "@/data/resumeData";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with James Neely - email, phone, and location.",
};

export default function ContactPage() {
  const { contact } = resumeData;

  return (
    <PageContainer title="Contact">
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 600 }}>
        Interested in working together or have a question? Reach out through any of the channels below.
      </Typography>

      <ProtectedContactInfo
        encodedEmail={encode(contact.email)}
        encodedPhone={encode(contact.phone)}
      />

      <Stack spacing={2} sx={{ maxWidth: 360, mt: 2 }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<GitHubIcon />}
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<PlaceIcon />}
          disabled
        >
          {contact.location}
        </Button>
      </Stack>
    </PageContainer>
  );
}
