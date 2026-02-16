import resumeData from "@/data/resumeData";

const siteUrl = "https://daltonneely.com";

function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resumeData.hero.name,
    jobTitle: resumeData.hero.title,
    description: resumeData.hero.summary,
    url: siteUrl,
    email: `mailto:${resumeData.contact.email}`,
    telephone: resumeData.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressRegion: resumeData.contact.location,
      addressCountry: "US",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Colorado Mesa University",
    },
    knowsAbout: resumeData.skills.flatMap((group) => group.skills),
    hasOccupation: resumeData.experience.map((entry) => ({
      "@type": "Occupation",
      name: entry.role,
      occupationLocation: { "@type": "Place", name: entry.location },
    })),
  };
}

function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "James Neely",
    url: siteUrl,
    description: resumeData.hero.summary,
  };
}

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteSchema()) }}
      />
    </>
  );
}
