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
      <footer className="border-t border-border bg-white py-8 text-center">
        <p className="text-sm text-warmGray">
          Mohamed Nafeez S · Front End Developer
        </p>
      </footer>
      <Chatbot />
    </Layout>
  );
}

export default App;
