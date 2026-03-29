export default function Header() {
  return (
    <header className="bg-[var(--color-elpost-secondary)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="https://elpost.com.bo/" className="flex items-center">
            <span className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              e/POST
            </span>
          </a>
          <div className="text-right">
            <h1 className="text-sm font-semibold opacity-80">
              Elecciones Subnacionales 2026
            </h1>
            <p className="text-xs opacity-60">22 de marzo</p>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-elpost-primary)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="px-5 py-2.5 text-sm font-medium text-white">
            SCORC — Resultados Oficiales
          </div>
        </div>
      </div>
    </header>
  );
}
