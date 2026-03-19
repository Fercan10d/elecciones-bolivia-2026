"use client";

import { useState } from "react";
import {
  addCandidate,
  updateCandidate,
  deleteCandidate,
} from "@/app/admin/actions";
import { RaceWithCandidates, Candidate } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CandidateManager({
  race,
}: {
  race: RaceWithCandidates;
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [partyName, setPartyName] = useState("");
  const [partyAcronym, setPartyAcronym] = useState("");
  const [partyColor, setPartyColor] = useState("#3b82f6");
  const [photoUrl, setPhotoUrl] = useState("");

  const candidates = [...(race.candidates || [])].sort(
    (a, b) => a.display_order - b.display_order || a.id - b.id
  );

  function resetForm() {
    setName("");
    setPartyName("");
    setPartyAcronym("");
    setPartyColor("#3b82f6");
    setPhotoUrl("");
    setShowForm(false);
    setEditingId(null);
  }

  function startEdit(c: Candidate) {
    setName(c.candidate_name);
    setPartyName(c.party_name);
    setPartyAcronym(c.party_acronym || "");
    setPartyColor(c.party_color);
    setPhotoUrl(c.photo_url || "");
    setEditingId(c.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const data = {
      candidate_name: name,
      party_name: partyName,
      party_acronym: partyAcronym || undefined,
      party_color: partyColor,
      photo_url: photoUrl || undefined,
    };

    let result;
    if (editingId) {
      result = await updateCandidate(editingId, data);
    } else {
      result = await addCandidate(race.id, data);
    }

    if (result.success) {
      setMessage(editingId ? "Candidato actualizado" : "Candidato agregado");
      resetForm();
      router.refresh();
    } else {
      setMessage(`Error: ${result.error}`);
    }
    setSaving(false);
  }

  async function handleDelete(candidateId: number, candidateName: string) {
    if (!confirm(`¿Eliminar a ${candidateName}?`)) return;

    const result = await deleteCandidate(candidateId);
    if (result.success) {
      setMessage("Candidato eliminado");
      router.refresh();
    } else {
      setMessage(`Error: ${result.error}`);
    }
  }

  return (
    <div className="space-y-6">
      {/* Lista de candidatos existentes */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {candidates.length === 0 ? (
          <p className="px-6 py-8 text-center text-[var(--color-elpost-muted)]">
            No hay candidatos registrados aún
          </p>
        ) : (
          <div className="divide-y divide-gray-50">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="px-6 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {candidate.photo_url ? (
                      <Image
                        src={candidate.photo_url}
                        alt={candidate.candidate_name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: candidate.party_color }}
                      >
                        {candidate.candidate_name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {candidate.candidate_name}
                    </p>
                    <p className="text-xs text-[var(--color-elpost-muted)] flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: candidate.party_color }}
                      />
                      {candidate.party_name}
                      {candidate.party_acronym &&
                        ` (${candidate.party_acronym})`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(candidate)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(candidate.id, candidate.candidate_name)
                    }
                    className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mensaje */}
      {message && (
        <p
          className={`text-sm ${message.startsWith("Error") ? "text-red-500" : "text-green-600"}`}
        >
          {message}
        </p>
      )}

      {/* Formulario */}
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-100 p-6 space-y-4"
        >
          <h3 className="font-semibold text-[var(--color-elpost-primary)]">
            {editingId ? "Editar candidato" : "Nuevo candidato"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[var(--color-elpost-muted)] block mb-1">
                Nombre completo *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-elpost-accent)]"
                required
              />
            </div>
            <div>
              <label className="text-xs text-[var(--color-elpost-muted)] block mb-1">
                Partido / Agrupación *
              </label>
              <input
                type="text"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-elpost-accent)]"
                required
              />
            </div>
            <div>
              <label className="text-xs text-[var(--color-elpost-muted)] block mb-1">
                Sigla del partido
              </label>
              <input
                type="text"
                value={partyAcronym}
                onChange={(e) => setPartyAcronym(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-elpost-accent)]"
                placeholder="Ej: MAS, CC, PDC"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--color-elpost-muted)] block mb-1">
                Color del partido *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={partyColor}
                  onChange={(e) => setPartyColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={partyColor}
                  onChange={(e) => setPartyColor(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-elpost-accent)]"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-[var(--color-elpost-muted)] block mb-1">
                URL de foto (opcional)
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-elpost-accent)]"
                placeholder="https://ejemplo.com/foto.jpg"
              />
              {photoUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <Image
                    src={photoUrl}
                    alt="Preview"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <span className="text-xs text-[var(--color-elpost-muted)]">
                    Vista previa
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-[var(--color-elpost-accent)] text-white font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {saving
                ? "Guardando..."
                : editingId
                  ? "Actualizar"
                  : "Agregar"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-[var(--color-elpost-muted)] hover:text-[var(--color-elpost-primary)] transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="bg-[var(--color-elpost-accent)] text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition"
        >
          + Agregar candidato
        </button>
      )}
    </div>
  );
}
