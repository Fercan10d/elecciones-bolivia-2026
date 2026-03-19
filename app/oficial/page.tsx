import Header from "@/components/Header";
import ResultsPage from "@/components/ResultsPage";
import RealtimeListener from "@/components/RealtimeListener";

export const dynamic = "force-dynamic";

export default function OficialPage() {
  return (
    <>
      <RealtimeListener />
      <Header currentVersion="oficial" />
      <ResultsPage resultType="oficial" />
    </>
  );
}
