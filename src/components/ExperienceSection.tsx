import React from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { certifications, educationItems, experienceItems } from "@/data/portfolio";

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="bg-transparent px-6 py-16 md:px-12 md:py-24">
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
              Experience
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-5xl">
              Where the work happens.
            </h2>
          </div>
          <p className="text-lg leading-8 text-gray-600">
            Hands-on iOS development alongside an ongoing Computer Science degree, backed by focused
            certifications in machine learning, LLMs, and data.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Work + Education */}
          <div className="flex flex-col gap-6">
            {experienceItems.map((item, index) => (
              <motion.div
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-[1.5rem] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-md md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-gray-950 text-white">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3 className="text-xl font-bold text-gray-950">{item.role}</h3>
                      <span className="text-sm font-medium text-gray-500">{item.period}</span>
                    </div>
                    <p className="mt-1 text-base font-semibold text-gray-800">{item.company}</p>
                    <p className="text-sm text-gray-500">
                      {item.location} · {item.employment}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-600">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gray-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}

            {educationItems.map((item, index) => (
              <motion.div
                key={item.school}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.1 + index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-[1.5rem] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-md md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-gray-950 text-white">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3 className="text-xl font-bold text-gray-950">{item.school}</h3>
                      <span className="text-sm font-medium text-gray-500">{item.period}</span>
                    </div>
                    <p className="mt-1 text-base font-semibold text-gray-800">{item.degree}</p>
                    <p className="text-sm text-gray-500">{item.location}</p>
                    <p className="mt-4 text-sm leading-6 text-gray-600">{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-[1.5rem] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-md md:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-gray-950 text-white">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-950">Certifications</h3>
            </div>
            <ul className="flex flex-col divide-y divide-black/5">
              {certifications.map((cert) => (
                <li key={cert.title} className="flex items-start justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{cert.title}</p>
                    <p className="text-xs text-gray-500">{cert.issuer}</p>
                  </div>
                  <span className="flex-none text-xs font-medium text-gray-400">{cert.date}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
