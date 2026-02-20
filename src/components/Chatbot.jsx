import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PORTFOLIO_ANSWERS = {
  who: "Mohamed Nafeez S is a Front End Developer with experience in deep learning projects, assistive tools, and safety apps.",
  skills:
    "Programming: Java, Python, C, JavaScript, HTML & CSS. Technologies: MySQL, MongoDB, Power BI, Excel. Web: React, front end development.",
  projects:
    "Notable projects: Cervical Cancer Detection (Deep Learning), Assistive Reading Tool for Dyslexia, and Haven Path (safety & navigation app).",
  experience:
    "B.Tech from Sri Manakula Vinayagar Engineering College (Puducherry). HSC from Al Hudha Matric (Trichy), SSLC from Aditya Vivekananda (Villupuram).",
  contact:
    "Email: nafeezdeveloper@gmail.com. Phone: 6380225223. Location: Villupuram, Tamil Nadu. LinkedIn: linkedin.com/in/nafeez-s-836636377.",
  education: "B.Tech (09/2023 – Present, CGPA 6.57), HSC (68.13%), SSLC.",
  certificates:
    "NPTEL Programming in Java (80%, Silver Badge), Cohort Data Analytics Process Automation, Python for Data Science (NPTEL).",
  achievements:
    "NPTEL Java Silver Badge; 1st prize at Tamil Nadu Science Fair for E-Commerce Website.",
  default:
    "I can share details about Mohamed Nafeez's background, skills, projects, experience, and contact. What would you like to know?",
};

function getReply(input) {
  const q = input.toLowerCase().trim();
  if (!q || q.length < 2) return PORTFOLIO_ANSWERS.default;
  if (q.includes("who") || q.includes("about") || q.includes("nafeez")) return PORTFOLIO_ANSWERS.who;
  if (q.includes("skill") || q.includes("tech") || q.includes("stack")) return PORTFOLIO_ANSWERS.skills;
  if (q.includes("project")) return PORTFOLIO_ANSWERS.projects;
  if (q.includes("experience") || q.includes("work") || q.includes("job")) return PORTFOLIO_ANSWERS.experience;
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("linkedin")) return PORTFOLIO_ANSWERS.contact;
  if (q.includes("education") || q.includes("degree") || q.includes("college")) return PORTFOLIO_ANSWERS.education;
  if (q.includes("certificate") || q.includes("certification")) return PORTFOLIO_ANSWERS.certificates;
  if (q.includes("achievement") || q.includes("award") || q.includes("prize")) return PORTFOLIO_ANSWERS.achievements;
  return "I can only answer questions about Mohamed Nafeez's portfolio.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Ask me anything about Mohamed Nafeez's portfolio." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [proximity, setProximity] = useState(0);
  const bottomRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getReply(text) }]);
      setTyping(false);
    }, 600);
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const d = Math.hypot(e.clientX - cx, e.clientY - cy);
      setProximity(Math.max(0, 1 - d / 120));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border-2 border-navy bg-gradient-to-br from-navy to-[#2D3E5F] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
        style={{
          transform: `scale(${1 + proximity * 0.05})`,
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] overflow-hidden rounded-card border border-border bg-white shadow-card-hover"
          >
            <div className="border-b border-border px-4 py-3">
              <h3 className="font-sans text-sm font-semibold text-navy">
                Portfolio Q&A
              </h3>
              <p className="text-xs text-warmGray">Ask about Mohamed Nafeez</p>
            </div>
            <div className="max-h-[320px] space-y-4 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`max-w-[85%] rounded-card px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-navy text-white"
                        : "border border-border text-body"
                    }`}
                  >
                    {m.text}
                  </span>
                </motion.div>
              ))}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <span className="flex gap-1 rounded-card border border-border px-3 py-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-warmGray" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-warmGray" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-warmGray" style={{ animationDelay: "300ms" }} />
                  </span>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
            <form onSubmit={handleSubmit} className="border-t border-border p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about portfolio…"
                className="w-full rounded-card border border-border bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-navy focus:outline-none"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
