import toolsData from "@/data/toolsData";

const siteUrl = "https://daltonneely.com";

interface ToolPageJsonLdProps {
  title: string;
  description: string;
  path: string;
}

export function ToolCatalogJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "James Neely Tools",
    description: "Browser-based utility tools for text, identifiers, ports, hashing, and encoding.",
    url: `${siteUrl}/tools`,
    numberOfItems: toolsData.length,
    itemListElement: toolsData.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      description: tool.description,
      url: `${siteUrl}${tool.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ToolPageJsonLd({ title, description, path }: ToolPageJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript and a modern browser",
    url: `${siteUrl}${path}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
