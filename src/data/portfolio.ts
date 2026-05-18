export type SectionId = "home" | "about" | "projects" | "skills" | "resume" | "contact";

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

export interface GuideResponse {
  title: string;
  body: string;
  actions: GuideAction[];
  detailItems?: string[];
  matchedProjects?: PortfolioProject[];
  matchedSkills?: SkillGroup[];
}

export const guidePrompts: GuidePrompt[] = [
  { label: "Show ML work", query: "Show ML work", intent: "ml" },
  { label: "Mobile apps", query: "Mobile apps", intent: "mobile" },
  { label: "Best project to review", query: "Best project to review", intent: "featured" },
  { label: "Skills", query: "skills", intent: "skills" },
  { label: "Hobbies", query: "hobbies", intent: "hobbies" },
  { label: "Open resume", query: "Open resume", intent: "resume" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "FasalVaidya",
    category: "ML product",
    description:
      "Crop-health diagnosis platform that reads leaf images, supports 9 crops and 43 deficiency classes, and pairs model output with practical recommendations.",
    tags: ["ML", "React Native", "Flask", "TensorFlow"],
    url: "https://github.com/DhruvalBhinsara1/FasalVaidya",
    priority: "featured",
    domain: "ml",
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
    priority: "featured",
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

export const skillGroups: SkillGroup[] = [
  {
    title: "Analytics",
    icon: "analytics",
    summary: "Finding structure in messy data and turning it into readable decisions.",
    skills: ["Python", "SQL", "Pandas", "Excel", "Power BI", "Tableau"],
    domain: "analytics",
  },
  {
    title: "ML Engineering",
    icon: "ml",
    summary: "Learning the train, evaluate, tune, and ship cycle through hands-on notebooks and product work.",
    skills: ["Scikit-learn", "Model evaluation", "Feature engineering", "Pipelines", "TensorFlow basics"],
    domain: "ml",
  },
  {
    title: "Mobile / iOS",
    icon: "mobile",
    summary: "Building mobile-first flows and studying native Apple app development fundamentals.",
    skills: ["Swift", "SwiftUI", "React Native", "Expo", "App architecture"],
    domain: "mobile",
  },
  {
    title: "Backend & Data",
    icon: "backend",
    summary: "Connecting app experiences to APIs, databases, authentication, and persisted state.",
    skills: ["Express", "Flask", "REST APIs", "Postgres", "SQLite", "Prisma"],
    domain: "backend",
  },
  {
    title: "Tools",
    icon: "tools",
    summary: "The working stack I use to study, build, debug, and present projects.",
    skills: ["Git", "VS Code", "Jupyter", "Xcode", "TypeScript"],
    domain: "tools",
  },
];

export const portfolioHobbies = ["Reading", "Filmmaking", "Formula 1", "Indie rock"];
