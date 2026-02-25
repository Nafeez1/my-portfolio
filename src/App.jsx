import Layout from "./components/Layout";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Chatbot from "./components/Chatbot";

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
      <footer className="border-t border-gold-primary/20 bg-dark-surface py-12 text-center">
        <p className="text-text-secondary text-sm">
          Mohamed Nafeez S · Premium 3D Portfolio Platform
        </p>
        <p className="text-text-secondary/50 text-xs mt-2">
          Crafted with luxury design and cutting-edge web technologies
        </p>
      </footer>
      <Chatbot />
    </Layout>
  );
}

export default App;
