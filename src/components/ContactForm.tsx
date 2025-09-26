import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Form submitted!');
  };

  return (
    <section
      id="contact"
      className="min-h-[100svh] min-h-screen md:min-h-dvh px-4 bg-gradient-to-b from-white via-slate-50 to-white flex items-center justify-center scroll-mt-24 snap-start"
    >
      <div className="max-w-xl w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 tracking-tight">Let's Connect</h2>
          <p className="text-slate-600 max-w-md mx-auto">
            Ready to turn data into insights? I'd love to hear about your project and explore how we can work together.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600 font-medium">Usually responds within 24 hours</span>
          </div>
        </div>
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-8 shadow-md flex flex-col gap-6"
          aria-label="Contact form"
        >
          <div>
            <label htmlFor="name" className="block text-xs font-semibold mb-2 text-slate-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-slate-900 transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold mb-2 text-slate-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-slate-900 transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-semibold mb-2 text-slate-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-slate-900 transition-all resize-vertical"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-slate-900/90 hover:bg-slate-900 text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Send Message
          </button>
        </motion.form>
        
        {/* Alternative Contact Methods */}
        <div className="mt-12 text-center">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Other Ways to Connect</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {/* Direct Email */}
              <motion.a
                href="mailto:dhruvalbhinsara460@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors duration-200 text-blue-700 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Direct Email
              </motion.a>
              
              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/dhruvalbhinsara"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors duration-200 text-blue-700 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                LinkedIn
              </motion.a>
              
              {/* GitHub */}
              <motion.a
                href="https://github.com/DhruvalBhinsara1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors duration-200 text-slate-700 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                GitHub
              </motion.a>
            </div>
          </div>
          
          {/* Download Resume */}
          <div>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Download Resume
            </motion.a>
          </div>
          
          {/* Location & Availability */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Remote & On-site Available
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Available for new projects
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;