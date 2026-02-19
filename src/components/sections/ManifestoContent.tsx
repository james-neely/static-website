import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ManifestoSection from "./ManifestoSection";
import PrinciplesList from "./PrinciplesList";

const sections = {
  paradox: {
    title: "The Security Paradox",
    paragraphs: [
      "If the goal of security is to eliminate all risk, the logical conclusion is to eliminate the system entirely. No network means no breach. No users means no phishing. No data means no leak. Perfect security is perfectly unusable.",
      "But we don't build systems to be secure. We build systems to be used. Security exists to protect that usage, to ensure that the people relying on these systems can do so with confidence. The moment security forgets this, it begins to undermine the very thing it was designed to protect.",
      "Risk is inherent to building anything of value. The question is never whether risk exists, but whether the controls we put in place are proportional to the risk and compatible with the work people need to do.",
    ],
  },
  bottleneck: {
    title: "When Security Becomes the Bottleneck",
    paragraphs: [
      "Password policies that demand 20-character strings with special characters, changed every 30 days, don't produce stronger security. They produce Post-it notes on monitors. Multi-factor authentication pushed to every minor action doesn't build a security culture. It creates MFA fatigue, where people approve prompts reflexively without reading them.",
      "Approval chains that require three managers and a committee for a firewall rule change don't reduce risk. They push people toward shadow IT, where the real work happens outside the security perimeter entirely. Locked-down development environments don't prevent vulnerabilities. They prevent developers from testing properly, which creates more vulnerabilities.",
      "Each of these failures shares a common root: the security control was designed without regard for how people actually work. The control optimized for a theoretical threat model while ignoring the practical reality that human beings will always find the path of least resistance.",
    ],
  },
  weaponized: {
    title: "Weaponized Security",
    paragraphs: [
      "There is a darker pattern: security used not as a genuine risk mitigation tool, but as a mechanism of organizational power. This is security as gatekeeping, where the ability to say \"no\" on security grounds becomes an unchallengeable veto, wielded without accountability or transparency.",
      "Compliance theater is the most visible symptom. Organizations fill out checklists, pass audits, and collect certifications while their actual security posture remains unchanged. The paperwork becomes the point, not the protection. People spend more time documenting controls than implementing them.",
      "Friction as a control mechanism is another: making processes deliberately painful to discourage usage rather than addressing the underlying risk. When it takes two weeks to provision a development database, the message isn't \"we take security seriously.\" The message is \"we don't trust you, and we'd rather you didn't build anything at all.\"",
    ],
  },
};

export default function ManifestoContent() {
  return (
    <Box>
      <Typography
        variant="h5"
        component="p"
        sx={{ mb: 4, fontStyle: "italic", lineHeight: 1.8 }}
      >
        The most secure system is one that doesn&apos;t exist. Everything after that is a
        tradeoff, and the best security is the kind people can actually live with.
      </Typography>

      <ManifestoSection {...sections.paradox} />
      <ManifestoSection {...sections.bottleneck} />
      <ManifestoSection {...sections.weaponized} />
      <PrinciplesList />

      <Typography variant="h5" component="p" sx={{ mt: 4, fontWeight: 600, lineHeight: 1.8 }}>
        Security should make people confident to build, not afraid to move. When security serves the
        people who depend on it, rather than demanding that people serve it, everyone is safer.
      </Typography>
    </Box>
  );
}
