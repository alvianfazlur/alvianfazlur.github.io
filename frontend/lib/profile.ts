export const profile = {
  name: "Mohamad Alvian",
  shortName: "Alvian",
  initials: "MA",
  role: "Quality Assurance Engineer",
  email: "m.alvianfazlurfd16@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohamadalvian/",
  location: "Indonesia",
  tagline:
    "I break software on purpose so it doesn't break in production.",
  summary:
    "QA engineer focused on test automation, performance, and manual testing. I build reliable test suites, hunt down regressions, and turn messy reporting into signals teams actually use.",
  tools: [
    "Playwright",
    "Apidog",
    "JMeter",
    "TypeScript",
    "Python",
  ],
  areas: [
    {
      key: "automation",
      label: "Test Automation",
      blurb: "Web UI and API test automation with Playwright and Apidog.",
      skills: [
        "Playwright",
        "TypeScript",
        "Page Object Model",
        "API Testing · Apidog",
      ],
    },
    {
      key: "performance",
      label: "Performance Testing",
      blurb: "Load and stress testing with JMeter.",
      skills: ["JMeter"],
    },
    {
      key: "manual",
      label: "Manual QA",
      blurb: "Smoke and regression testing across releases.",
      skills: ["Smoke Testing", "Regression Testing", "Exploratory", "Bug Triage"],
    },
  ],
  projects: [
    {
      category: "qa",
      title: "XL Smart Invoice Coupa",
      workplace: "PT Javan Cipta Solusi",
      label: "manual",
      stack: ["Jam.dev", "ActiveCollab", "QA Tools · Test Case Creation & Bug Tracking"],
    },
    {
      category: "qa",
      title: "XL Smart LMS - BAK Adjustment",
      workplace: "PT Javan Cipta Solusi",
      label: "both",
      stack: [
        "Jam.dev",
        "ActiveCollab",
        "QA Tools · Test Case Creation & Bug Tracking",
        "Playwright + TypeScript",
      ],
    },
    {
      category: "qa",
      title: "Telkom E-Auction",
      workplace: "PT Javan Cipta Solusi",
      label: "both",
      stack: [
        "Jam.dev",
        "ActiveCollab",
        "QA Tools · Test Case Creation & Bug Tracking",
        "Playwright + TypeScript",
      ],
    },
    {
      category: "qa",
      title: "Linknet ABD Ring BB",
      workplace: "PT Javan Cipta Solusi",
      label: "manual",
      stack: ["Jam.dev", "ActiveCollab", "QA Tools · Test Case Creation & Bug Tracking"],
    },
    {
      category: "qa",
      title: "XL Smart Budget",
      workplace: "PT Javan Cipta Solusi",
      label: "manual",
      stack: [
        "Jam.dev",
        "ActiveCollab",
        "QA Tools · Test Case Creation & Bug Tracking",
        "User Guide Creation",
      ],
    },
    {
      category: "qa",
      title: "AluKerja Pancaran",
      workplace: "PT Javan Cipta Solusi",
      label: "manual",
      stack: [
        "Jam.dev",
        "ActiveCollab",
        "QA Tools · Test Case Creation & Bug Tracking",
        "Smoke Testing",
      ],
    },
    {
      category: "qa",
      title: "Yong Ma-CR Mobile Apps",
      workplace: "PT Javan Cipta Solusi",
      label: "manual",
      stack: [
        "Jam.dev",
        "ActiveCollab",
        "QA Tools · Test Case Creation & Bug Tracking",
        "Web Testing",
        "Mobile Testing",
      ],
    },
    {
      category: "qa",
      title: "XL Smart LMS - Migrate Server Tencent",
      workplace: "PT Javan Cipta Solusi",
      label: "performance",
      stack: [
        "Jam.dev",
        "ActiveCollab",
        "QA Tools · Test Case Creation & Bug Tracking",
        "Performance Testing · JMeter",
      ],
    },
    {
      category: "software-engineer",
      title: "Shavina Kost",
      workplace: "Freelance",
      label: "development",
      status: "In Progress",
      stack: ["Web Apps", "React", "Python", "Vibe Coding"],
    },
    {
      category: "software-engineer",
      title: "Bengkel Las Jember",
      workplace: "Freelance",
      label: "development",
      stack: ["Laravel", "MySQL"],
    },
    {
      category: "software-engineer",
      title: "SmartTaniBot",
      workplace: "Academic Project",
      label: "development",
      stack: ["Python", "LangChain", "OpenAI (LLM)"],
    },
    {
      category: "software-engineer",
      title: "Keuanganku",
      workplace: "Freelance",
      label: "development",
      stack: ["Mobile Apps", "Python (Kivy)", "SQLite", "Vibe Coding"],
    },
    {
      category: "software-engineer",
      title: "Punggawa Travel",
      workplace: "Punggawa Studio",
      label: "development",
      stack: ["Laravel", "Flutter", "Midtrans"],
    },
  ] as Project[],
  experience: [
    {
      role: "Software Quality Control",
      company: "PT Javan Cipta Solusi",
      period: "Oct 2025 – Present",
      points: [
        "Converted 70%–100% of manual test cases into automated scripts using Playwright with TypeScript, improving test efficiency, consistency, and execution speed across regression cycles.",
        "Conducted comprehensive software testing across multiple projects, ensuring alignment with established quality standards.",
        "Prepared daily validation reports highlighting key findings, issues, and progress in application feature testing.",
        "Collaborated with the Technical Writer to create accurate Functional User Guides, enhancing user experience.",
        "Executed Manual, Regression, and Automated Testing using Playwright + TypeScript, ensuring successful User Acceptance Testing (UAT).",
        "Conducted penetration testing to identify and document security vulnerabilities, providing actionable recommendations to improve system security and reduce potential risks.",
        "Performed performance testing using Apache JMeter to evaluate system scalability, response time, and stability under various load conditions, identifying bottlenecks for optimization.",
      ],
    },
    {
      role: "Software Quality Control",
      company: "Sekawan Media · Internship",
      period: "Sep 2024 – Mar 2025",
      points: [
        "Conducted comprehensive software testing to enhance product quality for clients including SIPAS, Krakatau Steel, PT. Timah, and MIND ID.",
        "Prepared daily reports documenting critical aspects of the application feature validation process.",
        "Collaborated with the Project Admin to create a Manual Book and Application Flow, ensuring clarity and usability.",
        "Successfully executed Manual and Regression Testing, leading to all features passing User Acceptance Testing (UAT).",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Punggawa Studio · Internship",
      period: "Jan 2024 – Jun 2024",
      points: [
        "Developed Punggawa Travel.",
        "Built the frontend for Loviotech.",
        "Developed a company profile website.",
      ],
    },
  ] as Experience[],
};

export type Project = {
  title: string;
  category: "qa" | "software-engineer";
  workplace: string;
  label: "manual" | "automation" | "both" | "performance" | "development";
  status?: string;
  stack: string[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  points: string[];
};