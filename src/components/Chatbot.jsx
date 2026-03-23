import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ANSWERS = {
  who: "Mohamed Nafeez S is a Front End Developer skilled in React, deep learning, and building accessible web experiences.",
  skills: "Skills: Java, Python, C, JavaScript, HTML & CSS, React, MySQL, MongoDB, Power BI, Excel.",
  projects: "Projects: Cervical Cancer Detection (Deep Learning), Assistive Reading Tool for Dyslexia, Haven Path (safety & navigation app).",
  experience: "Education: B.Tech at Sri Manakula Vinayagar Engineering College (CGPA 6.57), HSC 68.13%, SSLC.",
  contact: "Email: nafeezdeveloper@gmail.com | Phone: 6380225223 | Location: Villupuram, Tamil Nadu",
  education: "B.Tech (2023–Present, CGPA 6.57) | HSC 68.13% | SSLC — Villupuram, India",
  certificates: "NPTEL Java (80%, Silver Badge), Cohort Data Analytics, Python for Data Science (NPTEL).",
  achievements: "NPTEL Java Silver Badge (80%) | 1st Prize at Tamil Nadu Science Fair for E-Commerce Website.",
  default: "I can answer questions about skills, projects, education, certificates, achievements, and contact info. What would you like to know?",
};

function getReply(input) {
  const q = input.toLowerCase().trim();
  if (!q || q.length < 2) return ANSWERS.default;
  if (q.includes("who") || q.includes("about") || q.includes("nafeez")) return ANSWERS.who;
  if (q.includes("skill") || q.includes("tech") || q.includes("stack")) return ANSWERS.skills;
  if (q.includes("project")) return ANSWERS.projects;
  if (q.includes("experience") || q.includes("work") || q.includes("job")) return ANSWERS.experience;
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) return ANSWERS.contact;
  if (q.includes("education") || q.includes("degree") || q.includes("college")) return ANSWERS.education;
  if (q.includes("certificate")) return ANSWERS.certificates;
  if (q.includes("achievement") || q.includes("award") || q.includes("prize")) return ANSWERS.achievements;
  return ANSWERS.default;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "✨ Hi! Ask me anything about Mohamed Nafeez's portfolio.", id: 0 },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text, id: Date.now() }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getReply(text), id: Date.now() + 1 }]);
      setTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Gold Chat Button */}
      <motion.button
        type="button"
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
          color: '#000',
          boxShadow: '0 0 30px rgba(255,215,0,0.5)',
        }}
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(255,215,0,0.8)' }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span animate={open ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
          {open ? "✕" : "💬"}
        </motion.span>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-28 right-6 z-50 w-80 overflow-hidden rounded-2xl flex flex-col"
            style={{
              height: '480px',
              background: 'rgba(15,15,15,0.97)',
              border: '1px solid rgba(255,215,0,0.4)',
              boxShadow: '0 0 40px rgba(255,215,0,0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,215,0,0.2)', background: 'rgba(255,215,0,0.05)' }}>
              <div>
                <h3 className="font-semibold text-white text-sm">Portfolio Assistant</h3>
                <p className="text-xs" style={{ color: '#8A8F98' }}>Ask about my work</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors text-lg">✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] px-4 py-2 rounded-xl text-sm leading-relaxed"
                    style={msg.role === "user"
                      ? { background: 'linear-gradient(135deg,#FFD700,#D4AF37)', color: '#000', fontWeight: 500 }
                      : { background: 'rgba(255,215,0,0.08)', color: '#E0E0E0', border: '1px solid rgba(255,215,0,0.15)' }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-4 py-2 rounded-xl flex gap-1" style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.15)' }}>
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.span key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay, repeat: Infinity }} style={{ color: '#FFD700' }}>•</motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 flex gap-2" style={{ borderTop: '1px solid rgba(255,215,0,0.2)' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)' }}
                onFocus={(e) => e.target.style.borderColor = '#FFD700'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,215,0,0.2)'}
              />
              <motion.button
                type="submit"
                disabled={!input.trim()}
                className="px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#FFD700,#D4AF37)', color: '#000' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
