import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
};

function FloatingInput({ label, name, type = "text", required = false, ...props }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  return (
    <div className="relative pt-6">
      <motion.input
        id={name}
        name={name}
        type={type}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(e.target.value !== "");
        }}
        className="w-full bg-transparent border-b-2 border-gold-primary/20 px-0 py-2 text-white placeholder-transparent transition-all focus:border-gold-primary focus:outline-none"
        placeholder=" "
        {...props}
      />
      <motion.label
        htmlFor={name}
        className="absolute left-0 top-0 text-sm font-medium text-gold-primary cursor-text"
        animate={{
          y: focused || filled ? -20 : 0,
          scale: focused || filled ? 0.9 : 1,
          color: focused ? "#FFD700" : "#B0B0B0",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
    </div>
  );
}

function FloatingTextarea({ label, name, required = false, ...props }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  return (
    <div className="relative pt-6">
      <motion.textarea
        id={name}
        name={name}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(e.target.value !== "");
        }}
        rows={4}
        className="w-full bg-transparent border border-gold-primary/20 rounded-lg px-4 py-3 text-white placeholder-transparent transition-all focus:border-gold-primary focus:outline-none focus:shadow-glow-sm"
        placeholder=" "
        {...props}
      />
      <motion.label
        htmlFor={name}
        className="absolute left-4 text-sm font-medium text-gold-primary cursor-text pointer-events-none"
        animate={{
          y: focused || filled ? -28 : 12,
          scale: focused || filled ? 0.9 : 1,
          color: focused ? "#FFD700" : "#B0B0B0",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
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
      setFormState({
        status: "error",
        message: "Email not configured. Add VITE_EMAILJS_* to .env",
      });
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setFormState({ status: "success", message: "✨ Message sent successfully! I'll get back to you soon." });
      formRef.current.reset();

      setTimeout(() => {
        setFormState({ status: "idle", message: "" });
      }, 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormState({
        status: "error",
        message: `Failed to send message: ${error.text || error.message || "Please try again."}`,
      });
    }
  };

  return (
    <section id="contact" className="relative border-t border-gold-primary/20 py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gold-primary/5 blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-20 left-10 h-96 w-96 rounded-full bg-gold-primary/3 blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4 text-4xl md:text-5xl font-serif font-bold">
            Let's Create Something Extraordinary
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you. Let's collaborate and bring your vision to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card backdrop-blur-xl border-gold-primary/40"
        >
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-lg font-semibold text-gold-primary mb-4">Get in Touch</h3>
                <p className="text-text-secondary leading-relaxed">
                  I'm always open to new projects and collaborations. Whether you have a question or just want to say hello, feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 group p-3 rounded-lg hover:bg-gold-primary/5 transition-colors"
                >
                  <span className="text-2xl group-hover:text-gold-light transition-colors">✉️</span>
                  <div>
                    <p className="text-sm text-text-secondary">Email</p>
                    <p className="text-gold-primary font-medium group-hover:text-gold-light">
                      {contact.email}
                    </p>
                  </div>
                </a>

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-4 group p-3 rounded-lg hover:bg-gold-primary/5 transition-colors"
                  >
                    <span className="text-2xl group-hover:text-gold-light transition-colors">📞</span>
                    <div>
                      <p className="text-sm text-text-secondary">Phone</p>
                      <p className="text-gold-primary font-medium group-hover:text-gold-light">
                        {contact.phone}
                      </p>
                    </div>
                  </a>
                )}

                {contact.location && (
                  <motion.div
                    className="flex items-center gap-4 p-3 rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-sm text-text-secondary">Location</p>
                      <p className="text-text-primary font-medium">{contact.location}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <p className="text-sm text-gold-primary font-medium mb-4 uppercase tracking-wider">
                  Let's Connect
                </p>
                <div className="flex gap-3">
                  {contact.social.map((s) => (
                    <motion.a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glass p-3 flex items-center justify-center hover:shadow-glow-md"
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={s.name}
                    >
                      {socialIcons[s.icon]}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FloatingInput
                label="Full Name"
                name="from_name"
                required
              />

              <FloatingInput
                label="Email Address"
                name="from_email"
                type="email"
                required
              />

              <FloatingTextarea
                label="Your Message"
                name="message"
                required
              />

              {/* Status Message */}
              <AnimatePresence>
                {formState.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-3 rounded-lg text-sm font-medium ${formState.status === "error"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-green-500/10 text-green-400"
                      }`}
                  >
                    {formState.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={formState.status === "sending"}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {formState.status === "sending" ? (
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    Sending...
                  </motion.span>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { AnimatePresence } from "framer-motion";
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-navy">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-md border border-border bg-cream px-4 py-3 text-body transition-colors focus:border-navy focus:outline-none"
                  placeholder="Your message..."
                />
              </div>
              {formState.message && (
                <p
                  className="text-sm"
                  style={{
                    color: formState.status === "error" ? '#dc2626' : '#16a34a'
                  }}
                >
                  {formState.message}
                </p>
              )}
              <button
                type="submit"
                disabled={formState.status === "sending"}
                className="btn-primary w-full"
                style={{ opacity: formState.status === "sending" ? 0.5 : 1 }}
              >
                {formState.status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
