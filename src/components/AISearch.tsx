import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ExternalLink } from 'lucide-react';

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

  // Clear chat handler
  const handleClearChat = () => {
    if (!isLoading) {
      setMessages([]);
      // Smoothly scroll to top after clearing
      setTimeout(() => {
        const container = document.querySelector('.max-h-96.overflow-y-auto');
        if (container) {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };
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
    // Normalize input: lowercase, trim, remove punctuation
    const normalized = query
      .toLowerCase()
      .replace(/[.,!?]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Helper for keyword/synonym matching
    const has = (words: string | string[]) => {
      if (Array.isArray(words)) {
        return words.some(w => normalized.includes(w));
      }
      return normalized.includes(words);
    };

    // Special intro for the AI
    if (has(['who are you', 'what can you do', 'ai', 'assistant', 'are you smart', 'how smart'])) {
      return {
        text: "I'm not just any AI—I'm your personal portfolio assistant, powered by a custom knowledge base and a dash of personality! Ask me anything about my skills, favorites, or even weird questions. I'll do my best to answer, even if you get creative!",
        links: [
          { label: "About Me", target: "about" },
          { label: "Projects", target: "projects" },
          { label: "Skills", target: "skills" }
        ]
      };
    }

    // Fuzzy matching for car/favorites (more powerful intent inference)
    if (normalized.includes('car') || normalized.includes('amg') || normalized.includes('mercedes')) {
      return {
        text: "My dream car is the Mercedes AMG Black Series. It's a masterpiece of engineering and pure performance!",
        links: [
          { label: "About Me", target: "about" }
        ]
      };
    }
    if (normalized.includes('f1 driver') || normalized.includes('verstappen') || normalized.includes('max')) {
      return {
        text: "My favorite Formula 1 driver is Max Verstappen. His skill, determination, and racing spirit are truly inspiring!",
        links: [
          { label: "See My Skills", target: "skills" }
        ]
      };
    }
    if (normalized.includes('team') || normalized.includes('red bull') || normalized.includes('mclaren')) {
      return {
        text: "My favorite F1 teams are Red Bull and McLaren. I admire their innovation, teamwork, and relentless pursuit of excellence!",
        links: [
          { label: "View Projects", target: "projects" }
        ]
      };
    }
    if (normalized.includes('color') || normalized.includes('purple') || normalized.includes('lavender')) {
      return {
        text: "My favorite colors are purple and lavender. They're vibrant, creative, and always inspire me!",
        links: [
          { label: "See My Projects", target: "projects" }
        ]
      };
    }
    if (normalized.includes('food') || normalized.includes('pizza')) {
      return {
        text: "Pizza is my absolute favorite food—especially when it's loaded with cheese and a crispy crust!",
        links: [
          { label: "Contact Me", target: "contact" }
        ]
      };
    }
    if (normalized.includes('animal') || normalized.includes('cat')) {
      return {
        text: "My favorite animal is the cat. I love their independence, curiosity, and the way they always find the coziest spot in the room.",
        links: [
          { label: "More About Me", target: "about" }
        ]
      };
    }
  if (has(['favorite food', 'favourite food', 'food you like', 'best food', 'pizza'])) {
      return {
        text: "Pizza is my absolute favorite food—especially when it's loaded with cheese and a crispy crust!",
        links: [
          { label: "Contact Me", target: "contact" }
        ]
      };
    }
  if (has(['favorite color', 'favourite color', 'colour you like', 'best color', 'purple', 'lavender'])) {
      return {
        text: "My favorite colors are purple and lavender. They're vibrant, creative, and always inspire me!",
        links: [
          { label: "See My Projects", target: "projects" }
        ]
      };
    }
  if (has(['favorite car', 'favourite car', 'dream car', 'car you want', 'car you like', 'mercedes'])) {
      return {
        text: "My dream car is the Mercedes AMG Black Series. It's a masterpiece of engineering and pure performance!",
        links: [
          { label: "About Me", target: "about" }
        ]
      };
    }
  if (has(['favorite f1 driver', 'favourite f1 driver', 'best f1 driver', 'f1 driver you like', 'max verstappen'])) {
      return {
        text: "My favorite Formula 1 driver is Max Verstappen. His skill, determination, and racing spirit are truly inspiring!",
        links: [
          { label: "See My Skills", target: "skills" }
        ]
      };
    }
  if (has(['favorite team', 'favourite team', 'f1 team you like', 'best team', 'red bull', 'mclaren'])) {
      return {
        text: "My favorite F1 teams are Red Bull and McLaren. I admire their innovation, teamwork, and relentless pursuit of excellence!",
        links: [
          { label: "View Projects", target: "projects" }
        ]
      };
    }

    // Weird and complex questions (first person)
  if (has(['favorite cheese', 'favourite cheese', 'cheese you like']) || /cheese.*dream/i.test(normalized)) {
      return {
        text: "My favorite cheese is Data Cheese, aged in SQL barrels and served with a side of Python crackers. I once dreamt of a cheese wheel rolling through a database!",
        links: [
          { label: "See My Skills", target: "skills" },
          { label: "Contact Me", target: "contact" }
        ]
      };
    }
  if (has(['if you were a fruit', 'fruit you would be', 'fruit like'])) {
      return {
        text: "If I were a fruit, I'd be a data-berry: sweet, packed with insights, and always ready to be picked for analysis!",
        links: [
          { label: "About Me", target: "about" }
        ]
      };
    }
  if (/alien|extraterrestrial|ufo|space/.test(normalized)) {
      return {
        text: "I've never been abducted by aliens, but if I met one, I'd probably ask for their data logs and build a Power BI dashboard of the galaxy!",
        links: [
          { label: "See My Projects", target: "projects" }
        ]
      };
    }
  if (/quantum|multiverse|parallel universe/.test(normalized)) {
      return {
        text: "In a parallel universe, I'm a quantum data wizard, visualizing Schrödinger's cat in Tableau and running SQL queries on entangled databases.",
        links: [
          { label: "View Resume", target: "resume" }
        ]
      };
    }
  if (/swap places/.test(normalized)) {
      return {
        text: "If I could swap places with my AI, I'd finally get to taste real coffee and experience the thrill of debugging code at 2am!",
        links: [
          { label: "Contact Me", target: "contact" }
        ]
      };
    }
  if (/time machine/.test(normalized)) {
      return {
        text: "I'd travel to the future, collect advanced data science techniques, and bring them back to revolutionize today's analytics!",
        links: [
          { label: "See My Skills", target: "skills" }
        ]
      };
    }
  if (/sound of data/.test(normalized)) {
      return {
        text: "The sound of data is a gentle hum of servers, the click of keyboard keys, and the occasional cheer when a query finally works!",
        links: [
          { label: "View Projects", target: "projects" }
        ]
      };
    }
  if (/speak to animals|talk to animals/.test(normalized)) {
      return {
        text: "I can't speak to animals, but I can analyze their migration patterns and visualize their journeys in Power BI!",
        links: [
          { label: "About Me", target: "about" }
        ]
      };
    }
  if (/spirit vegetable/.test(normalized)) {
      return {
        text: "My spirit vegetable is the potato: versatile, reliable, and able to adapt to any data environment!",
        links: [
          { label: "See My Skills", target: "skills" }
        ]
      };
    }
  if (/superpower/.test(normalized)) {
      return {
        text: "I'd choose the superpower of instant data cleaning—no more missing values or messy spreadsheets!",
        links: [
          { label: "View All Skills", target: "skills" }
        ]
      };
    }
  if (/conspiracy theory/.test(normalized)) {
      return {
        text: "My favorite conspiracy theory is that Excel secretly controls the world's financial systems. I keep a close eye on those spreadsheets!",
        links: [
          { label: "Contact Me", target: "contact" }
        ]
      };
    }

  // About/Who questions
  if (has(['who', 'about', 'yourself', 'who are you', 'tell me about'])) {
      return {
        text: "Hi, I'm Dhruval Bhinsara—an aspiring Data Analyst and Computer Science major from Surat, Gujarat, India. I specialize in Oracle Technologies and love turning complex data into meaningful insights.",
        links: [
          { label: "Learn More About Me", target: "about" },
          { label: "View My Skills", target: "skills" }
        ]
      };
    }

  // Skills questions
  if (has(['skill', 'skills', 'technology', 'technologies', 'tools', 'what can you do', 'expertise'])) {
      return {
        text: "My expertise includes Python, SQL, Power BI, Tableau, Data Analysis, and Machine Learning. I'm passionate about data visualization and transforming data into actionable insights!",
        links: [
          { label: "View All Skills", target: "skills" },
          { label: "See My Projects", target: "projects" }
        ]
      };
    }

  // Projects questions
  if (has(['project', 'projects', 'work you did', 'portfolio', 'data project'])) {
      return {
        text: "One of my proudest achievements is building an E-commerce user behavior funnel with over 40 million rows of data. Feel free to explore my portfolio of data analysis and visualization projects!",
        links: [
          { label: "View All Projects", target: "projects" },
          { label: "See My Skills", target: "skills" }
        ]
      };
    }

  // Experience questions
  if (has(['experience', 'work', 'job', 'background', 'what have you done'])) {
      return {
        text: "I have hands-on experience in data analysis, building complex data models, and creating insightful visualizations with tools like Power BI and Tableau.",
        links: [
          { label: "View Projects", target: "projects" },
          { label: "Download Resume", target: "resume" }
        ]
      };
    }

  // Education questions
  if (has(['education', 'study', 'degree', 'school', 'college', 'university'])) {
      return {
        text: "I'm a Computer Science major specializing in Oracle Technologies. My passion for Data Science started in my teenage years!",
        links: [
          { label: "About Me", target: "about" },
          { label: "View Resume", target: "resume" }
        ]
      };
    }

  // Resume questions
  if (has(['resume', 'cv', 'download', 'curriculum vitae', 'profile'])) {
      return {
        text: "You can view my resume to see my professional experience, education, and technical skills!",
        links: [
          { label: "View Resume", target: "resume" },
          { label: "See Skills", target: "skills" }
        ]
      };
    }

  // Contact questions
  if (has(['contact', 'reach', 'email', 'connect', 'get in touch'])) {
      return {
        text: "I'd love to hear from you! Let's connect and chat about data, technology, or anything else you're curious about!",
        links: [
          { label: "Contact Me", target: "contact" }
        ]
      };
    }

  // Hobbies/Personal questions
  if (has(['hobby', 'hobbies', 'free time', 'fun', 'what do you do for fun', 'interests'])) {
      return {
        text: "When I'm not crunching numbers, I love reading, filmmaking, and listening to indie rock music. Movies that explore art and the way of life always fascinate me.",
        links: [
          { label: "More About Me", target: "about" }
        ]
      };
    }

  // Location questions
  if (has(['where', 'location', 'based', 'city', 'place', 'from'])) {
      return {
        text: "I'm based in Surat, Gujarat, India—a vibrant city with a rich culture and history.",
        links: [
          { label: "Contact Me", target: "contact" }
        ]
      };
    }

  // Greeting
  if (has(['hello', 'hi', 'hey', 'greetings', 'yo', 'namaste'])) {
      return {
        text: "Hey there! 👋 I'm Dhruval. Ask me anything about my skills, projects, experience, and more!",
        links: [
          { label: "View Skills", target: "skills" },
          { label: "See Projects", target: "projects" },
          { label: "Contact", target: "contact" }
        ]
      };
    }

    // Default response
    // Fallback: try to infer intent for favorites
    if (normalized.match(/(car|amg|mercedes)/)) {
      return {
        text: "My dream car is the Mercedes AMG Black Series!",
        links: [
          { label: "About Me", target: "about" }
        ]
      };
    }
    if (normalized.match(/(f1 driver|verstappen|max)/)) {
      return {
        text: "Max Verstappen is my favorite Formula 1 driver!",
        links: [
          { label: "See My Skills", target: "skills" }
        ]
      };
    }
    if (normalized.match(/(team|red bull|mclaren)/)) {
      return {
        text: "Red Bull and McLaren are my favorite F1 teams!",
        links: [
          { label: "View Projects", target: "projects" }
        ]
      };
    }
    if (normalized.match(/(color|purple|lavender)/)) {
      return {
        text: "Purple and lavender are my favorite colors!",
        links: [
          { label: "See My Projects", target: "projects" }
        ]
      };
    }
    if (normalized.match(/(food|pizza)/)) {
      return {
        text: "Pizza is my favorite food!",
        links: [
          { label: "Contact Me", target: "contact" }
        ]
      };
    }
    if (normalized.match(/(animal|cat)/)) {
      return {
        text: "Cat is my favorite animal!",
        links: [
          { label: "More About Me", target: "about" }
        ]
      };
    }
    // Default response
    return {
      text: "I can tell you about my skills, projects, experience, education, and interests. Explore the sections below!",
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
  <div className="w-full max-w-6xl mx-auto">
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
          </motion.div>
        )}
      </AnimatePresence>
      {/* Input Form - Wider */}
      <div className="flex items-center gap-3 mt-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 items-center px-4 py-2 bg-white/30 backdrop-blur-md rounded-full shadow-lg border border-white/20"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-w-[200px] md:min-w-[350px] lg:min-w-[500px] px-4 py-3 rounded-full bg-white/30 backdrop-blur-md text-gray-900 placeholder-gray-500 focus:outline-none text-lg border-none"
            placeholder="Ask me anything!"
            disabled={isLoading}
            maxLength={200}
          />
          <button
            type="submit"
            className="ml-2 w-11 h-11 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-white/30 hover:bg-white/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            disabled={isLoading || !input.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
        <button
          type="button"
          onClick={handleClearChat}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-white/30 hover:bg-white/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          disabled={isLoading || messages.length === 0}
          aria-label="Clear chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <rect x="5" y="6" width="14" height="14" rx="2" />
            <line x1="9" y1="10" x2="15" y2="16" />
            <line x1="15" y1="10" x2="9" y2="16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
