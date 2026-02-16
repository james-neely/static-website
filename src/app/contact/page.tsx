import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import PageContainer from "@/components/common/PageContainer";
import resumeData from "@/data/resumeData";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with James Neely — email, phone, and location.",
};

export default function ContactPage() {
  const { contact } = resumeData;

  return (
    <PageContainer title="Contact">
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 600 }}>
        Interested in working together or have a question? Reach out through any of the channels below.
      </Typography>

      <Stack spacing={2} sx={{ maxWidth: 360 }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<EmailIcon />}
          href={`mailto:${contact.email}`}
        >
          {contact.email}
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<PhoneIcon />}
          href={`tel:${contact.phone}`}
        >
          {contact.phone}
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
