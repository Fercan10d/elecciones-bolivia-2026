"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateRaceProgress(
  raceId: string,
  data: {
    actas_counted: number;
    actas_total: number;
    votes_counted: number;
  }
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("races")
    .update(data)
    .eq("id", raceId);

  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function bulkUpdateVotes(
  raceId: string,
  updates: { candidateId: number; votes: number }[],
  raceData?: {
    actas_counted: number;
    actas_total: number;
    votos_blancos: number;
    votos_nulos: number;
  }
) {
  const supabase = await createClient();

  // Update each candidate's votes
  for (const update of updates) {
    const { error } = await supabase
      .from("candidates")
      .update({ votes: update.votes })
      .eq("id", update.candidateId);

    if (error) return { success: false, error: error.message };
  }

  // Calculate total valid votes (sin blancos ni nulos) and update race
  const totalVotes = updates.reduce((sum, u) => sum + u.votes, 0);
  const raceUpdate: Record<string, number> = { votes_counted: totalVotes };
  if (raceData) {
    raceUpdate.actas_counted = raceData.actas_counted;
    raceUpdate.actas_total = raceData.actas_total;
    raceUpdate.votos_blancos = raceData.votos_blancos;
    raceUpdate.votos_nulos = raceData.votos_nulos;
  }

  const { error: raceError } = await supabase
    .from("races")
    .update(raceUpdate)
    .eq("id", raceId);

  if (raceError) return { success: false, error: raceError.message };

  revalidatePath("/");
  return { success: true };
}

export async function addCandidate(
  raceId: string,
  data: {
    candidate_name: string;
    party_name: string;
    party_acronym?: string;
    party_color: string;
    photo_url?: string;
  }
) {
  const supabase = await createClient();
  const { error } = await supabase.from("candidates").insert({
    race_id: raceId,
    candidate_name: data.candidate_name,
    party_name: data.party_name,
    party_acronym: data.party_acronym || null,
    party_color: data.party_color,
    photo_url: data.photo_url || null,
    votes: 0,
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function updateCandidate(
  candidateId: number,
  data: {
    candidate_name: string;
    party_name: string;
    party_acronym?: string;
    party_color: string;
    photo_url?: string;
  }
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("candidates")
    .update({
      candidate_name: data.candidate_name,
      party_name: data.party_name,
      party_acronym: data.party_acronym || null,
      party_color: data.party_color,
      photo_url: data.photo_url || null,
    })
    .eq("id", candidateId);

  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function deleteCandidate(candidateId: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("candidates")
    .delete()
    .eq("id", candidateId);

  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}
