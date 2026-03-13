import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotAnswers } from "../data/portfolio";

function getReply(input) {
  const q = input.toLowerCase().trim();
  if (!q || q.length < 2) return chatbotAnswers.default;
  if (q.includes("who") || q.includes("about") || q.includes("nafeez")) return chatbotAnswers.who;
  if (q.includes("skill") || q.includes("tech") || q.includes("stack")) return chatbotAnswers.skills;
  if (q.includes("project")) return chatbotAnswers.projects;
  if (q.includes("experience") || q.includes("work") || q.includes("job")) return chatbotAnswers.experience;
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("linkedin")) return chatbotAnswers.contact;
  if (q.includes("education") || q.includes("degree") || q.includes("college")) return chatbotAnswers.education;
  if (q.includes("certificate") || q.includes("certification")) return chatbotAnswers.certificates;
  if (q.includes("achievement") || q.includes("award") || q.includes("prize")) return chatbotAnswers.achievements;
  return chatbotAnswers.default;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "✨ Welcome! Ask me anything about my skills, projects, and more.", id: 0 },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [proximity, setProximity] = useState(0);
  const bottomRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setInput("");
    const userMsg = { role: "user", text, id: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);

    setTimeout(() => {
      const botMsg = { role: "bot", text: getReply(text), id: Date.now() + 1 };
      setMessages((m) => [...m, botMsg]);
      setTyping(false);
    }, 500);
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
      {/* Floating Chatbot Button */}
      <motion.button
        ref={buttonRef}
        type="button"
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold text-black-dark shadow-glow-lg transition-all hover:shadow-glow-xl font-semibold text-lg"
        style={{
          transform: `scale(${1 + proximity * 0.08})`,
          boxShadow: `0 0 ${20 + proximity * 30}px rgba(255, 215, 0, ${0.3 + proximity * 0.3})`,
        }}
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          animate={open ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          💬
        </motion.span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setOpen(false)}
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed bottom-24 right-6 z-50 w-full max-w-sm overflow-hidden rounded-2xl shadow-glow-xl"
            >
              <div className="relative flex flex-col h-[500px] bg-black-card/95 border border-gold-primary/40 backdrop-blur-xl">
                {/* Header */}
                <div className="relative px-6 py-4 border-b border-gold-primary/20 bg-gradient-to-r from-gold-primary/10 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">Portfolio Assistant</h3>
                      <p className="text-xs text-text-secondary">Ask about my work</p>
                    </div>
                    <motion.button
                      type="button"
                      className="text-text-secondary hover:text-text-primary transition-colors"
                      onClick={() => setOpen(false)}
                      whileHover={{ rotate: 90 }}
                    >
                      ✕
                    </motion.button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.role === "user"
                              ? "bg-gold-primary text-black-dark font-medium"
                              : "bg-gold-primary/10 text-text-secondary border border-gold-primary/20"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {typing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gold-primary/10 text-text-secondary border border-gold-primary/20 px-4 py-2 rounded-lg">
                        <div className="flex gap-1">
                          <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6 }}>
                            •
                          </motion.span>
                          <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay: 0.1 }}>
                            •
                          </motion.span>
                          <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay: 0.2 }}>
                            •
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="border-t border-gold-primary/20 p-4 bg-black-surface/50">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me something..."
                      className="flex-1 bg-black-card/70 border border-gold-primary/20 rounded-lg px-3 py-2 text-sm text-white placeholder-text-tertiary transition-all focus:outline-none focus:border-gold-primary focus:shadow-glow-sm"
                    />
                    <motion.button
                      type="submit"
                      disabled={!input.trim()}
                      className="bg-gold-primary text-black-dark hover:shadow-glow-md disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
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
