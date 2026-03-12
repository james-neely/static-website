import type { Metadata } from "next";
import Grid from "@mui/material/Grid";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ToolCatalogJsonLd } from "@/components/common/ToolJsonLd";
import PageContainer from "@/components/common/PageContainer";
import toolsData from "@/data/toolsData";
import { buildToolMetadata } from "@/app/tools/toolSeo";

export const metadata: Metadata = buildToolMetadata({
  title: "Tools",
  description:
    "Browser-based developer and writing utilities for hashing, encoding, passwords, UUIDs, ports, text analysis, and more.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <PageContainer title="Tools">
      <ToolCatalogJsonLd />
      <Stack spacing={3}>
        <Typography variant="body1" color="text.secondary">
          A growing collection of practical browser-based tools for developers,
          writers, and AI workflows. Every tool runs locally in the browser and
          stays compatible with this site&apos;s static export setup.
        </Typography>

        <Grid container spacing={3}>
          {toolsData.map((tool) => (
            <Grid key={tool.href} size={{ xs: 12, md: 6 }}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Button
                    href={tool.href}
                    endIcon={<ArrowOutwardIcon />}
                    sx={{ mb: 1, px: 0, fontSize: "1.25rem", fontWeight: 700 }}
                  >
                    {tool.title}
                  </Button>

                  <Typography variant="body1" color="text.secondary">
                    {tool.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button href={tool.href} variant="contained">
                    {tool.cta}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </PageContainer>
  );
}
