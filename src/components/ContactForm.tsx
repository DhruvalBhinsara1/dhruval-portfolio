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
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-medium mb-12 md:mb-16">
            LET'S CONNECT
          </h2>

          <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs md:text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-black/20 focus:border-black focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs md:text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-black/20 focus:border-black focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs md:text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2.5 text-sm border border-black/20 focus:border-black focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="px-6 py-2.5 text-sm bg-black text-white font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-sm text-black/60">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600">{errorMsg}</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
