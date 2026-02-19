import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ enable3D, onToggle3D }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-40 transition ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{
        backgroundColor: '#ffffff',
        borderBottom: scrolled ? '1px solid #e7e5e4' : '1px solid transparent'
      }}
    >
      <nav className="container mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="text-lg font-semibold" style={{ color: '#1c1917' }}>
          Portfolio
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-medium transition"
                style={{ color: '#57534e' }}
                onMouseEnter={(e) => e.target.style.color = '#0891b2'}
                onMouseLeave={(e) => e.target.style.color = '#57534e'}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={onToggle3D}
              className="rounded-md px-3 py-1.5 text-xs font-medium transition"
              style={{
                border: '1px solid #e7e5e4',
                color: '#57534e'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#0891b2';
                e.target.style.color = '#0891b2';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e7e5e4';
                e.target.style.color = '#57534e';
              }}
              title={enable3D ? "Disable 3D" : "Enable 3D"}
            >
              {enable3D ? "3D On" : "3D Off"}
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className={`h-0.5 w-6 transition`} style={{ backgroundColor: '#1c1917', transform: open ? 'rotate(45deg) translateY(8px)' : 'none' }} />
          <span className={`h-0.5 w-6 transition`} style={{ backgroundColor: '#1c1917', opacity: open ? 0 : 1 }} />
          <span className={`h-0.5 w-6 transition`} style={{ backgroundColor: '#1c1917', transform: open ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
            style={{
              borderTop: '1px solid #e7e5e4',
              backgroundColor: '#ffffff'
            }}
          >
            <ul className="flex flex-col gap-2 px-6 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block py-2 font-medium transition"
                    style={{ color: '#57534e' }}
                    onMouseEnter={(e) => e.target.style.color = '#0891b2'}
                    onMouseLeave={(e) => e.target.style.color = '#57534e'}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onToggle3D();
                    setOpen(false);
                  }}
                  className="py-2 font-medium transition"
                  style={{ color: '#57534e' }}
                  onMouseEnter={(e) => e.target.style.color = '#0891b2'}
                  onMouseLeave={(e) => e.target.style.color = '#57534e'}
                >
                  {enable3D ? "3D On" : "3D Off"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
