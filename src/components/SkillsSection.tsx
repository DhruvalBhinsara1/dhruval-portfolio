import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Brain, Code, Database, Smartphone } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import type { SkillGroup } from "@/data/portfolio";

const skillIcons: Record<SkillGroup["icon"], React.ElementType> = {
  analytics: BarChart3,
  ml: Brain,
  mobile: Smartphone,
  backend: Database,
  tools: Code,
};

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="bg-transparent px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[0.75fr_1.25fr] md:items-end"
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Capabilities
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-5xl">
              A practical stack for data, models, and mobile apps.
            </h2>
          </div>
          <p className="text-lg leading-8 text-gray-600">
            The skill set is moving from analysis-only work toward product-shaped systems: data understanding, model experiments, mobile interfaces, and the APIs that connect them.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[group.icon];

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="grid gap-5 rounded-[1.5rem] border border-black/10 bg-white/65 p-5 shadow-sm backdrop-blur-md md:grid-cols-[240px_1fr] md:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-950">{group.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600 md:hidden">
                      {group.summary}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="hidden text-sm leading-6 text-gray-600 md:block">
                    {group.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
