import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Race } from "@/lib/types";
import { getActasPercentage } from "@/lib/utils";
import OficialPercentageControl from "./OficialPercentageControl";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: races } = await supabase
    .from("races")
    .select("*, candidates(count)")
    .order("location_name");

  const { data: setting } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "oficial_percentage")
    .single();

  const oficialPercentage = setting?.value || "0";

  const allRaces = (races || []) as (Race & {
    candidates: [{ count: number }];
  })[];

  const bocaDeUrna = allRaces.filter((r) => r.result_type === "boca-de-urna");
  const oficial = allRaces.filter((r) => r.result_type === "oficial");

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

  function RaceSection({ races, title }: { races: typeof allRaces; title: string }) {
    const gobernadores = races.filter((r) => r.type === "gobernador");
    const alcaldes = races.filter((r) => r.type === "alcalde");

    return (
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-[var(--color-elpost-secondary)] flex items-center gap-2">
          <span className="w-1 h-5 bg-[var(--color-elpost-primary)] rounded-full" />
          {title}
        </h2>

        {gobernadores.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-[var(--color-elpost-muted)] mb-2 uppercase tracking-wide">
              Gobernadores
            </h3>
            <div className="space-y-2">
              {gobernadores.map((race) => (
                <RaceRow key={race.id} race={race} />
              ))}
            </div>
          </div>
        )}

        {alcaldes.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-elpost-muted)] mb-2 uppercase tracking-wide">
              Alcaldes
            </h3>
            <div className="space-y-2">
              {alcaldes.map((race) => (
                <RaceRow key={race.id} race={race} />
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-elpost-secondary)] mb-6">
        Elecciones Subnacionales 2026
      </h1>

      <RaceSection races={bocaDeUrna} title="Boca de Urna" />

      {/* Control de porcentaje oficial */}
      <div className="mb-4">
        <OficialPercentageControl currentValue={oficialPercentage} />
      </div>

      <RaceSection races={oficial} title="Resultados Oficiales" />
    </div>
  );
}
