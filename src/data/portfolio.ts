export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "resume"
  | "contact";

export interface GuidePrompt {
  label: string;
  query: string;
  intent: "ml" | "mobile" | "featured" | "skills" | "hobbies" | "resume";
}

export interface GuideAction {
  label: string;
  kind: "section" | "external";
  target: SectionId | string;
}

export interface PortfolioProject {
  title: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
  priority: "featured" | "foundation";
  domain: "ml" | "mobile" | "analytics" | "learning";
}

export interface SkillGroup {
  title: string;
  icon: "analytics" | "ml" | "mobile" | "backend" | "tools";
  summary: string;
  skills: string[];
  domain: "analytics" | "ml" | "mobile" | "backend" | "tools";
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  employment: string;
  period: string;
  points: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  location: string;
  period: string;
  detail: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface GuideResponse {
  title: string;
  body: string;
  actions: GuideAction[];
  detailItems?: string[];
  matchedProjects?: PortfolioProject[];
  matchedSkills?: SkillGroup[];
}

export const guidePrompts: GuidePrompt[] = [
  { label: "Show ML & AI work", query: "Show ML and AI work", intent: "ml" },
  { label: "iOS & mobile", query: "iOS and mobile apps", intent: "mobile" },
  { label: "Best project to review", query: "Best project to review", intent: "featured" },
  { label: "Skills", query: "skills", intent: "skills" },
  { label: "Hobbies", query: "hobbies", intent: "hobbies" },
  { label: "Open resume", query: "Open resume", intent: "resume" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Predicting EV Charging Loads",
    category: "Deep learning",
    description:
      "PyTorch feedforward neural network predicting EV charging demand from 6,833 real-world Norwegian charging sessions. Engineered 26 features by merging charging logs with hourly traffic data and cut test error 5.5% over a linear-regression baseline.",
    tags: ["PyTorch", "Neural Networks", "Pandas", "Scikit-learn"],
    url: "https://github.com/DhruvalBhinsara1/ev-charging-load-prediction",
    priority: "featured",
    domain: "ml",
  },
  {
    title: "FasalVaidya",
    category: "AI product",
    description:
      "AI crop-health app that reads leaf images to detect NPK nutrient deficiencies, supports 9 crops and 43 deficiency classes, and pairs model output with practical recommendations.",
    tags: ["React Native", "Expo", "Flask", "Machine Learning"],
    url: "https://github.com/DhruvalBhinsara1/FasalVaidya",
    priority: "featured",
    domain: "ml",
  },
  {
    title: "NexaBrew",
    category: "Full-stack · Hackathon",
    description:
      "Full-stack web app built and deployed during a hackathon with React and TypeScript, integrating external APIs with a focus on a responsive user experience.",
    tags: ["React", "TypeScript", "Full Stack", "REST APIs"],
    url: "https://github.com/DhruvalBhinsara1/nexabrew",
    priority: "featured",
    domain: "mobile",
  },
  {
    title: "Traveloop",
    category: "Mobile app",
    description:
      "Mobile-first travel planner with multi-city trips, itinerary scheduling, collaborative budgets, public sharing, friend groups, and a Postgres-backed API.",
    tags: ["React Native", "TypeScript", "Express", "Postgres"],
    url: "https://github.com/DhruvalBhinsara1/traveloop",
    priority: "featured",
    domain: "mobile",
  },
  {
    title: "Machine Learning Journey",
    category: "Learning system",
    description:
      "Structured ML study repo covering preprocessing, regression, classification, clustering, PCA, pipelines, cross-validation, metrics, and model persistence.",
    tags: ["Python", "Scikit-learn", "Jupyter", "ML"],
    url: "https://github.com/DhruvalBhinsara1/machine-learning-journey",
    priority: "foundation",
    domain: "learning",
  },
  {
    title: "E-commerce Funnel Analysis",
    category: "Analytics case study",
    description:
      "Customer journey analysis across a large e-commerce funnel, using SQL and Python to study conversion, cart behavior, and drop-off points.",
    tags: ["Python", "SQL", "Pandas", "Analytics"],
    url: "https://github.com/DhruvalBhinsara1/E-commerce-Funnel-Analysis",
    priority: "foundation",
    domain: "analytics",
  },
  {
    title: "Influencer & Platform Data Analysis",
    category: "Analytics case study",
    description:
      "Exploratory analysis of influencer marketing data, focused on engagement, revenue movement, outliers, and budget insights.",
    tags: ["Python", "Pandas", "Seaborn", "EDA"],
    url: "https://github.com/DhruvalBhinsara1/Influencer-and-Platform-Data-Analysis",
    priority: "foundation",
    domain: "analytics",
  },
  {
    title: "Power BI Dashboards",
    category: "Dashboard work",
    description:
      "Business intelligence dashboards focused on data modeling, DAX measures, and clear visual reporting.",
    tags: ["Power BI", "DAX", "Reporting"],
    url: "https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Power%20BI%20Project",
    priority: "foundation",
    domain: "analytics",
  },
  {
    title: "SQL Data Analysis",
    category: "Data querying",
    description:
      "SQL analysis practice using joins, CTEs, window functions, and structured reporting queries.",
    tags: ["SQL", "CTEs", "Window Functions"],
    url: "https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/SQL%20Projects",
    priority: "foundation",
    domain: "analytics",
  },
  {
    title: "Python Automation",
    category: "Python practice",
    description:
      "Python scripts for data cleaning, web scraping, and workflow automation with practical data tasks.",
    tags: ["Python", "Automation", "Scraping"],
    url: "https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Python%20Project",
    priority: "foundation",
    domain: "analytics",
  },
  {
    title: "Excel Analytics",
    category: "Spreadsheet analysis",
    description:
      "Excel analytics work with pivot tables, lookup formulas, structured summaries, and business reporting basics.",
    tags: ["Excel", "Pivot Tables", "Reporting"],
    url: "https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/EXCEL%20Project",
    priority: "foundation",
    domain: "analytics",
  },
  {
    title: "Tableau Visualizations",
    category: "Dashboard work",
    description:
      "Tableau dashboards for data exploration, business intelligence, and visual storytelling practice.",
    tags: ["Tableau", "Dashboards", "Visualization"],
    url: "https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Tableau%20Project",
    priority: "foundation",
    domain: "analytics",
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    role: "Freelance iOS Developer",
    company: "Covert Defenses",
    location: "USA · Remote",
    employment: "Contract · Part-Time",
    period: "May 2026 – Present",
    points: [
      "Develop and maintain iOS application features using SwiftUI and Xcode in a remote contract environment.",
      "Collaborate on secure mobile workflows and feature delivery while adhering to NDA requirements.",
      "Manage source control and collaborative development using Git and GitHub.",
    ],
  },
];

export const educationItems: EducationItem[] = [
  {
    school: "Parul University",
    degree: "B.Tech in Computer Science and Engineering",
    location: "Vadodara, Gujarat",
    period: "2024 – 2028",
    detail:
      "CGPA 7.82. Coursework: Data Structures & Algorithms, DBMS, Object-Oriented Programming, Machine Learning Fundamentals.",
  },
];

export const certifications: Certification[] = [
  { title: "Intro to PyTorch and Neural Networks", issuer: "Codecademy", date: "Jun 2026" },
  { title: "Intro to OpenAI API", issuer: "Codecademy", date: "Jun 2026" },
  { title: "Intro to Large Language Models (LLMs)", issuer: "Codecademy", date: "Jun 2026" },
  { title: "Python for Data Science", issuer: "IBM", date: "Dec 2025" },
  { title: "Statistics 101", issuer: "IBM", date: "Mar 2026" },
  { title: "Java Foundations Certified Junior Associate", issuer: "Oracle", date: "Dec 2025" },
  { title: "JavaScript Fundamentals", issuer: "Certification", date: "Apr 2025" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "ML & AI",
    icon: "ml",
    summary: "Training, evaluating, and shipping models — plus working with LLMs and the OpenAI API.",
    skills: ["PyTorch", "Scikit-learn", "Neural Networks", "Feature Engineering", "LLMs", "OpenAI API"],
    domain: "ml",
  },
  {
    title: "Mobile & iOS",
    icon: "mobile",
    summary: "Building native and cross-platform mobile experiences with SwiftUI and React Native.",
    skills: ["Swift", "SwiftUI", "Xcode", "iOS Development", "React Native", "Expo"],
    domain: "mobile",
  },
  {
    title: "Analytics & Data",
    icon: "analytics",
    summary: "Finding structure in messy data and turning it into readable decisions.",
    skills: ["Python", "SQL", "Pandas", "NumPy", "Data Analysis", "Power BI", "Tableau", "Excel"],
    domain: "analytics",
  },
  {
    title: "Backend & Web",
    icon: "backend",
    summary: "Connecting app experiences to APIs, databases, and persisted state.",
    skills: ["Flask", "Express", "REST APIs", "Postgres", "HTML", "CSS", "JavaScript"],
    domain: "backend",
  },
  {
    title: "Languages & Tools",
    icon: "tools",
    summary: "The core languages and working stack I use to build, debug, and ship projects.",
    skills: ["Java", "TypeScript", "Git", "GitHub", "Jupyter", "VS Code"],
    domain: "tools",
  },
];

export const portfolioHobbies = ["Reading", "Filmmaking", "Formula 1", "Indie rock"];

export interface MusicPlaylist {
  /** Display name shown above the embed. */
  title: string;
  /** Public Apple Music playlist link (music.apple.com/...). */
  appleMusicUrl: string;
}

// Apple Music playlists embedded on the site. Paste the public share link of
// any playlist (Apple Music -> playlist -> Share -> Copy Link). Add or remove
// entries freely; an empty array hides the section.
export const musicPlaylists: MusicPlaylist[] = [
  {
    title: "Indie Mix",
    appleMusicUrl: "https://music.apple.com/in/playlist/indie-mix/pl.u-AkAm8EeCx8l6ddd",
  },
  {
    title: "Male Baddie",
    appleMusicUrl: "https://music.apple.com/in/playlist/male-baddie/pl.u-ZmblVL1IVrpA666",
  },
];
