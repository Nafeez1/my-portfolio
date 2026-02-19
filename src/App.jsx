import { useState, useMemo } from "react";
import Layout from "./components/Layout";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import { useReducedMotion } from "./hooks/useReducedMotion";

function App() {
  const { disable3D: systemPrefersNo3D } = useReducedMotion();
  const [userToggle3D, setUserToggle3D] = useState(null);

  const enable3D = useMemo(() => {
    if (userToggle3D !== null) return userToggle3D;
    return !systemPrefersNo3D;
  }, [userToggle3D, systemPrefersNo3D]);

  return (
    <Layout>
      <Nav
        enable3D={enable3D}
        onToggle3D={() => setUserToggle3D((v) => (v === null ? !enable3D : !v))}
      />
      <main className="relative">
        <Hero enable3D={enable3D} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="relative py-8 text-center" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb' }}>
        <p className="text-sm" style={{ color: '#6b7280' }}>
          Built with <span className="font-medium" style={{ color: '#2563eb' }}>React</span>, <span className="font-medium" style={{ color: '#2563eb' }}>Three.js</span> & <span className="font-medium" style={{ color: '#2563eb' }}>Framer Motion</span>
        </p>
      </footer>
    </Layout>
  );
}

export default App;
