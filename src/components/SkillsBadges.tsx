import React from 'react';
import { motion } from 'framer-motion';
import { Database, BarChart3, Code, FileSpreadsheet } from 'lucide-react';

const skills = [
  { name: 'SQL', icon: Database },
  { name: 'Python', icon: Code },
  { name: 'Tableau', icon: BarChart3 },
  { name: 'Excel', icon: FileSpreadsheet },
  // Add more
];

const SkillsBadges: React.FC = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-primary">Skills</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ scale: 1.02 }}
              className="bg-surface rounded-full px-6 py-3 flex items-center gap-2 hover:bg-accent/5 transition-colors"
            >
              <skill.icon size={24} className="text-primary" />
              <span className="font-semibold text-primary">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsBadges;