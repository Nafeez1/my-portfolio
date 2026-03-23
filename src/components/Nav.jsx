import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Education" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Active section detection
      const sections = links.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed left-0 right-0 top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-gold-primary/20 bg-black-dark/85 backdrop-blur-md shadow-elevation-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#hero"
          className="font-serif text-base font-semibold text-gold-primary no-underline hover:text-gold-highlight transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-gold-primary rounded-full animate-goldPulse" />
          MN
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative text-xs font-semibold uppercase tracking-wider no-underline transition-colors
                  after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold-primary after:transition-[width] after:duration-300
                  ${active === l.href
                    ? "text-gold-primary after:w-full"
                    : "text-text-secondary hover:text-gold-primary after:w-0 hover:after:w-full"
                  }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume CTA */}
        <a
          href="/resume.pdf"
          download="Mohamed_Nafeez_Resume.pdf"
          className="hidden md:inline-flex btn-glass text-xs px-4 py-2"
        >
          Resume ↓
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-px w-5 bg-gold-primary transition-all duration-300"
              style={{
                transform:
                  i === 0 && open ? "rotate(45deg) translate(2px, 2px)"
                  : i === 2 && open ? "rotate(-45deg) translate(2px, -2px)"
                  : "none",
                opacity: i === 1 && open ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-gold-primary/20 bg-black-dark/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`block py-3 text-sm font-medium no-underline transition-colors ${
                      active === l.href ? "text-gold-primary" : "text-text-secondary hover:text-gold-primary"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/resume.pdf"
                  download="Mohamed_Nafeez_Resume.pdf"
                  className="btn-secondary text-xs w-full text-center block"
                  onClick={() => setOpen(false)}
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
