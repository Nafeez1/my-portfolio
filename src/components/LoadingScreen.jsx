import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0B0B0B" }}
        >
          {/* Animated ring */}
          <div className="relative w-20 h-20 mb-8">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gold-primary/20"
            />
            <motion.div
              className="absolute inset-0 rounded-full border-t-2 border-gold-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-serif font-bold text-gold-primary">MN</span>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-text-secondary text-sm tracking-widest uppercase"
          >
            Mohamed Nafeez S
          </motion.p>

          {/* Progress bar */}
          <div className="mt-6 w-40 h-px bg-gold-primary/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-primary to-gold-highlight"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
