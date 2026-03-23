import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { contact } from "../data/portfolio";

const socialIcons = {
  github: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  code: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 4l-4 4 4 4 4-4" />
    </svg>
  ),
};

function FloatingInput({ label, name, type = "text", required = false }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  return (
    <div className="relative pt-6">
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setFilled(e.target.value !== ""); }}
        className="w-full bg-transparent border-b-2 px-0 py-2 text-white placeholder-transparent transition-all focus:outline-none"
        style={{ borderColor: focused ? '#FFD700' : 'rgba(255,215,0,0.2)' }}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="absolute left-0 text-sm font-medium cursor-text transition-all duration-200 pointer-events-none"
        style={{
          top: focused || filled ? '-4px' : '28px',
          fontSize: focused || filled ? '0.75rem' : '0.875rem',
          color: focused ? '#FFD700' : '#B0B0B0',
        }}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, name, required = false }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  return (
    <div className="relative pt-6">
      <textarea
        id={name}
        name={name}
        required={required}
        rows={4}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setFilled(e.target.value !== ""); }}
        className="w-full bg-transparent rounded-lg px-4 py-3 text-white placeholder-transparent transition-all focus:outline-none"
        style={{ border: `1px solid ${focused ? '#FFD700' : 'rgba(255,215,0,0.2)'}` }}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="absolute left-4 text-sm font-medium cursor-text transition-all duration-200 pointer-events-none"
        style={{
          top: focused || filled ? '-4px' : '28px',
          fontSize: focused || filled ? '0.75rem' : '0.875rem',
          color: focused ? '#FFD700' : '#B0B0B0',
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ status: "idle", message: "" });
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ status: "sending", message: "" });
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setFormState({ status: "error", message: "Email not configured. Add VITE_EMAILJS_* to .env" });
      return;
    }
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setFormState({ status: "success", message: "✨ Message sent! I'll get back to you soon." });
      formRef.current.reset();
      setTimeout(() => setFormState({ status: "idle", message: "" }), 5000);
    } catch (error) {
      setFormState({ status: "error", message: `Failed to send: ${error.text || error.message || "Please try again."}` });
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#0B0B0B' }}>
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full blur-3xl" style={{ background: 'rgba(255,215,0,0.05)' }} />
      <div className="absolute top-20 left-10 h-96 w-96 rounded-full blur-3xl" style={{ background: 'rgba(255,215,0,0.03)' }} />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FFD700' }}>
            Get In Touch
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#B0B0B0' }}>
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card"
        >
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold" style={{ color: '#FFD700' }}>Contact Details</h3>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-4 group p-3 rounded-lg transition-colors" style={{ color: '#E0E0E0' }}>
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="text-xs" style={{ color: '#8A8F98' }}>Email</p>
                  <p className="font-medium" style={{ color: '#FFD700' }}>{contact.email}</p>
                </div>
              </a>
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-4 p-3 rounded-lg transition-colors" style={{ color: '#E0E0E0' }}>
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-xs" style={{ color: '#8A8F98' }}>Phone</p>
                    <p className="font-medium" style={{ color: '#FFD700' }}>{contact.phone}</p>
                  </div>
                </a>
              )}
              {contact.location && (
                <div className="flex items-center gap-4 p-3 rounded-lg" style={{ color: '#E0E0E0' }}>
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-xs" style={{ color: '#8A8F98' }}>Location</p>
                    <p className="font-medium">{contact.location}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                {contact.social.map((s) => (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border transition-all"
                    style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}
                    whileHover={{ scale: 1.1, y: -4, boxShadow: '0 0 20px rgba(255,215,0,0.4)' }}
                    aria-label={s.name}
                  >
                    {socialIcons[s.icon] || socialIcons.code}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <FloatingInput label="Full Name" name="from_name" required />
              <FloatingInput label="Email Address" name="from_email" type="email" required />
              <FloatingTextarea label="Your Message" name="message" required />

              <AnimatePresence>
                {formState.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm p-3 rounded-lg"
                    style={{
                      background: formState.status === "error" ? 'rgba(220,38,38,0.1)' : 'rgba(22,163,74,0.1)',
                      color: formState.status === "error" ? '#f87171' : '#4ade80',
                    }}
                  >
                    {formState.message}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={formState.status === "sending"}
                className="btn-gold w-full"
                style={{ opacity: formState.status === "sending" ? 0.6 : 1 }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {formState.status === "sending" ? "Sending..." : "Send Message ✨"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
