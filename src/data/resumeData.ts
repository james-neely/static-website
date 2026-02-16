import { ResumeData } from "./types";

const resumeData: ResumeData = {
  hero: {
    name: "James Neely",
    title:
      "Lead AI Solutions Architect, AI Interaction Specialist, Full Stack/iOS/IoT Engineer, DevSecOps Architect, InfoSec Specialist",
    summary:
      "Accomplished Lead Software Architect with 15+ years in designing scalable systems for enterprise environments, leading cross-functional teams to deliver projects that increased operational efficiency by 40%. Expertise in cloud architecture and AI integration, driving revenue growth through innovative solutions while mentoring engineers toward high-performance outcomes.",
  },

  experience: [
    {
      role: "Lead Software Architect",
      company: "Novogradac & Company LLP",
      location: "Remote",
      startDate: "Jan 2025",
      endDate: "Feb 2026",
      highlights: [
        "Owned end-to-end architecture for enterprise platforms, integrating AI-augmented workflows to accelerate development and improve system stability.",
        "Led senior-level design decisions for web and iOS applications serving high-stakes financial clients.",
      ],
    },
    {
      role: "Senior Software Engineer",
      company: "Novogradac & Company LLP",
      location: "Remote",
      startDate: "Nov 2022",
      endDate: "Jan 2025",
      highlights: [
        "Designed and implemented scalable solutions with modern full-stack and mobile architectures.",
        "Collaborated on cross-functional initiatives to deliver secure, high-performance systems.",
      ],
    },
    {
      role: "Senior Software Engineer (Project Lead)",
      company: "Meta",
      location: "Remote",
      startDate: "Apr 2021",
      endDate: "Oct 2022",
      highlights: [
        "Led Condition Based Maintenance (CBM) program from pilot to production; collaborated with stakeholders to define requirements and meet SLAs.",
        "Built scalable framework that reduced per-project coding time and improved test coverage/system stability.",
        "Enhanced front-end UX using React (Hooks, Redux, Relay), Flow.js, and design systems; created reusable components and custom hooks.",
      ],
    },
    {
      role: "Senior Software Engineer",
      company: "Charles Schwab",
      location: "Remote",
      startDate: "Sep 2019",
      endDate: "Apr 2021",
      highlights: [
        "Led effort to reduce monolith build/setup time from 20 minutes to 2 minutes, enabling transition to reactive PaaS via legacy strangulation.",
        "Designed homegrown service-level testing plugin for CI/CD; saved developers 15 minutes per build cycle and correlated telemetry for faster debugging.",
        "Led React.js UI redesign (Hooks, Redux, TypeScript); served as React subject-matter expert for senior engineers.",
        "Reverse-engineered undocumented systems to reconstruct business rules; mentored team and halved onboarding time.",
      ],
    },
    {
      role: "Staff Software Engineer",
      company: "Charles Schwab",
      location: "CO",
      startDate: "Jan 2019",
      endDate: "Aug 2019",
      highlights: [
        "Developed and optimized enterprise financial platforms; collaborated on workflow improvements for business partners.",
      ],
    },
  ],

  education: [
    {
      institution: "Colorado Mesa University",
      credential: "B.S. Computer Science",
      graduationDate: "May 2018",
    },
    {
      institution: "Colorado Mesa University",
      credential: "Minor Cyber Security",
      graduationDate: "December 2017",
    },
    {
      institution: "Upsilon Pi Epsilon",
      credential: "Honor Society Member",
      graduationDate: "May 2017",
    },
  ],

  skills: [
    {
      category: "Technical",
      skills: [
        "Software Architecture",
        "Cloud Platforms (AWS, Azure)",
        "AI/ML Integration",
        "DevSecOps Tools (Kubernetes, Terraform)",
        "Python",
        "Java",
        "TypeScript",
        "Microservices Design",
        "Security Protocols",
        "Agentic Coding & Workflows",
        "OTA Rollouts",
        "SRE Principles",
      ],
    },
    {
      category: "Leadership & Soft Skills",
      skills: [
        "Team Mentoring",
        "Strategic Planning",
        "Cross-Functional Collaboration",
        "Process Optimization",
        "Agile/Scrum Leadership",
        "Stakeholder Communication",
        "Adaptability to Emerging Technologies",
      ],
    },
    {
      category: "Business Acumen",
      skills: [
        "Revenue Impact Analysis",
        "Technical Documentation",
        "Industry Best Practices",
        "Risk Management",
      ],
    },
  ],

  projects: [
    {
      name: "Enterprise Application Manager",
      description:
        "An application aimed to help organizations manage large amounts of custom applications.",
    },
  ],

  contact: {
    location: "Hawaii",
    phone: "+1-970-208-2235",
    email: "fruit-bedpost-0h@icloud.com",
    github: "https://github.com/james-neely",
  },
};

export default resumeData;
