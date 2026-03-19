import RaceDetailPage from "@/components/RaceDetailPage";

export const dynamic = "force-dynamic";

export default async function BUAlcaldePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <RaceDetailPage
      raceId={id}
      resultType="boca-de-urna"
      backHref="/boca-de-urna"
    />
  );
}
