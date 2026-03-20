import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import RaceCard from "@/components/RaceCard";
import RealtimeListener from "@/components/RealtimeListener";
import { RaceWithCandidates } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

interface RaceDetailPageProps {
  raceId: string;
}

export default async function RaceDetailPage({
  raceId,
}: RaceDetailPageProps) {
  const supabase = await createClient();

  const { data: race } = await supabase
    .from("races")
    .select("*, candidates(*)")
    .eq("id", raceId)
    .single();

  if (!race) notFound();

  return (
    <>
      <RealtimeListener />
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <Link
          href="/"
          className="text-sm text-[var(--color-elpost-primary)] hover:underline mb-4 inline-block"
        >
          &larr; Volver a resultados
        </Link>
        <RaceCard race={race as RaceWithCandidates} />
      </main>
    </>
  );
}
