import React from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Target, FileText, Mail } from "lucide-react";
import AISearch from "./AISearch";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-32 bg-transparent overflow-hidden"
    >
      {/* Subtle Animated Rainbow Blobs Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-pink-200 via-purple-200 to-transparent rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200 via-cyan-200 to-transparent rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 0],
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-200 via-orange-200 to-transparent rounded-full opacity-15 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center relative z-10 mb-16"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-3xl text-gray-600 mb-4 font-medium"
        >
          Hey, I'm Dhruval Bhinsara 👋
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-black mb-8"
        >
          Aspiring Data Analyst
        </motion.h1>

        {/* Avatar - Memoji */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
          className="mb-12 flex justify-center"
        >
          <img
            src="/memoji.png"
            alt="Dhruval Bhinsara"
            className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
          />
        </motion.div>

        {/* AI Search Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <AISearch />
        </motion.div>
      </motion.div>

      {/* Navigation Pills - 3x2 Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="relative z-10 mt-8 mb-32"
      >
        <div className="flex flex-col items-center gap-4">
          {/* First Row - 3 buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            {[
              { label: 'Me', icon: User, target: 'about' },
              { label: 'Projects', icon: Briefcase, target: 'projects' },
              { label: 'Skills', icon: Target, target: 'skills' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm font-medium text-gray-800 border border-white/30"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </div>
          
          {/* Second Row - 2 buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            {[
              { label: 'Resume', icon: FileText, target: 'resume' },
              { label: 'Contact', icon: Mail, target: 'contact' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm font-medium text-gray-800 border border-white/30"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Large Bottom Text - Only in Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-4 md:bottom-8 left-0 right-0 z-0 overflow-hidden"
      >
        {/* <h3 className="text-7xl md:text-9xl lg:text-[11rem] font-bold text-gray-100/25 tracking-wider text-center px-6 md:px-12">
          Dhruval Bhinsara
        </h3> */}
      </motion.div>
    </section>
  );
};

export default HeroSection;
