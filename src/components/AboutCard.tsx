import React from "react";
import { motion } from "framer-motion";

const AboutCard: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center tracking-tight">About Me</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-white/60 rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-white/20 w-full"
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
              <div className="w-48 h-48 md:w-64 md:h-64 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
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
                  I'm an <strong>Aspiring Data Analyst</strong> and a <strong>Computer Science major</strong> with a specialization in <strong>Oracle Technologies</strong>. My interest in Data Science began during my teenage years, and has grown stronger over time.
                </p>
                
                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Tableau', 'SQL', 'Microsoft Power BI', 'Python', 'Excel', 'Data Analysis'].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium"
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
                  I'm <span className="text-black font-medium">Dhruval Bhinsara</span>, an aspiring <span className="text-blue-600 font-medium">Data Analyst</span> based in <span className="text-black font-medium">Surat, Gujarat, India</span>! I'm all about turning complex data into meaningful insights that help in making informed decisions. With skills in <span className="font-medium">Python</span>, <span className="font-medium">SQL</span>, <span className="font-medium">Power BI</span> and more, I'm on a journey to dive deeper into the world of data science and <span className="font-medium">machine learning</span>.
                </p>

                <p>
                  When I'm not crunching numbers, you can find me reading, indulging in <span className="text-purple-600 font-medium">filmmaking</span>, or geeking out over <span className="text-red-600 font-medium">Formula 1</span>. Oh, and I have a soft spot for <span className="font-medium">indie rock music</span> and movies that explore art and the way of life. What about you? What brings you here today? 😊
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
