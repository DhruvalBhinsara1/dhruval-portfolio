import React from "react";
import { motion } from "framer-motion";
import { Database, BarChart3, Code, FileSpreadsheet, Brain, TrendingUp } from "lucide-react";

const skillCategories = [
  {
    title: "Data Analysis",
    icon: BarChart3,
    skills: ["Python (Pandas, NumPy)", "SQL", "Excel", "Data Cleaning", "Statistical Analysis"]
  },
  {
    title: "Visualization",
    icon: TrendingUp,
    skills: ["Tableau", "Power BI", "Matplotlib", "Seaborn", "Data Storytelling"]
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["SQL Server", "MySQL", "PostgreSQL", "Oracle", "Query Optimization"]
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "SQL", "JavaScript", "React", "Git"]
  },
  {
    title: "Machine Learning",
    icon: Brain,
    skills: ["Scikit-learn", "Predictive Modeling", "Data Mining", "Feature Engineering"]
  },
  {
    title: "Tools",
    icon: FileSpreadsheet,
    skills: ["Jupyter", "VS Code", "Excel", "Google Analytics", "ETL"]
  }
];

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">Skills & Technologies</h2>
          <p className="text-lg text-gray-600">
            Tools and technologies I use to turn data into insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="backdrop-blur-md bg-white/60 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                    <Icon className="w-6 h-6 text-gray-700" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-black">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
