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
  code: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 4l-4 4 4 4 4-4" />
    </svg>
  ),
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ status: "idle", message: "" });
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ status: "sending", message: "" });

    // EmailJS: set VITE_EMAILJS_* in .env and use your template
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
      setFormState({ status: "success", message: "Message sent successfully! I'll get back to you soon." });
      formRef.current.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormState({ status: "idle", message: "" });
      }, 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormState({ 
        status: "error", 
        message: `Failed to send message: ${error.text || error.message || "Please try again."}` 
      });
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-24" style={{ backgroundColor: '#ffffff' }}>
      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center text-3xl font-semibold"
          style={{ color: '#111827' }}
        >
          Get in Touch
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="card"
        >
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="mb-6" style={{ color: '#44403c' }}>
                Have a project in mind or want to chat? Send a message or reach out on socials.
              </p>
              <div className="space-y-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 font-medium transition-colors"
                  style={{ color: '#0891b2' }}
                  onMouseEnter={(e) => e.target.style.color = '#0e7490'}
                  onMouseLeave={(e) => e.target.style.color = '#0891b2'}
                >
                  <span className="text-2xl">✉️</span>
                  {contact.email}
                </a>
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-3 font-medium transition-colors"
                    style={{ color: '#44403c' }}
                    onMouseEnter={(e) => e.target.style.color = '#0891b2'}
                    onMouseLeave={(e) => e.target.style.color = '#44403c'}
                  >
                    <span className="text-2xl">📞</span>
                    {contact.phone}
                  </a>
                )}
                {contact.location && (
                  <p className="flex items-center gap-3" style={{ color: '#78716c' }}>
                    <span className="text-2xl">📍</span>
                    {contact.location}
                  </p>
                )}
                <div className="flex gap-4">
                  {contact.social.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg transition-all"
                      style={{ 
                        border: '1px solid #e7e5e4',
                        color: '#78716c'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#0891b2';
                        e.currentTarget.style.color = '#0891b2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e7e5e4';
                        e.currentTarget.style.color = '#78716c';
                      }}
                      aria-label={s.name}
                    >
                      {socialIcons[s.icon] || socialIcons.code}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium" style={{ color: '#111827' }}>
                  Name
                </label>
                <input
                  id="name"
                  name="from_name"
                  type="text"
                  required
                  className="w-full rounded-md px-4 py-3"
                  style={{
                    border: '1px solid #e7e5e4',
                    backgroundColor: '#fafaf9',
                    color: '#44403c'
                  }}
                  placeholder="Your name"
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium" style={{ color: '#111827' }}>
                  Email
                </label>
                <input
                  id="email"
                  name="from_email"
                  type="email"
                  required
                  className="w-full rounded-md px-4 py-3"
                  style={{
                    border: '1px solid #e7e5e4',
                    backgroundColor: '#fafaf9',
                    color: '#44403c'
                  }}
                  placeholder="you@example.com"
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium" style={{ color: '#111827' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-md px-4 py-3"
                  style={{
                    border: '1px solid #e7e5e4',
                    backgroundColor: '#fafaf9',
                    color: '#44403c'
                  }}
                  placeholder="Your message..."
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
                />
              </div>
              {formState.message && (
                <p
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
                className="w-full btn-primary"
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
