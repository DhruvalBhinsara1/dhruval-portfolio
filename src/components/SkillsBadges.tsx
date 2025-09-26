import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, BarChart3, Code, FileSpreadsheet, 
  GitBranch, BookOpen, Settings,
  PieChart, Layers, Target
} from 'lucide-react';

type Skill = {
  name: string;
  icon: React.ComponentType<any>;
  proficiency: 'beginner' | 'intermediate' | 'advanced';
  category: string;
};

const skillsData: Skill[] = [
  // Data Analysis & Visualization
  { name: 'Excel', icon: FileSpreadsheet, proficiency: 'advanced', category: 'Data Analysis' },
  { name: 'Power BI', icon: BarChart3, proficiency: 'advanced', category: 'Data Analysis' },
  { name: 'Tableau', icon: PieChart, proficiency: 'intermediate', category: 'Data Analysis' },
  { name: 'Python', icon: Code, proficiency: 'intermediate', category: 'Data Analysis' },
  { name: 'SQL', icon: Database, proficiency: 'advanced', category: 'Data Analysis' },

  // Technical Skills
  { name: 'Data Cleaning', icon: Settings, proficiency: 'advanced', category: 'Technical' },
  { name: 'Dashboard Development', icon: Layers, proficiency: 'advanced', category: 'Technical' },

  // Tools & Platforms
  { name: 'Git/GitHub', icon: GitBranch, proficiency: 'intermediate', category: 'Tools' },
  { name: 'Jupyter', icon: BookOpen, proficiency: 'intermediate', category: 'Tools' },
  { name: 'Power Query', icon: Target, proficiency: 'advanced', category: 'Tools' },
];

const getProficiencyColor = (proficiency: string) => {
  switch (proficiency) {
    case 'advanced': return 'from-green-500 to-emerald-600';
    case 'intermediate': return 'from-blue-500 to-cyan-600';
    case 'beginner': return 'from-orange-400 to-amber-500';
    default: return 'from-gray-400 to-gray-500';
  }
};



const groupedSkills = skillsData.reduce((acc, skill) => {
  if (!acc[skill.category]) acc[skill.category] = [];
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, Skill[]>);

const SkillsBadges: React.FC = () => {
  return (
    <section
      id="skills"
  className="min-h-screen md:min-h-dvh px-4 bg-white flex items-center justify-center scroll-mt-24 snap-start"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-slate-900">Skills & Expertise</h2>
        
        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-6 text-slate-700">{category}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * skills.length + index) * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getProficiencyColor(skill.proficiency)} shadow-sm`}>
                        <skill.icon size={20} className="text-white" />
                      </div>
                      <span className="font-medium text-slate-900">{skill.name}</span>
                    </div>
                    
                    {/* Proficiency indicator */}
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency)}`}
                        initial={{ width: '0%' }}
                        whileInView={{ 
                          width: skill.proficiency === 'advanced' ? '100%' : 
                                skill.proficiency === 'intermediate' ? '75%' : '50%'
                        }}
                        transition={{ duration: 0.8, delay: (categoryIndex * skills.length + index) * 0.1 + 0.3 }}
                      />
                    </div>
                    
                    <div className="mt-2 text-xs text-slate-500 capitalize font-medium">
                      {skill.proficiency}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsBadges;