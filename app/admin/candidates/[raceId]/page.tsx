import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CandidateManager from "./CandidateManager";
import { RaceWithCandidates } from "@/lib/types";
import Link from "next/link";

export default async function CandidatesPage({
  params,
}: {
  params: Promise<{ raceId: string }>;
}) {
  const { raceId } = await params;
  const supabase = await createClient();

  const { data: race } = await supabase
    .from("races")
    .select("*, candidates(*)")
    .eq("id", raceId)
    .single();

  if (!race) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="text-sm text-[var(--color-elpost-accent)] hover:underline mb-4 inline-block"
      >
        &larr; Volver al panel
      </Link>

      <h1 className="text-2xl font-bold text-[var(--color-elpost-primary)] mb-1">
        Candidatos — {race.type === "gobernador" ? "Gobernador" : "Alcalde"}{" "}
        {race.location_name}
      </h1>
      <p className="text-sm text-[var(--color-elpost-muted)] mb-6">
        Agrega, edita o elimina candidatos para esta carrera
      </p>

      <CandidateManager race={race as RaceWithCandidates} />
    </div>
  );
}
