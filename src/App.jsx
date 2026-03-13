import Layout from "./components/Layout";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Chatbot from "./components/Chatbot";
import { motion } from "framer-motion";

function App() {
  return (
    <Layout>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-t border-gold-primary/20 bg-black-surface/50 backdrop-blur-sm py-12 text-center"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-text-secondary text-sm font-medium">
            Mohamed Nafeez S · Premium Creative Portfolio
          </p>
          <p className="text-text-tertiary text-xs mt-3">
            Crafted with luxury design • Powered by React, Three.js & Framer Motion
          </p>
          <p className="text-text-tertiary/50 text-xs mt-4">
            © {new Date().getFullYear()} · Designed for impact, built for performance
          </p>
        </div>
      </motion.footer>
      <Chatbot />
    </Layout>
  );
}

export default App;
