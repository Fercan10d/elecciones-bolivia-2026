import { createClient } from "@/lib/supabase/server";
import RaceSummary from "@/components/RaceSummary";
import { RaceWithCandidates, ResultType } from "@/lib/types";

interface ResultsPageProps {
  resultType: ResultType;
}

export default async function ResultsPage({ resultType }: ResultsPageProps) {
  const supabase = await createClient();

  const { data: races } = await supabase
    .from("races")
    .select("*, candidates(*)")
    .eq("result_type", resultType)
    .order("location_name");

  const allRaces = (races || []) as RaceWithCandidates[];
  const gobernadores = allRaces.filter((r) => r.type === "gobernador");
  const alcaldes = allRaces.filter((r) => r.type === "alcalde");

  const basePath = resultType === "boca-de-urna" ? "/boca-de-urna" : "/oficial";

  // Obtener porcentaje oficial si es la versión oficial
  let oficialPercentage = "0";
  if (resultType === "oficial") {
    const { data: setting } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "oficial_percentage")
      .single();
    oficialPercentage = setting?.value || "0";
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {resultType === "boca-de-urna" && (
        <div className="bg-[var(--color-elpost-light)] border border-[var(--color-elpost-primary)]/20 rounded-lg px-4 py-3 mb-6">
          <p className="text-sm text-[var(--color-elpost-secondary)]">
            <strong>Boca de Urna:</strong> Estos resultados son estimaciones basadas en encuestas a la salida de los centros de votaci&oacute;n. No son resultados oficiales.
          </p>
        </div>
      )}

      {resultType === "oficial" && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-6">
          <p className="text-sm text-[var(--color-elpost-text)] font-medium">
            Datos oficiales al {oficialPercentage}%
          </p>
        </div>
      )}

      {/* Gobernadores */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-[var(--color-elpost-secondary)] mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[var(--color-elpost-primary)] rounded-full" />
          Gobernadores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gobernadores.map((race) => (
            <RaceSummary key={race.id} race={race} basePath={basePath} />
          ))}
        </div>
      </section>

      {/* Alcaldes */}
      <section>
        <h2 className="text-xl font-bold text-[var(--color-elpost-secondary)] mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[var(--color-elpost-primary)] rounded-full" />
          Alcaldes — Ciudades Capitales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alcaldes.map((race) => (
            <RaceSummary key={race.id} race={race} basePath={basePath} />
          ))}
        </div>
      </section>

      <footer className="text-center py-6 text-xs text-[var(--color-elpost-muted)]">
        Datos ingresados manualmente por el equipo de e/POST.
        {resultType === "boca-de-urna"
          ? " Las estimaciones de boca de urna no constituyen resultados oficiales."
          : " Los resultados son preliminares y no oficiales."}
      </footer>
    </main>
  );
}
