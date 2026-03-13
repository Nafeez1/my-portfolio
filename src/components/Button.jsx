import { motion } from "framer-motion";

export function PrimaryButton({ children, ...props }) {
  return (
    <motion.a
      whileHover={{ y: -4, boxShadow: "0 0 30px rgba(255, 215, 0, 0.5)" }}
      whileTap={{ y: -2 }}
      className="btn-primary group"
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function SecondaryButton({ children, ...props }) {
  return (
    <motion.a
      whileHover={{ bg: "rgba(255, 215, 0, 0.1)", boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}
      whileTap={{ scale: 0.98 }}
      className="btn-secondary"
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function GlassButton({ children, ...props }) {
  return (
    <motion.a
      whileHover={{ y: -2, backgroundColor: "rgba(255, 215, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
      className="btn-glass"
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function MagneticButton({ children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="btn-base bg-gold-primary text-black-dark hover:shadow-glow-lg"
      {...props}
    >
      {children}
    </motion.button>
  );
}
