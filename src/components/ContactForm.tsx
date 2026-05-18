import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, CheckCircle2, LoaderCircle, Mail, MessageSquare, Send, User } from "lucide-react";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

async function readErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error || "The message could not be sent.";
  } catch {
    return "The message could not be sent.";
  }
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (status !== "idle") {
      setStatus("idle");
      setErrorMsg("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const apiUrl =
        import.meta.env.MODE === "production"
          ? "/api/send-email"
          : "http://localhost:3001/api/send-email";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(await readErrorMessage(response));
      }

      setStatus("success");
      setFormData(initialFormData);
    } catch (error: unknown) {
      setStatus("error");
      setErrorMsg(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <section id="contact" className="bg-transparent px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="grid gap-6 rounded-[1.75rem] border border-black/10 bg-white/75 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl md:grid-cols-[0.85fr_1.15fr] md:p-8"
        >
          <aside className="flex flex-col justify-between rounded-[1.35rem] bg-gray-950 p-6 text-white md:min-h-[540px] md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                Send a focused note.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/70">
                Project feedback, collaboration ideas, portfolio notes, or a simple hello all belong here.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              <a
                href="mailto:dhruvalbhinsara460@gmail.com"
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  dhruvalbhinsara460@gmail.com
                </span>
                <ArrowUpRight className="h-4 w-4 flex-none" />
              </a>
              <a
                href="https://www.linkedin.com/in/dhruvalbhinsara"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <span>LinkedIn profile</span>
                <ArrowUpRight className="h-4 w-4 flex-none" />
              </a>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-1 md:p-2">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="group block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <User className="h-4 w-4 text-gray-500" />
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-[52px] w-full rounded-2xl border border-black/10 bg-white px-4 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:ring-4 focus:ring-gray-950/10"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="group block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <Mail className="h-4 w-4 text-gray-500" />
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-[52px] w-full rounded-2xl border border-black/10 bg-white px-4 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:ring-4 focus:ring-gray-950/10"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="block flex-1">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                <MessageSquare className="h-4 w-4 text-gray-500" />
                Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={8}
                className="min-h-[220px] w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-base leading-7 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:ring-4 focus:ring-gray-950/10"
                placeholder="What should I know?"
                required
              />
            </label>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gray-950 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </button>

              <div aria-live="polite" className="min-h-6 text-sm">
                {status === "success" && (
                  <p className="inline-flex items-center gap-2 font-semibold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Message sent. Thank you.
                  </p>
                )}
                {status === "error" && (
                  <p className="inline-flex items-center gap-2 font-semibold text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {errorMsg}
                  </p>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
