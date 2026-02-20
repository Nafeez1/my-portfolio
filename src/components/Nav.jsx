import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed left-0 right-0 top-0 z-40 border-b transition-all duration-300 ${
        scrolled ? "border-border bg-white/95 backdrop-blur-sm shadow-sm" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a
          href="#hero"
          className="font-sans text-lg font-medium text-navy no-underline transition-colors hover:text-navy/90"
        >
          Nafeez Portfolio
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-body no-underline after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-navy after:transition-[width] after:duration-200 hover:text-ink hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span
            className="block h-px w-5 bg-ink transition-transform"
            style={{ transform: open ? "rotate(45deg) translate(2px, 2px)" : "none" }}
          />
          <span className="block h-px w-5 bg-ink" style={{ opacity: open ? 0 : 1 }} />
          <span
            className="block h-px w-5 bg-ink transition-transform"
            style={{ transform: open ? "rotate(-45deg) translate(2px, -2px)" : "none" }}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-t border-border bg-white md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block py-3 text-sm font-medium text-body no-underline transition-colors hover:text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
