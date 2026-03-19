import Header from "@/components/Header";
import ResultsPage from "@/components/ResultsPage";
import RealtimeListener from "@/components/RealtimeListener";

export const dynamic = "force-dynamic";

export default function BocaDeUrnaPage() {
  return (
    <>
      <RealtimeListener />
      <Header currentVersion="boca-de-urna" />
      <ResultsPage resultType="boca-de-urna" />
    </>
  );
}
