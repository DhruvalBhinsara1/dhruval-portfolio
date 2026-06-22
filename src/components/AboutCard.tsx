import React from "react";
import { motion } from "framer-motion";

const AboutCard: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center tracking-tight">About</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="w-full rounded-[1.75rem] border border-black/10 bg-white/70 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-12 lg:p-16"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Avatar Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-[1.5rem] bg-gray-100 shadow-inner md:h-64 md:w-64">
                <img 
                  src="/dhruval-profile.jpg" 
                  srcSet="/dhruval-profile.jpg 320w, /dhruval-profile.jpg 640w"
                  sizes="(max-width: 640px) 320px, 640px"
                  alt="Dhruval Bhinsara"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-2 text-black"
              >
                Dhruval Bhinsara
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-gray-600 mb-6"
              >
                Surat, Gujarat, India
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <p className="text-lg leading-relaxed text-black mb-4">
                  I'm a <strong>Computer Science undergrad</strong> with hands-on experience in <strong>iOS development</strong>, <strong>machine learning</strong>, and <strong>AI engineering</strong>. I like work where the path from raw data to a useful product is visible.
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Swift', 'SwiftUI', 'Python', 'PyTorch', 'React Native', 'Flask', 'SQL'].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4 text-base leading-relaxed text-gray-700"
              >
                <p>
                  I'm <span className="font-medium text-black">Dhruval Bhinsara</span>, based in <span className="font-medium text-black">Surat, Gujarat, India</span>. My first serious projects were in <span className="font-medium text-blue-600">data analytics</span>: SQL, Python, Excel, Power BI, and Tableau work that made messy datasets easier to reason about.
                </p>

                <p>
                  More recently, that has grown into ML, AI, and mobile work. I build iOS features with SwiftUI as a freelance developer at <span className="font-medium text-black">Covert Defenses</span>, train PyTorch models like an EV charging-load predictor, and ship AI products such as FasalVaidya for crop diagnosis.
                </p>

                <p>
                  Away from code, I spend time reading, filmmaking, following <span className="font-medium text-red-600">Formula 1</span>, and listening to indie rock.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCard;
