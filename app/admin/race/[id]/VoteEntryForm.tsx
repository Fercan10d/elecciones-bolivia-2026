"use client";

import { useState } from "react";
import { bulkUpdateVotes } from "@/app/admin/actions";
import { RaceWithCandidates } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function VoteEntryForm({
  race,
}: {
  race: RaceWithCandidates;
}) {
  const router = useRouter();
  const candidates = [...(race.candidates || [])].sort(
    (a, b) => a.display_order - b.display_order || a.id - b.id
  );

  const [votes, setVotes] = useState<Record<number, number>>(
    Object.fromEntries(candidates.map((c) => [c.id, c.votes]))
  );
  const [actasCounted, setActasCounted] = useState(race.actas_counted);
  const [actasTotal, setActasTotal] = useState(race.actas_total);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const updates = candidates.map((c) => ({
      candidateId: c.id,
      votes: votes[c.id] || 0,
    }));

    const result = await bulkUpdateVotes(race.id, updates, {
      actas_counted: actasCounted,
      actas_total: actasTotal,
    });

    if (result.success) {
      setMessage("Resultados guardados correctamente");
      router.refresh();
    } else {
      setMessage(`Error: ${result.error}`);
    }
    setSaving(false);
  }

  if (candidates.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
        <p className="text-[var(--color-elpost-muted)] mb-4">
          No hay candidatos registrados para esta carrera.
        </p>
        <a
          href={`/admin/candidates/${race.id}`}
          className="text-[var(--color-elpost-accent)] hover:underline"
        >
          Agregar candidatos primero
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Progreso de actas */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <h3 className="font-semibold text-sm mb-3">Progreso de actas</h3>
        <div className="flex items-center gap-4">
          <div>
            <label className="text-xs text-[var(--color-elpost-muted)] block mb-1">
              Actas computadas
            </label>
            <input
              type="number"
              min="0"
              value={actasCounted}
              onChange={(e) => setActasCounted(parseInt(e.target.value) || 0)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-32 text-center focus:outline-none focus:ring-2 focus:ring-[var(--color-elpost-accent)]"
            />
          </div>
          <span className="text-lg text-[var(--color-elpost-muted)] mt-5">
            de
          </span>
          <div>
            <label className="text-xs text-[var(--color-elpost-muted)] block mb-1">
              Total de actas
            </label>
            <input
              type="number"
              min="0"
              value={actasTotal}
              onChange={(e) => setActasTotal(parseInt(e.target.value) || 0)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-32 text-center focus:outline-none focus:ring-2 focus:ring-[var(--color-elpost-accent)]"
            />
          </div>
          {actasTotal > 0 && (
            <span className="text-sm font-semibold text-[var(--color-elpost-accent)] mt-5">
              {Math.round((actasCounted / actasTotal) * 100)}%
            </span>
          )}
        </div>
      </div>

      {/* Tabla de votos */}
      <div className="px-6 py-4">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-[var(--color-elpost-muted)] border-b border-gray-100">
              <th className="text-left py-2 font-medium">Candidato</th>
              <th className="text-left py-2 font-medium">Partido</th>
              <th className="text-right py-2 font-medium w-32">Votos</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="border-b border-gray-50 last:border-0"
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    {/* Foto o inicial */}
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      {candidate.photo_url ? (
                        <Image
                          src={candidate.photo_url}
                          alt={candidate.candidate_name}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            backgroundColor: candidate.party_color,
                          }}
                        >
                          {candidate.candidate_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-sm">
                      {candidate.candidate_name}
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: candidate.party_color }}
                    />
                    <span className="text-sm">
                      {candidate.party_acronym || candidate.party_name}
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <input
                    type="number"
                    min="0"
                    value={votes[candidate.id] || 0}
                    onChange={(e) =>
                      setVotes({
                        ...votes,
                        [candidate.id]: parseInt(e.target.value) || 0,
                      })
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-elpost-accent)]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón guardar */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div>
          {message && (
            <p
              className={`text-sm ${message.startsWith("Error") ? "text-red-500" : "text-green-600"}`}
            >
              {message}
            </p>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[var(--color-elpost-accent)] text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar Resultados"}
        </button>
      </div>
    </div>
  );
}
