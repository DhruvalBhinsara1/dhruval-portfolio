import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Code,
  Database,
  FileSpreadsheet,
  Leaf,
  MapPinned,
  TrendingUp,
  Users,
} from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";
import type { PortfolioProject } from "@/data/portfolio";

const domainStyles: Record<
  PortfolioProject["domain"],
  { accent: string; label: string; icon: React.ElementType }
> = {
  ml: { accent: "from-emerald-500 to-teal-500", label: "Model-backed product", icon: Leaf },
  mobile: { accent: "from-sky-500 to-blue-500", label: "Mobile app", icon: MapPinned },
  learning: { accent: "from-violet-500 to-indigo-500", label: "Learning system", icon: Brain },
  analytics: { accent: "from-gray-900 to-gray-600", label: "Analytics foundation", icon: BarChart3 },
};

const foundationIcons = [Users, Database, Code, FileSpreadsheet, TrendingUp];

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-semibold text-gray-700"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

const ProjectsGrid: React.FC = () => {
  const featuredProjects = portfolioProjects.filter((project) => project.priority === "featured");
  const foundationProjects = portfolioProjects.filter((project) => project.priority === "foundation");

  return (
    <section id="projects" className="bg-transparent px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl md:mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Selected work
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-5xl">
            Projects with a clearer shape
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            The current portfolio spans ML-backed product work, mobile app development, and the analytics foundation that started the path.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, index) => {
            const style = domainStyles[project.domain];
            const Icon = style.icon;

            return (
              <motion.a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group flex min-h-[360px] flex-col justify-between rounded-[1.75rem] border border-black/10 bg-white/75 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_80px_rgba(15,23,42,0.14)]"
              >
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${style.accent} text-white shadow-lg`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-400 transition group-hover:text-gray-950" />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    {project.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-950">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8">
                  <ProjectTags tags={project.tags} />
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gray-950">
                    View repository
                    <ArrowUpRight className="h-4 w-4" />
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:gap-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Analytics foundation
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-black md:text-3xl">
              The base layer: SQL, Python, dashboards, and reporting.
            </h3>
          </div>

          <div className="grid gap-3">
            {foundationProjects.map((project, index) => {
              const Icon = foundationIcons[index % foundationIcons.length];

              return (
                <motion.a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className="group grid gap-4 rounded-2xl border border-black/10 bg-white/65 p-4 shadow-sm backdrop-blur-md transition hover:bg-white md:grid-cols-[auto_1fr_auto] md:items-center"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                      {project.category}
                    </p>
                    <h4 className="mt-1 text-lg font-bold text-gray-950">{project.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{project.description}</p>
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 text-gray-400 transition group-hover:text-gray-950 md:block" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
