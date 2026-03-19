export const DEPARTMENTS = [
  { id: "la-paz", name: "La Paz", capital: "La Paz", display_order: 1 },
  { id: "santa-cruz", name: "Santa Cruz", capital: "Santa Cruz de la Sierra", display_order: 2 },
  { id: "cochabamba", name: "Cochabamba", capital: "Cochabamba", display_order: 3 },
  { id: "oruro", name: "Oruro", capital: "Oruro", display_order: 4 },
  { id: "potosi", name: "Potosí", capital: "Potosí", display_order: 5 },
  { id: "chuquisaca", name: "Chuquisaca", capital: "Sucre", display_order: 6 },
  { id: "tarija", name: "Tarija", capital: "Tarija", display_order: 7 },
  { id: "beni", name: "Beni", capital: "Trinidad", display_order: 8 },
  { id: "pando", name: "Pando", capital: "Cobija", display_order: 9 },
] as const;

export const RACES = [
  // Gobernadores
  { id: "gob-la-paz", department_id: "la-paz", type: "gobernador", location_name: "La Paz" },
  { id: "gob-santa-cruz", department_id: "santa-cruz", type: "gobernador", location_name: "Santa Cruz" },
  { id: "gob-cochabamba", department_id: "cochabamba", type: "gobernador", location_name: "Cochabamba" },
  { id: "gob-oruro", department_id: "oruro", type: "gobernador", location_name: "Oruro" },
  { id: "gob-potosi", department_id: "potosi", type: "gobernador", location_name: "Potosí" },
  { id: "gob-chuquisaca", department_id: "chuquisaca", type: "gobernador", location_name: "Chuquisaca" },
  { id: "gob-tarija", department_id: "tarija", type: "gobernador", location_name: "Tarija" },
  { id: "gob-beni", department_id: "beni", type: "gobernador", location_name: "Beni" },
  { id: "gob-pando", department_id: "pando", type: "gobernador", location_name: "Pando" },
  // Alcaldes
  { id: "alc-la-paz", department_id: "la-paz", type: "alcalde", location_name: "La Paz" },
  { id: "alc-santa-cruz", department_id: "santa-cruz", type: "alcalde", location_name: "Santa Cruz de la Sierra" },
  { id: "alc-cochabamba", department_id: "cochabamba", type: "alcalde", location_name: "Cochabamba" },
  { id: "alc-oruro", department_id: "oruro", type: "alcalde", location_name: "Oruro" },
  { id: "alc-potosi", department_id: "potosi", type: "alcalde", location_name: "Potosí" },
  { id: "alc-sucre", department_id: "chuquisaca", type: "alcalde", location_name: "Sucre" },
  { id: "alc-tarija", department_id: "tarija", type: "alcalde", location_name: "Tarija" },
  { id: "alc-trinidad", department_id: "beni", type: "alcalde", location_name: "Trinidad" },
  { id: "alc-cobija", department_id: "pando", type: "alcalde", location_name: "Cobija" },
  { id: "alc-el-alto", department_id: "la-paz", type: "alcalde", location_name: "El Alto" },
] as const;
