export interface ToolEntry {
  title: string;
  href: string;
  description: string;
  cta: string;
}

const toolsData: ToolEntry[] = [
  {
    title: "Context Window Calculator",
    description:
      "Estimate tokens from pasted text and compare how much context it uses across popular AI models.",
    href: "/tools/context-window-calculator",
    cta: "Open Calculator",
  },
  {
    title: "Text Counter",
    description:
      "Count characters, words, and sentences for drafts, documentation, and pasted copy.",
    href: "/tools/text-counter",
    cta: "Open Counter",
  },
  {
    title: "Port Generator",
    description:
      "Generate random or sequential ports with presets, range filters, and a common ports reference table.",
    href: "/tools/port-generator",
    cta: "Open Generator",
  },
  {
    title: "UUID Generator",
    description:
      "Generate UUIDv7 by default, with earlier UUID versions available for compatibility.",
    href: "/tools/uuid-generator",
    cta: "Open Generator",
  },
  {
    title: "Password Generator",
    description:
      "Generate strong passwords in the browser with configurable length and character sets.",
    href: "/tools/password-generator",
    cta: "Open Generator",
  },
  {
    title: "String Generator",
    description:
      "Generate random strings for slugs, tokens, fixtures, and other test values.",
    href: "/tools/string-generator",
    cta: "Open Generator",
  },
  {
    title: "Random Name Generator",
    description:
      "Generate random first and last names for demos, examples, and test data.",
    href: "/tools/random-name-generator",
    cta: "Open Generator",
  },
  {
    title: "URL Encoder and Decoder",
    description:
      "Encode or decode URL-safe values in the browser for redirects, callbacks, and debugging.",
    href: "/tools/url-encoder-decoder",
    cta: "Open Tool",
  },
  {
    title: "File Hash Verifier",
    description:
      "Hash a file in the browser and compare it against an expected digest for verification.",
    href: "/tools/file-hash-verifier",
    cta: "Open Verifier",
  },
];

export default toolsData;
