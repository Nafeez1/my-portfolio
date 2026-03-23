import { motion } from "framer-motion";
import Layout from "./components/Layout";
import Nav from "./components/Nav";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <>
      <LoadingScreen />
      <Layout>
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
        </main>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="border-t border-gold-primary/20 bg-black-surface/50 backdrop-blur-sm py-12"
        >
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-text-secondary text-sm font-medium">
                Mohamed Nafeez S &mdash; Front End Developer
              </p>
              <p className="text-text-tertiary text-xs mt-1">
                Villupuram, Tamil Nadu, India
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/Nafeez1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-gold-primary transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/nafeez-s-836636377"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-gold-primary transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="mailto:nafeezdeveloper@gmail.com"
                className="text-text-secondary hover:text-gold-primary transition-colors text-sm"
              >
                Email
              </a>
            </div>

            <p className="text-text-tertiary/60 text-xs">
              &copy; {new Date().getFullYear()} Mohamed Nafeez S
            </p>
          </div>
        </motion.footer>

        <Chatbot />
        <ScrollToTop />
      </Layout>
    </>
  );
}

export default App;
