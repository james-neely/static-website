import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "@/theme/theme";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/common/JsonLd";
import RegisterSW from "@/components/common/RegisterSW";
import "./globals.css";

const siteUrl = "https://daltonneely.com";

export const metadata: Metadata = {
  title: {
    template: "%s | James Neely",
    default: "James Neely - AI Solutions Architect & Full Stack Engineer",
  },
  description:
    "Personal resume site for James Neely - an AI solutions architect and full stack engineer specializing in AI interaction design, iOS/IoT development, DevSecOps, and information security.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "James Neely - AI Solutions Architect & Full Stack Engineer",
    description:
      "Personal resume site for James Neely - an AI solutions architect and full stack engineer specializing in AI interaction design, iOS/IoT development, DevSecOps, and information security.",
    type: "website",
    locale: "en_US",
    siteName: "James Neely",
  },
  twitter: {
    card: "summary",
    title: "James Neely - AI Solutions Architect & Full Stack Engineer",
    description:
      "Personal resume site for James Neely - an AI solutions architect and full stack engineer specializing in AI interaction design, iOS/IoT development, DevSecOps, and information security.",
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "James Neely",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#b8860b" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1c1e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Header />
              {children}
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <RegisterSW />
      </body>
    </html>
  );
}
