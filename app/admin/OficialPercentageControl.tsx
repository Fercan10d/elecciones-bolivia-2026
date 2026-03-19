"use client";

import { useState } from "react";
import { updateOficialPercentage } from "./actions";
import { useRouter } from "next/navigation";

export default function OficialPercentageControl({
  currentValue,
}: {
  currentValue: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(currentValue);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setSaving(true);
    setMessage("");
    const result = await updateOficialPercentage(value);
    if (result.success) {
      setMessage("Guardado");
      router.refresh();
    } else {
      setMessage(`Error: ${result.error}`);
    }
    setSaving(false);
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
      <label className="text-sm font-medium text-[var(--color-elpost-secondary)] whitespace-nowrap">
        Datos oficiales al
      </label>
      <input
        type="number"
        min="0"
        max="100"
        step="0.1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-gray-300 rounded-lg px-2 py-1 w-20 text-center text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-elpost-primary)]"
      />
      <span className="text-sm text-[var(--color-elpost-muted)]">%</span>
      <button
        onClick={handleSave}
        disabled={saving}
        className="text-xs bg-[var(--color-elpost-primary)] text-white hover:opacity-90 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
      >
        {saving ? "..." : "Guardar"}
      </button>
      {message && (
        <span
          className={`text-xs ${message.startsWith("Error") ? "text-red-500" : "text-green-600"}`}
        >
          {message}
        </span>
      )}
    </div>
  );
}
