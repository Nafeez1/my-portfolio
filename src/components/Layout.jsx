export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-cream">
      <div className="grain" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
