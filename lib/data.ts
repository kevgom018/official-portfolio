// Single source of truth for all site content.
// Everything here is sourced from the resume (public/resume.pdf) — keep it that way.

export const profile = {
  name: "Kevin J. Gómez Guzmán",
  shortName: "Kevin Gómez",
  role: "Software engineering student",
  school: "University of Puerto Rico, Mayagüez",
  location: "Mayagüez, Puerto Rico",
  coordinates: "18.2011° N, 67.1391° W",
  email: "kevin.gomez6@upr.edu",
  github: "https://github.com/kevgom018",
  linkedin: "https://www.linkedin.com/in/kevin-g%C3%B3mez-31222b1a7",
  thesis: "I build things that drive themselves.",
  intro:
    "Software engineering student at UPR Mayagüez crafting autonomous robots, agentic AI systems, and full-stack products — with a national robotics title to show for it.",
};

export const about = {
  paragraphs: [
    "My favorite moment in engineering is letting go: the instant a robot, an agent, or a script takes over and executes on its own. I've chased that moment across autonomous robotics, machine learning, and full-stack development — from motion-profiled drivetrains to RAG pipelines to apps people use every day.",
    "As co-captain and software lead of AON Robotics, I led a 20-person team to a national championship. As an AI/ML intern, I built evaluation frameworks for agentic systems. In between, I ship web and mobile products for real clients and keep a 4.00 in my major. I'm looking for an internship where precision and curiosity are the job description.",
  ],
  education: {
    degree: "B.S. Software Engineering",
    school: "University of Puerto Rico, Mayagüez",
    period: "Aug 2023 — Dec 2027 (expected)",
    gpa: "3.92 cumulative · 4.00 major",
    memberships: [
      "IEEE Computer Society",
      "Cypher++ competitive programming team",
      "CAHSI — Computing Alliance of HSIs",
      "National Society of Leadership & Success",
    ],
  },
};

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 4, decimals: 2, label: "major GPA at UPR Mayagüez" },
  { value: 11, suffix: "/12", label: "autonomous wins — 2026 national title" },
  { value: 20, label: "engineers led as robotics co-captain" },
  { value: 90, prefix: "~", suffix: "%", label: "navigation error cut with LiDAR + vision" },
];

export type Mission = {
  org: string;
  role: string;
  period: string;
  location: string;
  status: "active" | "complete";
  bullets: string[];
  tags: string[];
};

export const missions: Mission[] = [
  {
    org: "AON Robotics",
    role: "Co-captain · Software lead",
    period: "Jan 2024 — present",
    location: "Mayagüez, PR",
    status: "active",
    bullets: [
      "Led a 20-person team through two full robot builds to a National Champions Award and an Excellence Award.",
      "Designed the motion-profiling algorithm behind smooth, swift autonomous navigation.",
      "Fused GPS into the drivetrain for ~20% more successful navigations to objectives; added LiDAR and computer vision to cut objective error by ~90%.",
      "Implemented PID control for autonomous navigation, arm movement, and competition-specific tasks.",
    ],
    tags: ["C/C++", "Motion profiling", "PID", "LiDAR", "Computer vision"],
  },
  {
    org: "FT Innovations",
    role: "Mobile app developer",
    period: "Aug 2025 — present",
    location: "Mayagüez, PR",
    status: "active",
    bullets: [
      "Building mobile apps across diverse industries, including a tutoring feature for the MiUni app.",
      "Shipped an iOS + Android app that connects users with freelancers, built on Flutter, Firebase, and the Gemini API.",
    ],
    tags: ["Flutter", "Dart", "Firebase", "Gemini API"],
  },
  {
    org: "Persistent Technology",
    role: "AI / ML intern",
    period: "Jun 2025 — Jul 2025",
    location: "Virginia, USA",
    status: "complete",
    bullets: [
      "Collaborated on an agentic system performing retrieval-augmented generation, built on Microsoft Autogen.",
      "Led development of the evaluation framework for the NLP RAG system using DeepEval, Azure OpenAI, Ollama, and vLLM.",
    ],
    tags: ["Autogen", "DeepEval", "Azure OpenAI", "vLLM", "RAG"],
  },
  {
    org: "UPRM Asuntos Académicos",
    role: "Full-stack developer",
    period: "Jan 2025 — Jun 2025",
    location: "Mayagüez, PR",
    status: "complete",
    bullets: [
      "Built a web app for police reports and on-campus security, and another for students and professors to find course syllabi.",
      "Maintained and updated 7 websites across campus offices, from Enrollment to Graduate Studies.",
    ],
    tags: ["PHP", "Laravel", "MySQL", "WordPress"],
  },
  {
    org: "ProtheX Innovations",
    role: "Junior programmer · Undergraduate research",
    period: "Sep 2024 — May 2025",
    location: "Mayagüez, PR",
    status: "complete",
    bullets: [
      "Trained a linear-regression model to read human EMG signals and identify hand gestures.",
      "Deployed it on a Raspberry Pi with Google's LiteRT to drive a working prosthetic arm.",
    ],
    tags: ["Python", "LiteRT", "Raspberry Pi", "EMG"],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  role: string;
  status: "in development" | "deployed" | "champion";
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Blue Drop",
    tagline: "An agenda that organizes itself",
    description:
      "A service that builds a student's agenda automatically, ranking work by complexity and due date. A Selenium driver reads email and Moodle to extract homework, tests, and meetings — no manual entry, ever.",
    role: "Creator · Lead developer",
    status: "in development",
    tags: ["Python", "Selenium", "AI"],
    featured: true,
  },
  {
    name: "Freelancer marketplace",
    tagline: "Clients and freelancers, connected",
    description:
      "An iOS + Android app matching users with freelancers, with AI features powered by the Gemini API.",
    role: "Mobile developer, FT Innovations",
    status: "deployed",
    tags: ["Flutter", "Firebase", "Gemini API"],
  },
  {
    name: "Championship autonomy stack",
    tagline: "The software that won nationals",
    description:
      "Motion profiling, PID control, GPS fusion, and a LiDAR + vision pipeline — the autonomy system behind 11 of 12 autonomous wins at the VEX U Puerto Rico National Championship.",
    role: "Software lead, AON Robotics",
    status: "champion",
    tags: ["C/C++", "LiDAR", "Computer vision", "PID"],
    featured: true,
  },
  {
    name: "EMG prosthetic hand",
    tagline: "Muscle signals to motion",
    description:
      "Machine learning on EMG signals lets a prosthetic arm mirror human hand gestures, running fully on a Raspberry Pi.",
    role: "Junior programmer, ProtheX",
    status: "deployed",
    tags: ["Python", "LiteRT", "Raspberry Pi"],
  },
  {
    name: "Campus safety platform",
    tagline: "Security reports for UPRM",
    description:
      "A web app for police reports and on-campus security, serving the Mayagüez campus community.",
    role: "Full-stack developer, UPRM",
    status: "deployed",
    tags: ["PHP", "MySQL", "Web"],
  },
  {
    name: "Syllabus finder",
    tagline: "Every course syllabus, findable",
    description:
      "A search tool where students and professors find course syllabi across departments.",
    role: "Full-stack developer, UPRM",
    status: "deployed",
    tags: ["PHP", "MySQL", "Web"],
  },
];

export const systems = [
  {
    id: "sys.01",
    title: "Autonomy & robotics",
    items: [
      "Motion profiling",
      "PID control",
      "LiDAR",
      "Computer vision",
      "GPS navigation",
      "Raspberry Pi",
    ],
  },
  {
    id: "sys.02",
    title: "AI / machine learning",
    items: [
      "Autogen",
      "RAG systems",
      "DeepEval",
      "Azure OpenAI",
      "Ollama",
      "vLLM",
      "LiteRT",
      "Open WebUI",
    ],
  },
  {
    id: "sys.03",
    title: "Languages",
    items: ["C/C++", "Python", "Java", "Dart", "PHP", "JavaScript"],
  },
  {
    id: "sys.04",
    title: "Web & mobile",
    items: [
      "Flutter",
      "Laravel",
      "MySQL",
      "Firebase",
      "WordPress",
      "HTML & CSS",
      "Selenium",
      "Git & GitHub",
    ],
  },
  {
    id: "sys.05",
    title: "Leadership & communication",
    items: [
      "Team leadership",
      "Public speaking",
      "Conflict resolution",
      "Teamwork",
    ],
  },
];

export const awards = [
  {
    place: "1st",
    field: "of 4 teams",
    title: "VEX U National Championship, Puerto Rico",
    date: "Jan 2026",
    detail: "11 of 12 autonomous wins",
  },
  {
    place: "2nd",
    field: "of 6 teams",
    title: "VEX U National Championship, Puerto Rico",
    date: "Feb 2025",
    detail: "6 of 9 autonomous wins",
  },
  {
    place: "1st",
    field: "of 8 teams",
    title: "ICPC Caribbean Regionals",
    date: "Nov 2024",
    detail: "competitive programming",
  },
  {
    place: "2nd",
    field: "of 100",
    title: "Calculus competition, UPR Mayagüez",
    date: "Mar 2024",
    detail: "mathematics",
  },
];

export const waypoints = [
  { id: "about", index: "01", label: "About" },
  { id: "missions", index: "02", label: "Missions" },
  { id: "projects", index: "03", label: "Projects" },
  { id: "systems", index: "04", label: "Systems" },
  { id: "contact", index: "05", label: "Contact" },
] as const;
