import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const apiUrl =
        import.meta.env.MODE === "production"
          ? "/api/send-email"
          : "http://localhost:3001/api/send-email";

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message");
      }
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full flex flex-col items-center"
        >
            <div className="w-full backdrop-blur-lg bg-white/80 border border-white/20 rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center tracking-tight text-black">Let's Connect</h2>
              <p className="text-lg md:text-2xl text-gray-700 mb-10 text-center">Reach out for collaborations, questions, or just to say hi!</p>

          <form onSubmit={handleSubmit} className="space-y-8 w-full">
            <div>
                <label htmlFor="name" className="block text-base font-normal mb-3 text-black">
                Name
              </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-0 py-3 text-base border-0 border-b border-gray-400 focus:border-blue-600 focus:outline-none transition-colors bg-transparent placeholder-gray-400 text-black"
                  placeholder=""
                  required
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-base font-normal mb-3 text-black">
                Email
              </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-0 py-3 text-base border-0 border-b border-gray-400 focus:border-blue-600 focus:outline-none transition-colors bg-transparent placeholder-gray-400 text-black"
                  placeholder=""
                  required
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-base font-normal mb-3 text-black">
                Message
              </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-0 py-3 text-base border-0 border-b border-gray-400 focus:border-blue-600 focus:outline-none transition-colors bg-transparent resize-none placeholder-gray-400 text-black"
                  placeholder=""
                  required
                />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="px-8 py-3.5 text-base bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

      {status === "success" && (
        <p className="text-base text-green-600 font-medium">Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="text-base text-red-600">{errorMsg}</p>
      )}
          </form>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
