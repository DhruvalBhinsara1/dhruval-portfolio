import React from "react";
import { motion } from "framer-motion";

const AboutCard: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm md:text-base font-bold mb-12 md:mb-16 tracking-[0.3em]">
            ABOUT ME
          </h2>

          <div className="space-y-6 md:space-y-8 max-w-4xl">
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
              I'm a student at Parul University with a passion for turning raw data into meaningful insights. 
              What started as curiosity about patterns and numbers has evolved into a journey through Excel, 
              SQL, Python, and modern BI tools. I enjoy data analysis and building projects that showcase the 
              power of data-driven decision making.
            </p>

            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
              Through hands-on projects and continuous learning, I work with diverse datasets to uncover trends, 
              create visualizations, and solve analytical challenges. From e-commerce funnel analysis to influencer 
              platform insights, my portfolio demonstrates practical experience across Python (Pandas), SQL, Excel, 
              Tableau, and Power BI.
            </p>

            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
              I'm passionate about collaborating on data projects and eager to apply my analytical skills in 
              real-world scenarios. Whether it's exploring new datasets, building dashboards, or optimizing 
              processes, I'm committed to delivering clear and actionable insights that create value.
            </p>
          </div>

          <div className="mt-12 md:mt-16">
            <h3 className="text-sm md:text-base font-medium mb-4 tracking-[0.2em]">
              WHAT MY PERFECT COLLAB LOOKS LIKE
            </h3>
            <p className="text-xs md:text-sm text-black/60">
              scroll below to start turning your data into insights
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCard;
