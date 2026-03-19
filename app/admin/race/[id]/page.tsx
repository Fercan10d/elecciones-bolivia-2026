import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import VoteEntryForm from "./VoteEntryForm";
import { RaceWithCandidates } from "@/lib/types";
import Link from "next/link";

export default async function RaceResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: race } = await supabase
    .from("races")
    .select("*, candidates(*)")
    .eq("id", id)
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
        {race.type === "gobernador" ? "Gobernador" : "Alcalde"} —{" "}
        {race.location_name}
      </h1>
      <p className="text-sm text-[var(--color-elpost-muted)] mb-6">
        Ingresa los votos de cada candidato y el progreso de actas
      </p>

      <VoteEntryForm race={race as RaceWithCandidates} />
    </div>
  );
}
