import React from 'react';
import { motion } from 'framer-motion';


const AboutCard: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-[100svh] min-h-screen md:min-h-dvh px-4 bg-gradient-to-b from-white via-slate-50 to-white flex items-center justify-center scroll-mt-24 snap-start"
    >
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
            <p className="text-xs uppercase text-slate-500 mb-6 tracking-widest font-semibold">Data Analyst & Storyteller</p>
            
            {/* Personal Story */}
            <div className="max-w-2xl mx-auto space-y-4 mb-8">
              <p className="text-slate-700 leading-relaxed text-base">
                My journey into data analysis began with a simple fascination: <span className="font-medium text-blue-600">how numbers tell stories</span>. 
                What started as curiosity about patterns in everyday data has evolved into a passion for transforming complex datasets into 
                <span className="font-medium text-emerald-600"> clear, actionable insights</span> that drive real business impact.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                I believe the best data analysis combines <span className="font-medium">technical precision</span> with <span className="font-medium">storytelling clarity</span>. 
                Whether I'm cleaning messy datasets, building interactive dashboards, or uncovering hidden trends, 
                my goal is always the same: make data accessible and meaningful.
              </p>
            </div>
            
            {/* Key Achievements */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wide">Portfolio Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
                <div className="bg-blue-50/80 rounded-lg p-3 border border-blue-100">
                  <div className="text-lg font-bold text-blue-700">5</div>
                  <div className="text-xs text-blue-600 font-medium">Tool Categories</div>
                </div>
                <div className="bg-green-50/80 rounded-lg p-3 border border-green-100">
                  <div className="text-lg font-bold text-green-700">40+</div>
                  <div className="text-xs text-green-600 font-medium">Project Files</div>
                </div>
                <div className="bg-purple-50/80 rounded-lg p-3 border border-purple-100">
                  <div className="text-lg font-bold text-purple-700">12+</div>
                  <div className="text-xs text-purple-600 font-medium">Learning Projects</div>
                </div>
                <div className="bg-amber-50/80 rounded-lg p-3 border border-amber-100">
                  <div className="text-lg font-bold text-amber-700">100%</div>
                  <div className="text-xs text-amber-600 font-medium">Passion for Learning</div>
                </div>
              </div>
            </div>
            
            {/* Current Focus */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600 font-medium">Currently learning: Big Data Analysis</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">Data Analysis</span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">Dashboard Development</span>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">Data Storytelling</span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">Business Intelligence</span>
            <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-medium border border-cyan-100">Statistical Analysis</span>
            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100">Data Visualization</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCard;