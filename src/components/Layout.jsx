import BackgroundParticles from './BackgroundParticles';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      <BackgroundParticles />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
