import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Race } from "@/lib/types";
import { getActasPercentage } from "@/lib/utils";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: races } = await supabase
    .from("races")
    .select("*, candidates(count)")
    .order("location_name");

  const allRaces = (races || []) as (Race & {
    candidates: [{ count: number }];
  })[];

  const gobernadores = allRaces.filter((r) => r.type === "gobernador");
  const alcaldes = allRaces.filter((r) => r.type === "alcalde");

  function RaceRow({
    race,
  }: {
    race: Race & { candidates: [{ count: number }] };
  }) {
    const candidateCount = race.candidates?.[0]?.count || 0;
    const actasPct = getActasPercentage(race.actas_counted, race.actas_total);
    const typeLabel = race.type === "gobernador" ? "Gob." : "Alc.";

    return (
      <div className="flex items-center justify-between bg-white rounded-lg border border-gray-100 px-4 py-3 hover:shadow-sm transition">
        <div>
          <h3 className="font-semibold text-[var(--color-elpost-secondary)]">
            <span className="text-xs text-[var(--color-elpost-muted)] font-normal mr-1">
              {typeLabel}
            </span>
            {race.location_name}
          </h3>
          <p className="text-xs text-[var(--color-elpost-muted)]">
            {candidateCount} candidatos
            {race.actas_total > 0 && ` · ${actasPct}% actas`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/candidates/${race.id}`}
            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition"
          >
            Candidatos
          </Link>
          <Link
            href={`/admin/race/${race.id}`}
            className="text-xs bg-[var(--color-elpost-primary)] text-white hover:opacity-90 px-3 py-1.5 rounded-lg transition"
          >
            Resultados
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-elpost-secondary)] mb-6">
        SIREPRE — Elecciones Subnacionales 2026
      </h1>

      {/* Gobernadores */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-[var(--color-elpost-secondary)] flex items-center gap-2">
          <span className="w-1 h-5 bg-[var(--color-elpost-primary)] rounded-full" />
          Gobernadores
        </h2>
        <div className="space-y-2">
          {gobernadores.map((race) => (
            <RaceRow key={race.id} race={race} />
          ))}
        </div>
      </section>

      {/* Alcaldes */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-[var(--color-elpost-secondary)] flex items-center gap-2">
          <span className="w-1 h-5 bg-[var(--color-elpost-primary)] rounded-full" />
          Alcaldes
        </h2>
        <div className="space-y-2">
          {alcaldes.map((race) => (
            <RaceRow key={race.id} race={race} />
          ))}
        </div>
      </section>
    </div>
  );
}
