import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  links?: { label: string; target: string }[];
}

export default function AISearch() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // AI Knowledge Base about Dhruval with interactive links
  const getAIResponse = (query: string): { text: string; links?: { label: string; target: string }[] } => {
    const lowerQuery = query.toLowerCase();

    // About/Who questions
    if (lowerQuery.includes('who') || lowerQuery.includes('about')) {
      return {
        text: "I'm Dhruval Bhinsara, an aspiring Data Analyst and Computer Science major from Surat, Gujarat, India. I specialize in Oracle Technologies and have a passion for turning complex data into meaningful insights.",
        links: [
          { label: "Learn More About Me", target: "about" },
          { label: "View My Skills", target: "skills" }
        ]
      };
    }

    // Skills questions
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tools')) {
      return {
        text: "I have expertise in Python, SQL, Power BI, Tableau, Data Analysis, and Machine Learning. I'm proficient in data visualization and turning data into actionable insights!",
        links: [
          { label: "View All Skills", target: "skills" },
          { label: "See My Projects", target: "projects" }
        ]
      };
    }

    // Projects questions
    if (lowerQuery.includes('project')) {
      return {
        text: "One of my standout achievements is creating an E-commerce user behavior funnel with over 40 million rows of data. Check out my portfolio of data analysis and visualization projects!",
        links: [
          { label: "View All Projects", target: "projects" },
          { label: "See My Skills", target: "skills" }
        ]
      };
    }

    // Experience questions
    if (lowerQuery.includes('experience') || lowerQuery.includes('work')) {
      return {
        text: "My experience lies in data analysis, creating complex data models, and building insightful visualizations with tools like Power BI and Tableau.",
        links: [
          { label: "View Projects", target: "projects" },
          { label: "Download Resume", target: "resume" }
        ]
      };
    }

    // Education questions
    if (lowerQuery.includes('education') || lowerQuery.includes('study') || lowerQuery.includes('degree')) {
      return {
        text: "I'm a Computer Science major with a specialization in Oracle Technologies. My interest in Data Science began during my teenage years!",
        links: [
          { label: "About Me", target: "about" },
          { label: "View Resume", target: "resume" }
        ]
      };
    }

    // Resume questions
    if (lowerQuery.includes('resume') || lowerQuery.includes('cv') || lowerQuery.includes('download')) {
      return {
        text: "Check out my resume to see my full professional experience, education, and technical skills!",
        links: [
          { label: "View Resume", target: "resume" },
          { label: "See Skills", target: "skills" }
        ]
      };
    }

    // Contact questions
    if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email')) {
      return {
        text: "I'd love to hear from you! Let's connect and discuss data, technology, or anything else you're curious about!",
        links: [
          { label: "Contact Me", target: "contact" }
        ]
      };
    }

    // Hobbies/Personal questions
    if (lowerQuery.includes('hobby') || lowerQuery.includes('hobbies') || lowerQuery.includes('free time') || lowerQuery.includes('fun')) {
      return {
        text: "When I'm not crunching numbers, you can find me reading or indulging in filmmaking. I have a soft spot for indie rock music and movies that explore art and the way of life.",
        links: [
          { label: "More About Me", target: "about" }
        ]
      };
    }

    // Location questions
    if (lowerQuery.includes('where') || lowerQuery.includes('location') || lowerQuery.includes('based')) {
      return {
        text: "I'm based in Surat, Gujarat, India! It's a vibrant city with a rich culture and history.",
        links: [
          { label: "Contact Me", target: "contact" }
        ]
      };
    }

    // Greeting
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      return {
        text: "Hey there! 👋 I'm Dhruval's AI assistant. I can tell you all about his skills, projects, experience, and more!",
        links: [
          { label: "View Skills", target: "skills" },
          { label: "See Projects", target: "projects" },
          { label: "Contact", target: "contact" }
        ]
      };
    }

    // Default response
    return {
      text: "I can tell you about Dhruval's skills, projects, experience, education, and interests. Explore the sections below!",
      links: [
        { label: "About", target: "about" },
        { label: "Projects", target: "projects" },
        { label: "Skills", target: "skills" },
        { label: "Contact", target: "contact" }
      ]
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(input);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: Date.now(),
        links: response.links
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Messages Container */}
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 max-h-96 overflow-y-auto space-y-4 px-4 py-4 scroll-smooth backdrop-blur-sm bg-white/20 rounded-2xl border border-white/10"
          >
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.isUser
                      ? 'backdrop-blur-xl bg-gray-800/90 text-white border border-white/10 shadow-lg'
                      : 'backdrop-blur-xl bg-white/60 text-black border border-white/20 shadow-lg'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  
                  {/* Interactive Links */}
                  {!message.isUser && message.links && message.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.links.map((link, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const element = document.getElementById(link.target);
                            element?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 backdrop-blur-md bg-white/70 text-gray-700 rounded-full text-xs font-medium hover:bg-white/90 transition-all duration-200 shadow-md border border-white/30 hover:scale-105"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="backdrop-blur-xl bg-white/60 rounded-2xl px-4 py-3 border border-white/20 shadow-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="w-full px-6 py-4 pr-14 rounded-full backdrop-blur-xl bg-white/40 border border-white/30 focus:bg-white/50 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-lg"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-gray-900 transition-all disabled:opacity-50 disabled:hover:scale-100"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
