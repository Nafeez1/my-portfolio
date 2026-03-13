import BackgroundParticles from './BackgroundParticles';
import CustomCursor from './CustomCursor';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black-dark relative overflow-hidden">
      <CustomCursor />
      <BackgroundParticles />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
