import RaceDetailPage from "@/components/RaceDetailPage";

export const dynamic = "force-dynamic";

export default async function OficialGobernadorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <RaceDetailPage
      raceId={id}
      resultType="oficial"
      backHref="/oficial"
    />
  );
}
