import Link from "next/link";
import { ResultType } from "@/lib/types";

export default function Header({ currentVersion }: { currentVersion?: ResultType }) {
  return (
    <header className="bg-[var(--color-elpost-secondary)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              e/POST
            </span>
          </Link>
          <div className="text-right">
            <h1 className="text-sm font-semibold opacity-80">
              Elecciones Subnacionales 2026
            </h1>
            <p className="text-xs opacity-60">22 de marzo</p>
          </div>
        </div>
      </div>

      {/* Pestañas de versión */}
      <nav className="bg-[var(--color-elpost-primary)]">
        <div className="max-w-7xl mx-auto px-4 flex">
          <Link
            href="/boca-de-urna"
            className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              currentVersion === "boca-de-urna"
                ? "border-white text-white"
                : "border-transparent text-white/60 hover:text-white/80"
            }`}
          >
            Boca de Urna
          </Link>
          <Link
            href="/oficial"
            className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              currentVersion === "oficial"
                ? "border-white text-white"
                : "border-transparent text-white/60 hover:text-white/80"
            }`}
          >
            Resultados Oficiales
          </Link>
        </div>
      </nav>
    </header>
  );
}
