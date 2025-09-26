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
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-900 tracking-tight">Contact</h2>
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
      </div>
    </section>
  );
};

export default ContactForm;