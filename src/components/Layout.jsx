import CustomCursor from "./CustomCursor";

export default function Layout({ children }) {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background-main">
        {/* Content */}
        <div className="relative">
          {children}
        </div>
      </div>
    </>
  );
}
