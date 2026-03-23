import { createClient } from "@/lib/supabase/server";
import RaceSummary from "@/components/RaceSummary";
import { RaceWithCandidates } from "@/lib/types";

export default async function ResultsPage() {
  const supabase = await createClient();

  const { data: races } = await supabase
    .from("races")
    .select("*, candidates(*)")
    .order("location_name");

  const allRaces = (races || []) as RaceWithCandidates[];
  const gobernadores = allRaces.filter((r) => r.type === "gobernador");
  const alcaldes = allRaces.filter((r) => r.type === "alcalde");

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-[var(--color-elpost-light)] border border-[var(--color-elpost-primary)]/20 rounded-lg px-4 py-3 mb-6">
        <p className="text-sm text-[var(--color-elpost-secondary)]">
          <strong>SIREPRE:</strong> Sistema de Resultados Electorales Preliminares — Conteo rápido.
        </p>
      </div>

      {/* Gobernadores */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-[var(--color-elpost-secondary)] mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[var(--color-elpost-primary)] rounded-full" />
          Gobernadores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gobernadores.map((race) => (
            <RaceSummary key={race.id} race={race} />
          ))}
        </div>
      </section>

      {/* Alcaldes */}
      <section>
        <h2 className="text-xl font-bold text-[var(--color-elpost-secondary)] mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[var(--color-elpost-primary)] rounded-full" />
          Alcaldes — Ciudades Capitales y El Alto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alcaldes.map((race) => (
            <RaceSummary key={race.id} race={race} />
          ))}
        </div>
      </section>

      <footer className="text-center py-6 text-xs text-[var(--color-elpost-muted)]">
        Datos ingresados manualmente por el equipo de e/POST. Los resultados son preliminares y no oficiales.
      </footer>
    </main>
  );
}
