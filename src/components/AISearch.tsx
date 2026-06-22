import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, FileText, Mail, Search, X } from "lucide-react";
import { guidePrompts, portfolioHobbies, portfolioProjects, skillGroups } from "@/data/portfolio";
import type { GuideAction, GuideResponse, PortfolioProject } from "@/data/portfolio";

const defaultResponse: GuideResponse = {
  title: "Start with a path",
  body: "Search the portfolio by project type, skill area, hobbies, resume, or contact. The guide will point you to the strongest section or project.",
  actions: [
    { label: "Projects", kind: "section", target: "projects" },
    { label: "Skills", kind: "section", target: "skills" },
    { label: "Resume", kind: "section", target: "resume" },
  ],
  matchedProjects: portfolioProjects.filter((project) => project.priority === "featured"),
};

const guidePatterns = {
  skills: [
    /\bskills?\b/i,
    /\bskill\s*set\b/i,
    /\btechnical\s+skills?\b/i,
    /\btech\s+stack\b/i,
    /\btool(?:s|ing)?\b/i,
    /\bcapabilit(?:y|ies)\b/i,
    /\bwhat\s+(?:can|do(?:es)?)\s+(?:you|he|dhruval).*(?:use|know|build)\b/i,
  ],
  hobbies: [
    /\bhobb(?:y|ies)\b/i,
    /\binterests?\b/i,
    /\boutside\s+(?:of\s+)?(?:code|coding|work)\b/i,
    /\bfree\s*time\b/i,
    /\bafter\s+hours\b/i,
    /\bpersonal\s+side\b/i,
  ],
};

function normalizeQuery(query: string) {
  return query.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function hasAny(query: string, terms: string[]) {
  return terms.some((term) => query.includes(term));
}

function matchesAnyPattern(query: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(query));
}

function sectionAction(label: string, target: GuideAction["target"]): GuideAction {
  return { label, kind: "section", target };
}

function projectMatches(project: PortfolioProject, query: string) {
  const haystack = [
    project.title,
    project.category,
    project.description,
    project.domain,
    ...project.tags,
  ].join(" ").toLowerCase();

  return query.split(" ").some((token) => token.length > 2 && haystack.includes(token));
}

function getGuideResponse(rawQuery: string): GuideResponse {
  const query = normalizeQuery(rawQuery);

  if (!query) {
    return defaultResponse;
  }

  if (hasAny(query, ["resume", "cv", "download", "profile"])) {
    return {
      title: "Resume",
      body: "The resume section has the latest PDF viewer and download link. It is the quickest way to scan education, skills, and recent direction.",
      actions: [
        sectionAction("Open resume", "resume"),
        { label: "Download PDF", kind: "external", target: "/assets/Dhruval_Bhinsara_Resume.pdf" },
      ],
    };
  }

  if (hasAny(query, ["contact", "email", "connect", "message", "reach"])) {
    return {
      title: "Contact",
      body: "Use the contact form for project ideas, collaboration, feedback, or a direct hello.",
      actions: [
        sectionAction("Open contact form", "contact"),
        { label: "Email directly", kind: "external", target: "mailto:dhruvalbhinsara460@gmail.com" },
      ],
    };
  }

  if (matchesAnyPattern(query, guidePatterns.hobbies)) {
    return {
      title: "Hobbies and interests",
      body: "Outside code, Dhruval spends time reading, filmmaking, following Formula 1, and listening to indie rock. It gives the portfolio a little more of the person behind the project work.",
      actions: [sectionAction("Read about Dhruval", "about"), sectionAction("Contact", "contact")],
      detailItems: portfolioHobbies,
    };
  }

  if (hasAny(query, ["ml", "machine", "model", "scikit", "pytorch", "neural", "ai", "llm", "openai", "fasal", "crop", "ev", "charging"])) {
    const matches = portfolioProjects.filter((project) =>
      ["ml", "learning"].includes(project.domain)
    );
    return {
      title: "ML & AI work",
      body: "Predicting EV Charging Loads is the deepest deep-learning piece (PyTorch neural network). FasalVaidya shows AI shipped as a product, and Machine Learning Journey is the study trail behind the fundamentals.",
      actions: [sectionAction("Open projects", "projects"), sectionAction("See skills", "skills")],
      matchedProjects: matches,
    };
  }

  if (hasAny(query, ["mobile", "ios", "swift", "swiftui", "react native", "expo", "app", "covert"])) {
    const matches = portfolioProjects.filter((project) =>
      ["mobile", "ml"].includes(project.domain)
    );
    return {
      title: "iOS & mobile work",
      body: "Dhruval builds iOS features in SwiftUI as a freelance developer at Covert Defenses. Traveloop and NexaBrew show full-stack mobile and web direction, and FasalVaidya pairs a mobile scanner with model-backed diagnosis.",
      actions: [sectionAction("See experience", "experience"), sectionAction("Open projects", "projects")],
      matchedProjects: matches,
    };
  }

  if (hasAny(query, ["experience", "work", "job", "career", "covert", "education", "degree", "university", "certification", "certificate"])) {
    return {
      title: "Experience & education",
      body: "Freelance iOS Developer at Covert Defenses (May 2026–Present), studying B.Tech Computer Science at Parul University, with certifications in PyTorch, LLMs, the OpenAI API, and data science.",
      actions: [sectionAction("Open experience", "experience"), sectionAction("Open resume", "resume")],
    };
  }

  if (hasAny(query, ["best", "featured", "review", "strongest", "top"])) {
    const matches = portfolioProjects.filter((project) => project.priority === "featured");
    return {
      title: "Best projects to review",
      body: "Review these first: Predicting EV Charging Loads for deep-learning depth, FasalVaidya for AI shipped as a product, NexaBrew for hackathon full-stack work, and Traveloop for mobile-app breadth.",
      actions: [sectionAction("Open projects", "projects"), sectionAction("Open resume", "resume")],
      matchedProjects: matches,
    };
  }

  if (hasAny(query, ["data", "analytics", "sql", "python", "dashboard", "power bi", "tableau", "excel"])) {
    const matches = portfolioProjects.filter((project) => project.domain === "analytics");
    return {
      title: "Analytics foundation",
      body: "The analytics work covers SQL, Python, dashboards, and reporting. E-commerce Funnel Analysis is the strongest first stop.",
      actions: [sectionAction("Open projects", "projects"), sectionAction("See skills", "skills")],
      matchedProjects: matches.slice(0, 4),
    };
  }

  if (matchesAnyPattern(query, guidePatterns.skills)) {
    return {
      title: "Skills",
      body: "The skill set is grouped around ML & AI, Mobile & iOS, Analytics & Data, Backend & Web, and Languages & Tools. The current stack includes Swift, SwiftUI, Python, PyTorch, Scikit-learn, NumPy, Pandas, LLMs, the OpenAI API, React Native, Flask, Express, REST APIs, Postgres, SQL, Java, JavaScript, and TypeScript.",
      actions: [sectionAction("Open skills", "skills"), sectionAction("Open resume", "resume")],
      detailItems: skillGroups.map((group) => group.title),
      matchedSkills: skillGroups,
    };
  }

  const directMatches = portfolioProjects.filter((project) => projectMatches(project, query));
  if (directMatches.length > 0) {
    return {
      title: "Matched projects",
      body: "These projects are the closest match for your search.",
      actions: [sectionAction("Open projects", "projects")],
      matchedProjects: directMatches.slice(0, 3),
    };
  }

  return {
    title: "I don’t have that detail on the site yet",
    body: "The portfolio has project work, skills, hobbies, resume details, and contact information. For anything more specific, the contact form is the best next step.",
    actions: [
      sectionAction("Projects", "projects"),
      sectionAction("Resume", "resume"),
      sectionAction("Contact", "contact"),
    ],
  };
}

function runAction(action: GuideAction) {
  if (action.kind === "external") {
    window.open(action.target, "_blank", "noopener,noreferrer");
    return;
  }

  document.getElementById(action.target)?.scrollIntoView({ behavior: "smooth" });
}

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const response = useMemo(
    () => getGuideResponse(submittedQuery || query),
    [query, submittedQuery]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmittedQuery(query.trim());
  };

  const selectPrompt = (promptQuery: string) => {
    setQuery(promptQuery);
    setSubmittedQuery(promptQuery);
  };

  const clearSearch = () => {
    setQuery("");
    setSubmittedQuery("");
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4" aria-label="Portfolio guide">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-[1.75rem] border border-black/10 bg-white/75 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl"
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-b border-black/10 px-4 py-3 md:px-5"
        >
          <Search className="h-5 w-5 flex-none text-gray-500" strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSubmittedQuery("");
            }}
            className="min-w-0 flex-1 bg-transparent py-3 text-base text-gray-950 placeholder:text-gray-500 focus:outline-none md:text-lg"
            placeholder="Search projects, skills, hobbies, resume, or contact"
            maxLength={180}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-black/5 hover:text-gray-900"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-950 text-white shadow-lg transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!query.trim()}
            aria-label="Search portfolio"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="grid gap-5 p-4 md:grid-cols-[0.9fr_1.4fr] md:p-5">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Try a path
            </p>
            <div className="flex flex-wrap gap-2">
              {guidePrompts.map((prompt) => (
                <button
                  key={prompt.intent}
                  type="button"
                  onClick={() => selectPrompt(prompt.query)}
                  className="rounded-full border border-black/10 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-900 hover:text-gray-950"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={`${response.title}-${submittedQuery || query}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5"
          >
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-950">{response.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600 md:text-base">
                  {response.body}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {response.actions.map((action) => (
                  <button
                    key={`${action.kind}-${action.label}`}
                    type="button"
                    onClick={() => runAction(action)}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
                  >
                    {action.label}
                    {action.kind === "external" ? (
                      <ExternalLink className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </button>
                ))}
              </div>

              {response.detailItems && response.detailItems.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {response.detailItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {response.matchedSkills && response.matchedSkills.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {response.matchedSkills.map((group) => (
                    <button
                      key={group.title}
                      type="button"
                      onClick={() => runAction(sectionAction("Open skills", "skills"))}
                      className="rounded-2xl border border-black/10 bg-gray-50/80 p-4 text-left transition hover:-translate-y-0.5 hover:border-gray-900 hover:bg-white"
                    >
                      <h3 className="font-bold text-gray-950">{group.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                        {group.summary}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {response.matchedProjects && response.matchedProjects.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {response.matchedProjects.slice(0, 4).map((project) => (
                    <a
                      key={project.title}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-2xl border border-black/10 bg-gray-50/80 p-4 text-left transition hover:-translate-y-0.5 hover:border-gray-900 hover:bg-white"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                            {project.category}
                          </p>
                          <h3 className="mt-1 font-bold text-gray-950">{project.title}</h3>
                        </div>
                        <ExternalLink className="mt-1 h-4 w-4 flex-none text-gray-400 transition group-hover:text-gray-900" />
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                        {project.description}
                      </p>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm text-gray-600">
        <button
          type="button"
          onClick={() => runAction(sectionAction("Resume", "resume"))}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 shadow-sm ring-1 ring-black/5 transition hover:bg-white"
        >
          <FileText className="h-4 w-4" />
          Resume
        </button>
        <button
          type="button"
          onClick={() => runAction(sectionAction("Contact", "contact"))}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 shadow-sm ring-1 ring-black/5 transition hover:bg-white"
        >
          <Mail className="h-4 w-4" />
          Contact
        </button>
      </div>
    </section>
  );
}
