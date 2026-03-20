export interface Department {
  id: string;
  name: string;
  capital: string;
  display_order: number;
}

export interface Race {
  id: string;
  department_id: string;
  type: "gobernador" | "alcalde";
  location_name: string;
  votes_counted: number;
  votos_blancos: number;
  votos_nulos: number;
  total_eligible: number;
  actas_counted: number;
  actas_total: number;
  updated_at: string;
  candidates?: Candidate[];
}

export interface Candidate {
  id: number;
  race_id: string;
  candidate_name: string;
  party_name: string;
  party_acronym: string | null;
  party_color: string;
  photo_url: string | null;
  votes: number;
  display_order: number;
  created_at: string;
}

export interface RaceWithCandidates extends Race {
  candidates: Candidate[];
}
