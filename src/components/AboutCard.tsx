import React from 'react';
import { motion } from 'framer-motion';


const AboutCard: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-slate-200 p-8 flex flex-col items-center gap-6 hover:shadow-2xl transition-shadow duration-300"
          tabIndex={0}
          aria-label="About Dhruval Bhinsara"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <img
              src="/dhruval-profile.jpg"
              alt="Dhruval Bhinsara profile"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
          <div className="pt-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Dhruval Bhinsara</h2>
            <p className="text-xs uppercase text-slate-500 mb-4 tracking-widest font-semibold">Data Analyst</p>
            <p className="text-slate-700 leading-relaxed max-w-xl mx-auto text-base">
              I turn raw data into actionable insights. Proficient in <span className="font-medium text-blue-600">SQL</span>, <span className="font-medium text-yellow-600">Python</span>, and modern visualization tools. I love solving complex problems and helping businesses make data-driven decisions.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">SQL</span>
            <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-medium border border-yellow-100">Python</span>
            <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">Data Viz</span>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">Problem Solving</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCard;