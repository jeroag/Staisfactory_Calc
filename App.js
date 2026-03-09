/* ===========================
   FICSIT CALC — App.js
   v5.0.0 — Satisfactory 1.0
   =========================== */

// ===========================
// ====== DATA LAYER =========
// ===========================

const EXTRACTORS = {
  miner1:   { name: 'Minero Mk.1',        base: 60  },
  miner2:   { name: 'Minero Mk.2',        base: 120 },
  miner3:   { name: 'Minero Mk.3',        base: 240 },
  oil:      { name: 'Extractor Petróleo', base: 60  },
  water:    { name: 'Extractor de Agua',  base: 120 },
  nitrogen: { name: 'Pozo de Nitrógeno',  base: 60  },
};

// ---- RECETAS PRINCIPALES ----
const RECIPES = {
  // RAW
  iron_ore:          { name: 'Mineral de Hierro',    machine: 'Minero',        inputs: [], outputRate: 60,  isRaw: true },
  copper_ore:        { name: 'Mineral de Cobre',     machine: 'Minero',        inputs: [], outputRate: 60,  isRaw: true },
  limestone:         { name: 'Piedra Caliza',        machine: 'Minero',        inputs: [], outputRate: 60,  isRaw: true },
  coal:              { name: 'Carbón',               machine: 'Minero',        inputs: [], outputRate: 60,  isRaw: true },
  caterium_ore:      { name: 'Mineral Caterium',     machine: 'Minero',        inputs: [], outputRate: 60,  isRaw: true },
  bauxite:           { name: 'Bauxita',              machine: 'Minero',        inputs: [], outputRate: 60,  isRaw: true },
  raw_quartz:        { name: 'Cuarzo',               machine: 'Minero',        inputs: [], outputRate: 60,  isRaw: true },
  sulfur:            { name: 'Azufre',               machine: 'Minero',        inputs: [], outputRate: 60,  isRaw: true },
  sam:               { name: 'SAM',                  machine: 'Minero',        inputs: [], outputRate: 60,  isRaw: true },
  crude_oil:         { name: 'Petróleo Crudo',       machine: 'Extractor',     inputs: [], outputRate: 60,  isRaw: true },
  water:             { name: 'Agua',                 machine: 'Extractor',     inputs: [], outputRate: 120, isRaw: true },
  nitrogen_gas:      { name: 'Gas Nitrógeno',        machine: 'Pozo',          inputs: [], outputRate: 60,  isRaw: true },

  // LINGOTES
  iron_ingot:        { name: 'Lingote de Hierro',    machine: 'Fundidora',     inputs: [{ id: 'iron_ore', rate: 30 }], outputRate: 30 },
  copper_ingot:      { name: 'Lingote de Cobre',     machine: 'Fundidora',     inputs: [{ id: 'copper_ore', rate: 30 }], outputRate: 30 },
  steel_ingot:       { name: 'Lingote de Acero',     machine: 'Fundidora',     inputs: [{ id: 'iron_ore', rate: 45 }, { id: 'coal', rate: 45 }], outputRate: 45 },
  caterium_ingot:    { name: 'Lingote de Caterium',  machine: 'Fundidora',     inputs: [{ id: 'caterium_ore', rate: 45 }], outputRate: 15 },
  // FIX: aluminum_ingot usa alumina_solution + silica (correcto)
  aluminum_ingot:    { name: 'Lingote de Aluminio',  machine: 'Fundidora',     inputs: [{ id: 'alumina_solution', rate: 90 }, { id: 'silica', rate: 5 }], outputRate: 60 },
  // NUEVO: Superalloy Ingot (Satisfactory 1.0)
  superalloy_ingot:  { name: 'Lingote Superaleación',machine: 'Fundidora Cuántica', inputs: [{ id: 'iron_ingot', rate: 45 }, { id: 'reanimated_sam', rate: 7.5 }], outputRate: 37.5 },

  // PIEZAS BÁSICAS
  iron_plate:        { name: 'Plancha de Hierro',    machine: 'Constructora',  inputs: [{ id: 'iron_ingot', rate: 30 }], outputRate: 20 },
  iron_rod:          { name: 'Varilla de Hierro',    machine: 'Constructora',  inputs: [{ id: 'iron_ingot', rate: 15 }], outputRate: 15 },
  wire:              { name: 'Cable (Wire)',          machine: 'Constructora',  inputs: [{ id: 'copper_ingot', rate: 15 }], outputRate: 30 },
  cable:             { name: 'Alambre (Cable)',       machine: 'Constructora',  inputs: [{ id: 'wire', rate: 60 }], outputRate: 30 },
  screw:             { name: 'Tornillo',              machine: 'Constructora',  inputs: [{ id: 'iron_rod', rate: 10 }], outputRate: 40 },
  concrete:          { name: 'Hormigón',             machine: 'Constructora',  inputs: [{ id: 'limestone', rate: 45 }], outputRate: 15 },
  copper_sheet:      { name: 'Lámina de Cobre',      machine: 'Constructora',  inputs: [{ id: 'copper_ingot', rate: 20 }], outputRate: 10 },
  quickwire:         { name: 'Quickwire',            machine: 'Constructora',  inputs: [{ id: 'caterium_ingot', rate: 12 }], outputRate: 60 },
  steel_beam:        { name: 'Viga de Acero',        machine: 'Constructora',  inputs: [{ id: 'steel_ingot', rate: 60 }], outputRate: 15 },
  steel_pipe:        { name: 'Tubería de Acero',     machine: 'Constructora',  inputs: [{ id: 'steel_ingot', rate: 30 }], outputRate: 20 },
  silica:            { name: 'Sílice',               machine: 'Constructora',  inputs: [{ id: 'raw_quartz', rate: 22.5 }], outputRate: 37.5 },
  iron_plate_reinforced: { name: 'Plancha de Hierro',machine: 'Constructora',  inputs: [{ id: 'iron_ingot', rate: 30 }], outputRate: 20 },
  // NUEVO: SAM Fluctuator
  sam_fluctuator:    { name: 'SAM Fluctuator',       machine: 'Ensambladora',  inputs: [{ id: 'reanimated_sam', rate: 6 }, { id: 'wire', rate: 13 }, { id: 'steel_pipe', rate: 3 }], outputRate: 1 },

  // ELECTRÓNICA
  circuit_board:     { name: 'Placa de Circuito',    machine: 'Ensambladora',  inputs: [{ id: 'copper_ingot', rate: 25 }, { id: 'plastic', rate: 25 }], outputRate: 5 },
  ai_limiter:        { name: 'Limitador de IA',      machine: 'Ensambladora',  inputs: [{ id: 'quickwire', rate: 25 }, { id: 'copper_sheet', rate: 10 }], outputRate: 5 },

  // PIEZAS AVANZADAS
  reinforced_plate:  { name: 'Plancha Reforzada',    machine: 'Ensambladora',  inputs: [{ id: 'iron_plate', rate: 30 }, { id: 'screw', rate: 60 }], outputRate: 5 },
  rotor:             { name: 'Rotor',                machine: 'Ensambladora',  inputs: [{ id: 'iron_rod', rate: 20 }, { id: 'screw', rate: 100 }], outputRate: 4 },
  // FIX: stator usa steel_pipe (no steel_ingot) — bug corregido
  stator:            { name: 'Estátor',              machine: 'Ensambladora',  inputs: [{ id: 'steel_pipe', rate: 15 }, { id: 'wire', rate: 40 }], outputRate: 5 },
  motor:             { name: 'Motor',                machine: 'Ensambladora',  inputs: [{ id: 'rotor', rate: 10 }, { id: 'stator', rate: 10 }], outputRate: 5 },
  modular_frame:     { name: 'Marco Modular',        machine: 'Ensambladora',  inputs: [{ id: 'reinforced_plate', rate: 3 }, { id: 'iron_rod', rate: 12 }], outputRate: 2 },
  encased_beam:      { name: 'Viga Encapsulada',     machine: 'Ensambladora',  inputs: [{ id: 'steel_beam', rate: 24 }, { id: 'concrete', rate: 30 }], outputRate: 6 },
  heavy_frame:       { name: 'Marco Pesado',         machine: 'Manufactura',   inputs: [{ id: 'modular_frame', rate: 10 }, { id: 'steel_pipe', rate: 30 }, { id: 'encased_beam', rate: 10 }, { id: 'screw', rate: 200 }], outputRate: 2 },
  computer:          { name: 'Computador',           machine: 'Manufactura',   inputs: [{ id: 'circuit_board', rate: 10 }, { id: 'cable', rate: 9 }, { id: 'plastic', rate: 18 }, { id: 'screw', rate: 52 }], outputRate: 2.5 },
  high_speed_connector: { name: 'Conector Alta Vel.',machine: 'Manufactura',   inputs: [{ id: 'quickwire', rate: 210 }, { id: 'cable', rate: 37.5 }, { id: 'circuit_board', rate: 3.75 }], outputRate: 3.75 },
  // NUEVOS: piezas fase 4
  supercomputer:     { name: 'Supercomputador',      machine: 'Manufactura',   inputs: [{ id: 'computer', rate: 3.75 }, { id: 'ai_limiter', rate: 3.75 }, { id: 'high_speed_connector', rate: 5.625 }, { id: 'plastic', rate: 52.5 }], outputRate: 1.875 },
  radio_control_unit:{ name: 'Unidad Control Radio', machine: 'Manufactura',   inputs: [{ id: 'aluminum_casing', rate: 32 }, { id: 'crystal_oscillator', rate: 2.5 }, { id: 'computer', rate: 2.5 }], outputRate: 2.5 },
  crystal_oscillator:{ name: 'Oscilador Cristal',    machine: 'Manufactura',   inputs: [{ id: 'raw_quartz', rate: 36 }, { id: 'cable', rate: 28 }, { id: 'reinforced_plate', rate: 5 }], outputRate: 2 },
  aluminum_casing:   { name: 'Carcasa Aluminio',     machine: 'Constructora',  inputs: [{ id: 'aluminum_ingot', rate: 90 }], outputRate: 60 },
  ficsite_trigon:    { name: 'Ficsite Trigon',        machine: 'Convertidora',  inputs: [{ id: 'reanimated_sam', rate: 10 }], outputRate: 10 },

  // REFINERÍA
  plastic:           { name: 'Plástico',             machine: 'Refinería',     inputs: [{ id: 'crude_oil', rate: 30 }], outputRate: 20 },
  rubber:            { name: 'Goma',                 machine: 'Refinería',     inputs: [{ id: 'crude_oil', rate: 30 }], outputRate: 20 },
  fuel:              { name: 'Combustible',          machine: 'Refinería',     inputs: [{ id: 'crude_oil', rate: 60 }], outputRate: 40 },
  turbofuel:         { name: 'Turbocombustible',     machine: 'Refinería',     inputs: [{ id: 'fuel', rate: 22.5 }, { id: 'coal', rate: 15 }], outputRate: 18.75 },
  alumina_solution:  { name: 'Solución Alúmina',     machine: 'Refinería',     inputs: [{ id: 'bauxite', rate: 120 }, { id: 'water', rate: 90 }], outputRate: 120 },
  petroleum_coke:    { name: 'Coque de Petróleo',    machine: 'Refinería',     inputs: [{ id: 'crude_oil', rate: 40 }], outputRate: 120 },
  ionized_fuel:      { name: 'Combustible Ionizado', machine: 'Refinería',     inputs: [{ id: 'rocket_fuel', rate: 40 }, { id: 'power_shard', rate: 2 }], outputRate: 40 },

  // MEZCLADORA / BLENDER
  cooling_system:    { name: 'Sistema de Enfriamiento', machine: 'Mezcladora', inputs: [{ id: 'heat_sink', rate: 9 }, { id: 'rubber', rate: 45 }, { id: 'water', rate: 25 }, { id: 'nitrogen_gas', rate: 45 }], outputRate: 6 },
  fused_frame:       { name: 'Marco Fusionado',      machine: 'Mezcladora',    inputs: [{ id: 'heavy_frame', rate: 1.5 }, { id: 'aluminum_ingot', rate: 75 }, { id: 'nitric_acid', rate: 37.5 }, { id: 'fuel', rate: 15 }], outputRate: 1.5 },
  heat_sink:         { name: 'Disipador de Calor',   machine: 'Ensambladora',  inputs: [{ id: 'aluminum_casing', rate: 37.5 }, { id: 'copper_sheet', rate: 22.5 }], outputRate: 7.5 },
  battery:           { name: 'Batería',              machine: 'Mezcladora',    inputs: [{ id: 'sulfuric_acid', rate: 40 }, { id: 'alumina_solution', rate: 40 }, { id: 'aluminum_casing', rate: 20 }], outputRate: 20 },
  rocket_fuel:       { name: 'Combustible Cohete',   machine: 'Mezcladora',    inputs: [{ id: 'turbofuel', rate: 60 }, { id: 'nitric_acid', rate: 10 }], outputRate: 100 },
  nitric_acid:       { name: 'Ácido Nítrico',        machine: 'Mezcladora',    inputs: [{ id: 'nitrogen_gas', rate: 120 }, { id: 'water', rate: 30 }, { id: 'iron_plate', rate: 10 }], outputRate: 30 },
  sulfuric_acid:     { name: 'Ácido Sulfúrico',      machine: 'Refinería',     inputs: [{ id: 'sulfur', rate: 50 }, { id: 'water', rate: 50 }], outputRate: 50 },

  // SAM / FASE 5
  reanimated_sam:    { name: 'SAM Reanimado',        machine: 'Convertidora',  inputs: [{ id: 'sam', rate: 120 }], outputRate: 60 },
  alien_protein:     { name: 'Proteína Alienígena',  machine: 'Constructora',  inputs: [{ id: 'hog_remains', rate: 10 }], outputRate: 10 },
  alien_dna_capsule: { name: 'Cápsula ADN Alienígena', machine: 'Constructora',inputs: [{ id: 'alien_protein', rate: 10 }], outputRate: 10 },
  hog_remains:       { name: 'Restos de Hog',        machine: 'Recolección',   inputs: [], outputRate: 1, isRaw: true },
  power_shard:       { name: 'Power Shard',          machine: 'Recolección',   inputs: [], outputRate: 1, isRaw: true },

  // QUANTUM / FASE 5
  neural_quantum_processor: { name: 'Procesador Neural Cuántico', machine: 'Quantum Encoder', inputs: [{ id: 'timycrystal', rate: 7.5 }, { id: 'supercomputer', rate: 3.75 }, { id: 'ficsite_trigon', rate: 45 }, { id: 'excited_photonic_matter', rate: 25 }], outputRate: 1.875 },
  ai_expansion_server: { name: 'Servidor Expansión IA', machine: 'Manufactura', inputs: [{ id: 'supercomputer', rate: 1.875 }, { id: 'magnetic_field_generator', rate: 0.625 }, { id: 'neural_quantum_processor', rate: 0.9375 }, { id: 'cooling_system', rate: 1.875 }], outputRate: 1.25 },
  magnetic_field_generator: { name: 'Generador Campo Magnético', machine: 'Manufactura', inputs: [{ id: 'versatile_framework', rate: 2.5 }, { id: 'electromagnetic_control_rod', rate: 1 }, { id: 'battery', rate: 5 }], outputRate: 2 },
  versatile_framework: { name: 'Marco Versátil',    machine: 'Manufactura',   inputs: [{ id: 'modular_frame', rate: 2.5 }, { id: 'steel_beam', rate: 30 }], outputRate: 5 },
  electromagnetic_control_rod: { name: 'Varilla Control EM', machine: 'Ensambladora', inputs: [{ id: 'stator', rate: 6 }, { id: 'ai_limiter', rate: 4 }], outputRate: 4 },
  timycrystal:       { name: 'Timycrystal',          machine: 'Constructora',  inputs: [{ id: 'raw_quartz', rate: 60 }], outputRate: 30 },
  excited_photonic_matter: { name: 'Materia Fotónica Excitada', machine: 'Convertidora', inputs: [], outputRate: 10, isRaw: true },
};

// ---- RECETAS ALTERNATIVAS ----
const ALT_RECIPES = {
  iron_ingot: [
    { name: 'Estándar',           isAlt: false, machine: 'Fundidora',    inputs: [{ id: 'iron_ore', rate: 30 }], outputRate: 30 },
    { name: 'Lingote Sólido',     isAlt: true,  machine: 'Fundidora',    inputs: [{ id: 'iron_ore', rate: 35 }, { id: 'coal', rate: 8 }], outputRate: 50 },
    { name: 'Lingote Puro',       isAlt: true,  machine: 'Refinería',    inputs: [{ id: 'iron_ore', rate: 35 }, { id: 'water', rate: 20 }], outputRate: 65 },
  ],
  copper_ingot: [
    { name: 'Estándar',           isAlt: false, machine: 'Fundidora',    inputs: [{ id: 'copper_ore', rate: 30 }], outputRate: 30 },
    { name: 'Cobre Puro',         isAlt: true,  machine: 'Refinería',    inputs: [{ id: 'copper_ore', rate: 15 }, { id: 'water', rate: 10 }], outputRate: 37.5 },
    { name: 'Cobre de Caterium',  isAlt: true,  machine: 'Fundidora',    inputs: [{ id: 'copper_ore', rate: 25 }, { id: 'caterium_ore', rate: 5 }], outputRate: 40 },
  ],
  steel_ingot: [
    { name: 'Estándar',           isAlt: false, machine: 'Fundidora',    inputs: [{ id: 'iron_ore', rate: 45 }, { id: 'coal', rate: 45 }], outputRate: 45 },
    { name: 'Acero Sólido',       isAlt: true,  machine: 'Fundidora',    inputs: [{ id: 'iron_ore', rate: 40 }, { id: 'coal', rate: 40 }], outputRate: 60 },
    { name: 'Acero de Coque',     isAlt: true,  machine: 'Fundidora',    inputs: [{ id: 'iron_ore', rate: 75 }, { id: 'petroleum_coke', rate: 75 }], outputRate: 100 },
  ],
  caterium_ingot: [
    { name: 'Estándar',           isAlt: false, machine: 'Fundidora',    inputs: [{ id: 'caterium_ore', rate: 45 }], outputRate: 15 },
    { name: 'Caterium Puro',      isAlt: true,  machine: 'Refinería',    inputs: [{ id: 'caterium_ore', rate: 24 }, { id: 'water', rate: 24 }], outputRate: 36 },
    { name: 'Caterium Alum.',     isAlt: true,  machine: 'Fundidora',    inputs: [{ id: 'caterium_ore', rate: 30 }, { id: 'copper_ore', rate: 15 }], outputRate: 24 },
  ],
  wire: [
    { name: 'Estándar',           isAlt: false, machine: 'Constructora', inputs: [{ id: 'copper_ingot', rate: 15 }], outputRate: 30 },
    { name: 'Wire de Hierro',     isAlt: true,  machine: 'Constructora', inputs: [{ id: 'iron_ingot', rate: 12.5 }], outputRate: 22.5 },
    { name: 'Wire de Caterium',   isAlt: true,  machine: 'Constructora', inputs: [{ id: 'caterium_ingot', rate: 15 }], outputRate: 120 },
    { name: 'Wire Cable Fus.',    isAlt: true,  machine: 'Ensambladora', inputs: [{ id: 'copper_ingot', rate: 12 }, { id: 'caterium_ingot', rate: 3 }], outputRate: 90 },
  ],
  iron_plate: [
    { name: 'Estándar',           isAlt: false, machine: 'Constructora', inputs: [{ id: 'iron_ingot', rate: 30 }], outputRate: 20 },
    { name: 'Plancha Pulida',     isAlt: true,  machine: 'Refinería',    inputs: [{ id: 'iron_ingot', rate: 37.5 }, { id: 'screw', rate: 75 }], outputRate: 50 },
  ],
  iron_rod: [
    { name: 'Estándar',           isAlt: false, machine: 'Constructora', inputs: [{ id: 'iron_ingot', rate: 15 }], outputRate: 15 },
    { name: 'Varilla de Acero',   isAlt: true,  machine: 'Constructora', inputs: [{ id: 'steel_ingot', rate: 12 }], outputRate: 48 },
  ],
  screw: [
    { name: 'Estándar',           isAlt: false, machine: 'Constructora', inputs: [{ id: 'iron_rod', rate: 10 }], outputRate: 40 },
    { name: 'Tornillo de Acero',  isAlt: true,  machine: 'Constructora', inputs: [{ id: 'steel_beam', rate: 5 }], outputRate: 260 },
    { name: 'Tornillo Forjado',   isAlt: true,  machine: 'Constructora', inputs: [{ id: 'iron_ingot', rate: 50 }], outputRate: 260 },
  ],
  reinforced_plate: [
    { name: 'Estándar',           isAlt: false, machine: 'Ensambladora', inputs: [{ id: 'iron_plate', rate: 30 }, { id: 'screw', rate: 60 }], outputRate: 5 },
    { name: 'Plancha Adhesiva',   isAlt: true,  machine: 'Manufactura',  inputs: [{ id: 'iron_ingot', rate: 18 }, { id: 'rubber', rate: 12 }, { id: 'screw', rate: 6 }], outputRate: 9 },
    { name: 'Plancha de Cobre',   isAlt: true,  machine: 'Ensambladora', inputs: [{ id: 'copper_ingot', rate: 25 }, { id: 'screw', rate: 50 }], outputRate: 10 },
  ],
  rotor: [
    { name: 'Estándar',           isAlt: false, machine: 'Ensambladora', inputs: [{ id: 'iron_rod', rate: 20 }, { id: 'screw', rate: 100 }], outputRate: 4 },
    { name: 'Rotor de Acero',     isAlt: true,  machine: 'Ensambladora', inputs: [{ id: 'steel_pipe', rate: 10 }, { id: 'wire', rate: 30 }], outputRate: 11 },
    { name: 'Rotor Cobre',        isAlt: true,  machine: 'Ensambladora', inputs: [{ id: 'copper_ingot', rate: 56 }, { id: 'screw', rate: 140 }], outputRate: 11 },
  ],
  // FIX: stator estándar usa steel_pipe
  stator: [
    { name: 'Estándar',           isAlt: false, machine: 'Ensambladora', inputs: [{ id: 'steel_pipe', rate: 15 }, { id: 'wire', rate: 40 }], outputRate: 5 },
    { name: 'Estátor Quickwire',  isAlt: true,  machine: 'Ensambladora', inputs: [{ id: 'steel_pipe', rate: 16 }, { id: 'quickwire', rate: 60 }], outputRate: 8 },
  ],
  circuit_board: [
    { name: 'Estándar',           isAlt: false, machine: 'Ensambladora', inputs: [{ id: 'copper_ingot', rate: 25 }, { id: 'plastic', rate: 25 }], outputRate: 5 },
    { name: 'Placa Caterium',     isAlt: true,  machine: 'Ensambladora', inputs: [{ id: 'copper_ingot', rate: 10 }, { id: 'quickwire', rate: 37.5 }], outputRate: 7.5 },
    { name: 'Placa Silicio',      isAlt: true,  machine: 'Ensambladora', inputs: [{ id: 'copper_ingot', rate: 27.5 }, { id: 'silica', rate: 27.5 }], outputRate: 12.5 },
  ],
  motor: [
    { name: 'Estándar',           isAlt: false, machine: 'Ensambladora', inputs: [{ id: 'rotor', rate: 10 }, { id: 'stator', rate: 10 }], outputRate: 5 },
    { name: 'Motor Eléctrico',    isAlt: true,  machine: 'Manufactura',  inputs: [{ id: 'rotor', rate: 6 }, { id: 'stator', rate: 9 }, { id: 'cable', rate: 18 }], outputRate: 12 },
    { name: 'Motor Mag.',         isAlt: true,  machine: 'Manufactura',  inputs: [{ id: 'rotor', rate: 10 }, { id: 'stator', rate: 10 }, { id: 'cable', rate: 30 }], outputRate: 10 },
  ],
  fuel: [
    { name: 'Estándar',           isAlt: false, machine: 'Refinería',    inputs: [{ id: 'crude_oil', rate: 60 }], outputRate: 40 },
    { name: 'Combustible Res.',   isAlt: true,  machine: 'Refinería',    inputs: [{ id: 'heavy_oil_residue', rate: 30 }], outputRate: 40 },
    { name: 'Dilución Fuel',      isAlt: true,  machine: 'Refinería',    inputs: [{ id: 'heavy_oil_residue', rate: 20 }, { id: 'water', rate: 20 }], outputRate: 50 },
  ],
  plastic: [
    { name: 'Estándar',           isAlt: false, machine: 'Refinería',    inputs: [{ id: 'crude_oil', rate: 30 }], outputRate: 20 },
    { name: 'Plástico Reciclado', isAlt: true,  machine: 'Refinería',    inputs: [{ id: 'rubber', rate: 30 }, { id: 'fuel', rate: 30 }], outputRate: 60 },
  ],
  aluminum_ingot: [
    { name: 'Estándar',           isAlt: false, machine: 'Fundidora',    inputs: [{ id: 'alumina_solution', rate: 90 }, { id: 'silica', rate: 5 }], outputRate: 60 },
    { name: 'Aluminio Puro',      isAlt: true,  machine: 'Fundidora',    inputs: [{ id: 'alumina_solution', rate: 100 }, { id: 'silica', rate: 75 }], outputRate: 90 },
  ],
  heavy_frame: [
    { name: 'Estándar',           isAlt: false, machine: 'Manufactura',  inputs: [{ id: 'modular_frame', rate: 10 }, { id: 'steel_pipe', rate: 30 }, { id: 'encased_beam', rate: 10 }, { id: 'screw', rate: 200 }], outputRate: 2 },
    { name: 'Marco Pesado Solido',isAlt: true,  machine: 'Manufactura',  inputs: [{ id: 'modular_frame', rate: 6 }, { id: 'encased_beam', rate: 6 }, { id: 'steel_pipe', rate: 24 }], outputRate: 4 },
  ],
  computer: [
    { name: 'Estándar',           isAlt: false, machine: 'Manufactura',  inputs: [{ id: 'circuit_board', rate: 10 }, { id: 'cable', rate: 9 }, { id: 'plastic', rate: 18 }, { id: 'screw', rate: 52 }], outputRate: 2.5 },
    { name: 'Computador Caterium',isAlt: true,  machine: 'Manufactura',  inputs: [{ id: 'circuit_board', rate: 7.5 }, { id: 'quickwire', rate: 37.5 }, { id: 'rubber', rate: 45 }], outputRate: 2.5 },
  ],
};

// Tabla de nodos del mapa (Update 1.0)
const MAP_NODES = {
  iron_ore:      { impure: 33, normal: 41, pure: 46 },
  copper_ore:    { impure: 9,  normal: 28, pure: 12 },
  limestone:     { impure: 12, normal: 27, pure: 19 },
  coal:          { impure: 6,  normal: 29, pure: 15 },
  caterium_ore:  { impure: 5,  normal: 8,  pure: 8  },
  bauxite:       { impure: 5,  normal: 6,  pure: 5  },
  raw_quartz:    { impure: 5,  normal: 11, pure: 5  },
  sulfur:        { impure: 3,  normal: 7,  pure: 5  },
  sam:           { impure: 0,  normal: 8,  pure: 3  },
  crude_oil:     { impure: 3,  normal: 12, pure: 8  },
  nitrogen_gas:  { impure: 0,  normal: 10, pure: 12 },
};

// ===========================
// ======= UTILS =============
// ===========================
function fmt(n) {
  if (n === undefined || n === null || isNaN(n)) return '0';
  return n % 1 === 0 ? n.toLocaleString('es') : parseFloat(n.toFixed(2)).toLocaleString('es');
}

function syncEff(v)      { document.getElementById('extractorEff').textContent    = v; document.getElementById('extractorEffBig').textContent    = v + '%'; }
function syncMachEff(v)  { document.getElementById('machineEff').textContent      = v; document.getElementById('machineEffBig').textContent      = v + '%'; }
function syncRecEff(v)   { document.getElementById('recipeEff').textContent       = v; document.getElementById('recipeEffBig').textContent       = v + '%'; }
function syncTreeOC(v)   { document.getElementById('treeOC').textContent          = v; document.getElementById('treeOCBig').textContent          = v + '%'; }
function syncFactoryOC(v){ document.getElementById('factoryOC').textContent       = v; }

// ===========================
// ====== EXTRACTOR ==========
// ===========================
function calcExtractor() {
  const extKey     = document.getElementById('extractorType').value;
  const purity     = parseFloat(document.getElementById('purity').value);
  const effE       = parseFloat(document.getElementById('extractorEffRange').value) / 100;
  const machSel    = document.getElementById('targetMachine').value;
  const machEff    = parseFloat(document.getElementById('machineEffRange').value) / 100;

  document.getElementById('customField').style.display = machSel === 'custom' ? 'block' : 'none';

  const baseRate   = EXTRACTORS[extKey].base;
  const realRate   = baseRate * purity * effE;
  const machineRate = machSel === 'custom'
    ? (parseFloat(document.getElementById('customRate').value) || 30)
    : parseFloat(machSel);
  const effMR  = machineRate * machEff;
  const whole  = Math.floor(realRate / effMR);

  document.getElementById('resBaseRate').textContent      = fmt(baseRate * purity);
  document.getElementById('resRealRate').textContent      = fmt(realRate);
  document.getElementById('resPerSec').textContent        = fmt(realRate / 60);
  document.getElementById('resPerHour').textContent       = fmt(realRate * 60);
  document.getElementById('resMachinesWhole').textContent = whole;
  document.getElementById('resMachineRate').textContent   = fmt(effMR);
  document.getElementById('resTotalConsumed').textContent = fmt(whole * effMR);
  document.getElementById('resLeftover').textContent      = fmt(realRate - whole * effMR);
  document.getElementById('warnOverclock').classList.toggle('visible', effMR > realRate);

  // Nodos del mapa
  const extKey2 = extKey === 'miner1' || extKey === 'miner2' || extKey === 'miner3' ? null : null;
  renderChain(EXTRACTORS[extKey].name, whole);
  renderNodeStats(extKey, baseRate, purity);
}

function renderNodeStats(extKey, baseRate, purity) {
  const panel = document.getElementById('nodeStatsPanel');
  const miningExtractors = ['miner1', 'miner2', 'miner3'];
  if (!miningExtractors.includes(extKey)) { panel.style.display = 'none'; return; }

  const resourceSelect = document.getElementById('nodeResource');
  if (!resourceSelect) return;
  const resourceKey = resourceSelect.value;
  const nodes = MAP_NODES[resourceKey];
  if (!nodes) { panel.style.display = 'none'; return; }

  panel.style.display = 'block';
  const mult = extKey === 'miner1' ? 1 : extKey === 'miner2' ? 2 : 4;
  const imp  = nodes.impure  * 30  * mult;
  const nor  = nodes.normal  * 60  * mult;
  const pur  = nodes.pure    * 120 * mult;
  const total = imp + nor + pur;

  document.getElementById('nodeImpure').textContent  = `${nodes.impure} nodos → ${fmt(imp)}/min`;
  document.getElementById('nodeNormal').textContent  = `${nodes.normal} nodos → ${fmt(nor)}/min`;
  document.getElementById('nodePure').textContent    = `${nodes.pure} nodos → ${fmt(pur)}/min`;
  document.getElementById('nodeTotal').textContent   = fmt(total);
}

function renderChain(name, count) {
  const c = document.getElementById('chainVisual');
  c.innerHTML = '';
  const ext = document.createElement('div');
  ext.className = 'chain-node extractor';
  ext.textContent = name;
  c.appendChild(ext);

  const max = Math.min(count, 12);
  for (let i = 0; i < max; i++) {
    const ar = document.createElement('span'); ar.className = 'chain-arrow'; ar.textContent = '→'; c.appendChild(ar);
    const nd = document.createElement('div');  nd.className = 'chain-node machine-node';
    nd.style.animationDelay = (i * 0.04) + 's';
    nd.textContent = 'M' + (i + 1);
    c.appendChild(nd);
  }
  if (count > 12) {
    const ar = document.createElement('span'); ar.className = 'chain-arrow'; ar.textContent = '→'; c.appendChild(ar);
    const m  = document.createElement('div'); m.className = 'chain-node'; m.style.color = 'var(--text-dim)'; m.textContent = '+' + (count - 12) + ' más'; c.appendChild(m);
  }
  if (count === 0) {
    const nd = document.createElement('div'); nd.className = 'chain-node'; nd.style.color = 'var(--red)'; nd.textContent = 'Sin capacidad'; c.appendChild(nd);
  }
}

// ===========================
// ====== RECIPE CALC ========
// ===========================
function calcRecipe() {
  const key     = document.getElementById('recipe').value;
  const desired = parseFloat(document.getElementById('desiredOutput').value) || 60;
  const eff     = parseFloat(document.getElementById('recipeEffRange').value) / 100;
  const rec     = RECIPES[key];
  if (!rec) return;

  const outPM    = rec.outputRate * eff;
  const machines = Math.ceil(desired / outPM);
  const actual   = machines * outPM;

  document.getElementById('recMachines').textContent  = machines;
  document.getElementById('recMachine').textContent   = rec.machine;
  document.getElementById('recActualOut').textContent = fmt(actual);

  const grid = document.getElementById('inputsGrid');
  grid.innerHTML = '';
  rec.inputs.forEach(inp => {
    const r   = RECIPES[inp.id];
    const box = document.createElement('div');
    box.className = 'result-box';
    box.innerHTML = `<div class="result-label">${r ? r.name : inp.id}</div>
                     <div class="result-value cyan">${fmt(inp.rate * machines * eff)}</div>
                     <div class="result-unit">unid / min</div>`;
    grid.appendChild(box);
  });
}

// ===========================
// ====== COMPARADOR =========
// ===========================
function runComparator() {
  const productId  = document.getElementById('compareProduct').value;
  const optimizeBy = document.getElementById('optimizeBy').value;
  const target     = parseFloat(document.getElementById('compareTarget').value) || 60;
  const variants   = ALT_RECIPES[productId];

  if (!variants || !variants.length) {
    document.getElementById('comparatorGrid').innerHTML =
      '<div style="font-family:\'Share Tech Mono\',monospace;font-size:0.72rem;color:var(--text-dim);padding:20px">Sin recetas alternativas disponibles para este producto.</div>';
    return;
  }

  const scored = variants.map(v => {
    const machinesNeeded = Math.ceil(target / v.outputRate);
    const totalInputs    = v.inputs.reduce((s, i) => s + i.rate * machinesNeeded, 0);
    let score = 0;
    if      (optimizeBy === 'output')    score =  v.outputRate;
    else if (optimizeBy === 'machines')  score = -machinesNeeded;
    else if (optimizeBy === 'rawInput')  score = -totalInputs;
    return { ...v, machinesNeeded, totalInputs, score };
  });

  const best = scored.reduce((a, b) => b.score > a.score ? b : a);

  const optimizeLabels = {
    output:   'Mayor producción/máquina',
    machines: 'Menos máquinas',
    rawInput: 'Menos materias primas',
  };
  document.getElementById('comparatorSummary').innerHTML = `
    <span style="color:var(--text-dim)">Criterio:</span> <span style="color:var(--orange)">${optimizeLabels[optimizeBy]}</span><br>
    <span style="color:var(--text-dim)">Objetivo:</span> <span style="color:var(--text-bright)">${target}/min</span><br>
    <span style="color:var(--text-dim)">Recetas disponibles:</span> <span style="color:var(--text-bright)">${scored.length}</span><br>
    <span style="color:var(--text-dim)">Receta óptima:</span> <span style="color:var(--green)">${best.name}</span>
  `;

  const grid = document.getElementById('comparatorGrid');
  grid.innerHTML = scored.map(v => {
    const isBest = v === best;
    const inputsHtml = v.inputs.map(i => {
      const r = RECIPES[i.id];
      return `<div class="recipe-input-item">
        <span style="color:var(--text)">${r ? r.name : i.id}</span>
        <span>${fmt(i.rate * v.machinesNeeded)}/min</span>
      </div>`;
    }).join('');
    return `<div class="recipe-card${isBest ? ' best' : ''}">
      <div class="recipe-card-title">${v.name} ${v.isAlt ? '<span class="badge alt">ALT</span>' : '<span class="badge std">STD</span>'}</div>
      <div class="recipe-card-type">${v.machine}</div>
      <div class="recipe-stat">
        <span class="recipe-stat-label">Salida base</span>
        <span class="recipe-stat-val" style="color:var(--orange)">${fmt(v.outputRate)}/min</span>
      </div>
      <div class="recipe-stat">
        <span class="recipe-stat-label">Máquinas necesarias</span>
        <span class="recipe-stat-val" style="color:${isBest && optimizeBy === 'machines' ? 'var(--green)' : 'var(--text)'}">${v.machinesNeeded}</span>
      </div>
      <div class="recipe-stat">
        <span class="recipe-stat-label">Total materias primas</span>
        <span class="recipe-stat-val" style="color:${isBest && optimizeBy === 'rawInput' ? 'var(--green)' : 'var(--text)'}">${fmt(v.totalInputs)}/min</span>
      </div>
      <div class="recipe-inputs">
        <div style="font-family:'Share Tech Mono',monospace;font-size:0.6rem;color:var(--text-dim);letter-spacing:0.1em;text-transform:uppercase;margin:8px 0 4px">Ingredientes (para ${target}/min):</div>
        ${inputsHtml}
      </div>
    </div>`;
  }).join('');
}

// ===========================
// ======== ÁRBOL ============
// ===========================
let treeRecipeOverrides = {};

function getEffectiveRecipe(itemId) {
  const overrideName = treeRecipeOverrides[itemId];
  if (overrideName && ALT_RECIPES[itemId]) {
    const alt = ALT_RECIPES[itemId].find(r => r.name === overrideName);
    if (alt) return { ...alt, isRaw: false };
  }
  return RECIPES[itemId];
}

function expandTree(itemId, neededRate, oc, acc, depth) {
  const rec = getEffectiveRecipe(itemId);
  if (!rec) return;
  if (!acc[itemId]) {
    acc[itemId] = {
      id: itemId, name: rec.name, machine: rec.machine,
      neededRate: 0, machinesNeeded: 0,
      isRaw: !!rec.isRaw, depth, inputs: rec.inputs || [],
      recipeName: treeRecipeOverrides[itemId] || 'Estándar',
    };
  }
  acc[itemId].neededRate += neededRate;
  if (rec.isRaw) return;
  const outPM    = rec.outputRate * oc;
  const machines = neededRate / outPM;
  rec.inputs.forEach(inp => expandTree(inp.id, inp.rate * machines, oc, acc, depth + 1));
}

function buildTree() {
  const productId = document.getElementById('treeProduct').value;
  const target    = parseFloat(document.getElementById('treeTarget').value) || 10;
  const oc        = parseFloat(document.getElementById('treeOCRange').value) / 100;
  const acc       = {};

  expandTree(productId, target, oc, acc, 0);

  Object.values(acc).forEach(node => {
    if (node.isRaw) return;
    // FIX: usar getEffectiveRecipe en lugar de RECIPES para respetar overrides
    const rec   = getEffectiveRecipe(node.id);
    const outPM = rec.outputRate * oc;
    node.machinesNeeded = Math.ceil(node.neededRate / outPM);
    node.actualOutput   = node.machinesNeeded * outPM;
    node.outputRate     = rec.outputRate;
  });

  const usageCount = {};
  Object.values(acc).forEach(node => node.inputs.forEach(inp => {
    usageCount[inp.id] = (usageCount[inp.id] || 0) + 1;
  }));
  Object.keys(usageCount).forEach(id => { if (acc[id] && usageCount[id] >= 2) acc[id].multiUse = true; });
  if (acc[productId]) acc[productId].isFinal = true;

  document.getElementById('statusTree').textContent = `ÁRBOL: ${RECIPES[productId]?.name || productId} → ${fmt(target)}/min`;
  renderTreeSVG(productId, acc);
  renderSummary(acc, target);
  renderAltRecipeSelectors(acc);
}

// META: Auto-optimizar todas las recetas alt para minimizar máquinas
function autoOptimizeTree() {
  const productId = document.getElementById('treeProduct').value;
  const target    = parseFloat(document.getElementById('treeTarget').value) || 10;
  const oc        = parseFloat(document.getElementById('treeOCRange').value) / 100;

  // Prueba todas las combinaciones de recetas alt (greedy: optimiza nodo a nodo)
  // Para cada ítem con alt_recipes, elige la que minimiza machinesNeeded
  treeRecipeOverrides = {};
  const acc0 = {};
  expandTree(productId, target, oc, acc0, 0);
  Object.values(acc0).forEach(node => {
    if (node.isRaw || !ALT_RECIPES[node.id]) return;
    let bestName = 'Estándar';
    let bestMachines = Infinity;
    ALT_RECIPES[node.id].forEach(alt => {
      const machines = Math.ceil(node.neededRate / (alt.outputRate * oc));
      if (machines < bestMachines) { bestMachines = machines; bestName = alt.name; }
    });
    if (bestName !== 'Estándar') treeRecipeOverrides[node.id] = bestName;
  });

  buildTree();
  showNotification('✓ Recetas optimizadas para mínimo número de máquinas');
}

function renderAltRecipeSelectors(acc) {
  const container = document.getElementById('treeAltSelectors');
  const nodes = Object.values(acc).filter(n => !n.isRaw && ALT_RECIPES[n.id] && ALT_RECIPES[n.id].length > 1);
  if (!nodes.length) { container.style.display = 'none'; return; }
  container.style.display = 'block';
  container.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px">
      <div class="card-title" style="margin-bottom:0">Recetas Alternativas por Nodo</div>
      <button class="btn primary" onclick="autoOptimizeTree()" style="font-size:0.72rem;padding:7px 14px">⚡ Auto-Optimizar (min. máquinas)</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px">
      ${nodes.map(n => {
        const alts    = ALT_RECIPES[n.id];
        const current = treeRecipeOverrides[n.id] || 'Estándar';
        return `<div style="background:var(--dark3);border:1px solid var(--border);padding:12px">
          <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:0.85rem;color:var(--text-bright);margin-bottom:6px">${n.name}</div>
          <select onchange="setTreeOverride('${n.id}', this.value)"
            style="width:100%;background:var(--dark4);border:1px solid var(--border);color:var(--text-bright);font-family:'Share Tech Mono',monospace;font-size:0.78rem;padding:6px 10px;outline:none;appearance:none;-webkit-appearance:none">
            ${alts.map(a => `<option value="${a.name}" ${a.name === current ? 'selected' : ''}>${a.name}${a.isAlt ? ' ★' : ''} — ${fmt(a.outputRate)}/min</option>`).join('')}
          </select>
        </div>`;
      }).join('')}
    </div>`;
}

function setTreeOverride(itemId, recipeName) {
  if (recipeName === 'Estándar') delete treeRecipeOverrides[itemId];
  else treeRecipeOverrides[itemId] = recipeName;
  buildTree();
}

function renderTreeSVG(rootId, acc) {
  const svg = document.getElementById('treeSvg');
  document.getElementById('treeEmptyState').style.display = 'none';
  svg.style.display = 'block';
  svg.innerHTML = '';

  // BFS levels — FIX: usar getEffectiveRecipe para respetar overrides
  const levels  = {};
  const q       = [{ id: rootId, level: 0 }];
  const visited = new Set();
  while (q.length) {
    const { id, level } = q.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    if (levels[id] === undefined || level > levels[id]) levels[id] = level;
    const rec = getEffectiveRecipe(id);
    if (rec && !rec.isRaw) rec.inputs.forEach(inp => { if (!visited.has(inp.id)) q.push({ id: inp.id, level: level + 1 }); });
  }

  const byLevel  = {};
  Object.entries(levels).forEach(([id, lv]) => { if (!byLevel[lv]) byLevel[lv] = []; byLevel[lv].push(id); });
  const maxLevel = Math.max(...Object.values(levels));

  const NW = 180, NH = 72, HG = 18, VG = 52;
  let svgW = 0;
  for (let lv = 0; lv <= maxLevel; lv++) {
    const nodes = byLevel[lv] || [];
    const rw    = nodes.length * NW + (nodes.length - 1) * HG;
    if (rw > svgW) svgW = rw;
  }
  svgW = Math.max(svgW + 60, 500);
  const svgH = (maxLevel + 1) * (NH + VG) + 40;

  const pos = {};
  for (let lv = 0; lv <= maxLevel; lv++) {
    const nodes  = byLevel[lv] || [];
    const rw     = nodes.length * NW + (nodes.length - 1) * HG;
    const startX = (svgW - rw) / 2;
    nodes.forEach((id, i) => { pos[id] = { x: startX + i * (NW + HG), y: lv * (NH + VG) + 20 }; });
  }

  svg.setAttribute('viewBox', `0 0 ${svgW} ${svgH}`);
  svg.setAttribute('height', svgH);
  svg.setAttribute('width',  svgW);

  // Draw edges — FIX: usar getEffectiveRecipe
  let ei = 0;
  Object.entries(levels).forEach(([parentId]) => {
    const rec = getEffectiveRecipe(parentId);
    if (!rec || rec.isRaw) return;
    const pp = pos[parentId];
    rec.inputs.forEach(inp => {
      const cp = pos[inp.id];
      if (!cp || !pp) return;
      const px = pp.x + NW / 2, py = pp.y + NH;
      const cx = cp.x + NW / 2, cy = cp.y;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${px} ${py} C ${px} ${py + VG * 0.6} ${cx} ${cy - VG * 0.6} ${cx} ${cy}`);
      path.setAttribute('class', 'tree-edge');
      const n  = acc[inp.id];
      let ec   = '#2A3240';
      if (n) { if (n.isRaw) ec = '#1A3A28'; else if (n.multiUse) ec = '#3A2060'; else ec = '#0A2A3A'; }
      path.setAttribute('stroke', ec);
      path.style.animationDelay = (ei * 0.03) + 's';
      svg.appendChild(path);
      ei++;
    });
  });

  // Draw nodes
  Object.entries(pos).forEach(([id, p]) => {
    const node = acc[id];
    if (!node) return;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${p.x},${p.y})`);

    let fill, stroke, rateC;
    if      (node.isFinal)  { fill = 'rgba(232,146,26,0.14)'; stroke = '#E8921A'; rateC = '#FFB347'; }
    else if (node.isRaw)    { fill = 'rgba(74,222,128,0.09)';  stroke = '#4ADE80'; rateC = '#4ADE80'; }
    else if (node.multiUse) { fill = 'rgba(167,139,250,0.11)'; stroke = '#A78BFA'; rateC = '#C4B5FD'; }
    else                    { fill = 'rgba(56,189,248,0.08)';  stroke = '#38BDF8'; rateC = '#7DD3FC'; }

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', NW); rect.setAttribute('height', NH);
    rect.setAttribute('rx', '3');   rect.setAttribute('fill', fill);
    rect.setAttribute('stroke', stroke); rect.setAttribute('stroke-width', '1');
    g.appendChild(rect);

    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bar.setAttribute('width', NW); bar.setAttribute('height', '2');
    bar.setAttribute('fill', stroke);
    g.appendChild(bar);

    const svgText = (x, y, txt, cls, fill2) => {
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', x); t.setAttribute('y', y);
      t.setAttribute('text-anchor', 'middle');
      if (cls)   t.setAttribute('class', cls);
      if (fill2) t.setAttribute('fill',  fill2);
      t.textContent = txt;
      return t;
    };

    const name = node.name.length > 23 ? node.name.slice(0, 22) + '…' : node.name;
    g.appendChild(svgText(NW / 2, 24, name,                         'tree-node-title', null));
    g.appendChild(svgText(NW / 2, 42, fmt(node.neededRate) + '/min','tree-node-rate',  rateC));
    const sub = node.isRaw ? '⛏ RAW' : `${node.machinesNeeded}× ${node.machine}`;
    g.appendChild(svgText(NW / 2, 58, sub, 'tree-node-sub', node.isRaw ? '#4ADE80' : null));

    // Tooltip
    const rec = getEffectiveRecipe(node.id);
    const tipLines = node.isRaw
      ? [`Recurso RAW`, `Extracción: ${fmt(node.neededRate)}/min`]
      : [
          `Receta: ${node.recipeName || 'Estándar'}`,
          `Máquina: ${node.machine}`,
          `Salida base: ${fmt(rec?.outputRate || 0)}/min`,
          `Necesario: ${fmt(node.neededRate)}/min`,
          `Máquinas: ${node.machinesNeeded}`,
          ...(node.inputs.map(i => {
            const r = RECIPES[i.id]; return `· ${r ? r.name : i.id}: ${fmt(i.rate * node.machinesNeeded)}/min`;
          })),
        ];

    const hitArea = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    hitArea.setAttribute('width', NW); hitArea.setAttribute('height', NH);
    hitArea.setAttribute('fill', 'transparent'); hitArea.setAttribute('rx', '3');
    hitArea.style.cursor = 'pointer';
    hitArea.addEventListener('mouseenter', (e) => showTreeTooltip(e, tipLines, stroke));
    hitArea.addEventListener('mousemove',  (e) => moveTreeTooltip(e));
    hitArea.addEventListener('mouseleave', ()  => hideTreeTooltip());
    g.appendChild(hitArea);

    svg.appendChild(g);
  });
}

function exportTreeAsPNG() {
  const svg = document.getElementById('treeSvg');
  if (svg.style.display === 'none') { showNotification('✗ Genera el árbol primero', true); return; }

  const serializer = new XMLSerializer();
  let svgStr = serializer.serializeToString(svg);
  // Inline fonts
  svgStr = svgStr.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');

  const canvas  = document.createElement('canvas');
  const svgW    = parseFloat(svg.getAttribute('width'))  || 800;
  const svgH    = parseFloat(svg.getAttribute('height')) || 600;
  canvas.width  = svgW * 2;
  canvas.height = svgH * 2;
  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);

  // Background
  ctx.fillStyle = '#0A0C0F';
  ctx.fillRect(0, 0, svgW, svgH);

  const img = new Image();
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    const a = document.createElement('a');
    a.download = 'ficsit-arbol.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
    showNotification('✓ Árbol exportado como PNG');
  };
  img.src = url;
}

function renderSummary(acc, target) {
  const sumDiv = document.getElementById('treeSummary');
  sumDiv.style.display = 'block';
  const content = document.getElementById('summaryContent');
  content.innerHTML = '';
  const nodes = Object.values(acc);

  const machTotals = {};
  nodes.filter(n => !n.isRaw).forEach(n => { machTotals[n.machine] = (machTotals[n.machine] || 0) + n.machinesNeeded; });

  const totalMachines = Object.values(machTotals).reduce((s, v) => s + v, 0);

  const sections = [
    { title: 'RECURSOS RAW', cls: 'raw',
      items: nodes.filter(n => n.isRaw).map(n => ({ name: n.name, val: fmt(n.neededRate) + '/min', cls: 'green' })) },
    { title: 'INTERMEDIOS fabricados', cls: 'inter',
      items: nodes.filter(n => !n.isRaw && !n.isFinal).sort((a, b) => a.depth - b.depth)
        .map(n => ({ name: `${n.name}  (${n.machine})`, val: `${fmt(n.neededRate)}/min · ${n.machinesNeeded} máq.${n.multiUse ? ' ★' : ''}`, cls: 'cyan' })) },
    { title: 'PRODUCCIÓN FINAL', cls: 'final',
      items: nodes.filter(n => n.isFinal).map(n => ({ name: n.name, val: `${fmt(target)}/min objetivo`, cls: 'orange' })) },
    { title: `TOTAL DE MÁQUINAS (${totalMachines})`, cls: 'machines',
      items: Object.entries(machTotals).map(([m, c]) => ({ name: m, val: c + ' unidades', cls: 'purple' })) },
  ];

  sections.forEach(sec => {
    if (!sec.items.length) return;
    const div   = document.createElement('div'); div.className = 'summary-section';
    const title = document.createElement('div'); title.className = 'summary-section-title ' + sec.cls; title.textContent = sec.title;
    div.appendChild(title);
    sec.items.forEach(item => {
      const row = document.createElement('div'); row.className = 'summary-row';
      row.innerHTML = `<span class="summary-row-name">${item.name}</span><span class="summary-row-val ${item.cls}">${item.val}</span>`;
      div.appendChild(row);
    });
    content.appendChild(div);
  });

  const multiNodes = nodes.filter(n => n.multiUse);
  if (multiNodes.length) {
    const note = document.createElement('div');
    note.style.cssText = 'font-family:Share Tech Mono,monospace;font-size:0.65rem;color:var(--purple);padding:10px 12px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.05);margin-top:8px;';
    note.textContent = '★ Ingredientes marcados son multi-uso: se usan en 2 o más recetas de esta cadena.';
    content.appendChild(note);
  }
}

// ===========================
// ====== TREE TOOLTIP =======
// ===========================
function showTreeTooltip(e, lines, borderColor) {
  let tip = document.getElementById('treeTooltip');
  if (!tip) {
    tip = document.createElement('div');
    tip.id = 'treeTooltip';
    tip.style.cssText = `
      position:fixed;pointer-events:none;z-index:9999;
      background:#0E1218;border:1px solid #3A4A5C;
      padding:10px 14px;font-family:'Share Tech Mono',monospace;
      font-size:0.7rem;line-height:1.8;color:#C8D8E8;
      box-shadow:0 4px 20px rgba(0,0,0,0.6);min-width:200px;max-width:290px;
      transition:opacity 0.1s;
    `;
    document.body.appendChild(tip);
  }
  tip.style.borderColor = borderColor;
  tip.innerHTML = lines.map((l, i) =>
    i === 0
      ? `<div style="color:${borderColor};font-family:'Rajdhani',sans-serif;font-weight:700;font-size:0.85rem;margin-bottom:4px;letter-spacing:0.05em">${l}</div>`
      : `<div style="color:${l.startsWith('·') ? '#38BDF8' : '#C8D8E8'}">${l}</div>`
  ).join('');
  tip.style.opacity = '1';
  tip.style.display = 'block';
  moveTreeTooltip(e);
}
function moveTreeTooltip(e) {
  const tip = document.getElementById('treeTooltip');
  if (!tip) return;
  const x = e.clientX + 16;
  const y = e.clientY + 16;
  const overflowX = x + 300 > window.innerWidth;
  const overflowY = y + 200 > window.innerHeight;
  tip.style.left = (overflowX ? e.clientX - 300 : x) + 'px';
  tip.style.top  = (overflowY ? e.clientY - tip.offsetHeight - 8 : y) + 'px';
}
function hideTreeTooltip() {
  const tip = document.getElementById('treeTooltip');
  if (tip) { tip.style.opacity = '0'; setTimeout(() => { tip.style.display = 'none'; }, 100); }
}

// ===========================
// ====== TUBERÍAS ===========
// ===========================
const PIPE_TIERS = [
  { name: 'Mk.1', cap: 300  },
  { name: 'Mk.2', cap: 600  },
];

function calcPipes() {
  const flow     = parseFloat(document.getElementById('pipeFlow').value) || 300;
  const tierCap  = parseFloat(document.getElementById('pipeTier').value);
  const count    = Math.ceil(flow / tierCap);
  const totalCap = count * tierCap;
  const usage    = ((flow / totalCap) * 100).toFixed(1);
  const margin   = totalCap - flow;

  document.getElementById('pipeCount').textContent    = count;
  document.getElementById('pipeCapacity').textContent = fmt(totalCap);
  document.getElementById('pipeUsage').textContent    = usage;
  document.getElementById('pipeMargin').textContent   = fmt(margin);

  const tbody = document.getElementById('pipeTableBody');
  tbody.innerHTML = PIPE_TIERS.map(b => {
    const n  = Math.ceil(flow / b.cap);
    const u  = ((flow / (n * b.cap)) * 100).toFixed(1);
    const isSelected = b.cap === tierCap;
    const uCls = parseFloat(u) > 90 ? 'bad' : parseFloat(u) > 70 ? 'warn' : 'good';
    return `<tr${isSelected ? ' style="background:rgba(232,146,26,0.05)"' : ''}>
      <td${isSelected ? ' style="color:var(--orange);font-weight:700"' : ''}>${b.name}</td>
      <td class="num">${b.cap} m³/min</td><td class="num">${n}</td><td class="${uCls}">${u}%</td>
    </tr>`;
  }).join('');

  const rec = document.getElementById('pipeRecommendation');
  const fit = PIPE_TIERS.find(b => b.cap >= flow);
  if (fit) {
    rec.innerHTML = `<span style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:1.1rem;color:var(--green)">${fit.name}</span>
      <span style="font-family:'Share Tech Mono',monospace;font-size:0.73rem;color:var(--text-dim)"> (${fit.cap} m³/min)</span><br>
      <span style="font-family:'Share Tech Mono',monospace;font-size:0.68rem;color:var(--text-dim)">Una tubería ${fit.name} cubre ${fmt(flow)} m³/min al ${((flow / fit.cap) * 100).toFixed(1)}% de uso</span>`;
  } else {
    rec.innerHTML = `<span style="font-family:'Share Tech Mono',monospace;font-size:0.73rem;color:var(--red)">Ninguna tubería única cubre ${fmt(flow)} m³/min — usa ${Math.ceil(flow / 600)} tuberías Mk.2 en paralelo</span>`;
  }
}

// ===========================
// ====== CINTAS =============
// ===========================
const BELT_TIERS = [
  { name: 'Mk.1', cap: 60  }, { name: 'Mk.2', cap: 120 }, { name: 'Mk.3', cap: 270 },
  { name: 'Mk.4', cap: 480 }, { name: 'Mk.5', cap: 780 }, { name: 'Mk.6', cap: 1200 },
];

function calcBelts() {
  const flow     = parseFloat(document.getElementById('beltFlow').value) || 120;
  const tierCap  = parseFloat(document.getElementById('beltTier').value);
  const count    = Math.ceil(flow / tierCap);
  const totalCap = count * tierCap;
  const usage    = ((flow / totalCap) * 100).toFixed(1);
  const margin   = totalCap - flow;

  document.getElementById('beltCount').textContent    = count;
  document.getElementById('beltCapacity').textContent = fmt(totalCap);
  document.getElementById('beltUsage').textContent    = usage;
  document.getElementById('beltMargin').textContent   = fmt(margin);

  const tbody = document.getElementById('beltTableBody');
  tbody.innerHTML = BELT_TIERS.map(b => {
    const n  = Math.ceil(flow / b.cap);
    const u  = ((flow / (n * b.cap)) * 100).toFixed(1);
    const isSelected = b.cap === tierCap;
    const uCls = parseFloat(u) > 90 ? 'bad' : parseFloat(u) > 70 ? 'warn' : 'good';
    return `<tr${isSelected ? ' style="background:rgba(232,146,26,0.05)"' : ''}>
      <td${isSelected ? ' style="color:var(--orange);font-weight:700"' : ''}>${b.name}</td>
      <td class="num">${b.cap}/min</td><td class="num">${n}</td><td class="${uCls}">${u}%</td>
    </tr>`;
  }).join('');

  const fit = BELT_TIERS.find(b => b.cap >= flow);
  const rec = document.getElementById('beltRecommendation');
  if (fit) {
    rec.innerHTML = `<span style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:1.1rem;color:var(--green)">${fit.name}</span>
      <span style="font-family:'Share Tech Mono',monospace;font-size:0.73rem;color:var(--text-dim)"> (${fit.cap}/min)</span><br>
      <span style="font-family:'Share Tech Mono',monospace;font-size:0.68rem;color:var(--text-dim)">Una cinta ${fit.name} cubre ${fmt(flow)}/min al ${((flow / fit.cap) * 100).toFixed(1)}% de uso</span>`;
  } else {
    rec.innerHTML = `<span style="font-family:'Share Tech Mono',monospace;font-size:0.73rem;color:var(--red)">Ninguna cinta única cubre ${fmt(flow)}/min — usa ${Math.ceil(flow / 1200)} cintas Mk.6 en paralelo</span>`;
  }
}

// ===========================
// ======= ENERGY ============
// ===========================
// FIX: Quantum Energy Source corregido a 2500 MW (no 100.000)
const GENERATORS = [
  { name: 'Biomasa',                  mw: 30    },
  { name: 'Carbón',                   mw: 75    },
  { name: 'Fuel',                     mw: 150   },
  { name: 'Turbofuel',                mw: 250   },
  { name: 'Nuclear',                  mw: 2500  },
  { name: 'Nuclear (Plutonio)',        mw: 2500  },
  { name: 'Quantum Energy Source',    mw: 2500  },
];
let energyMachines = [];

function addEnergyMachine() {
  const sel   = document.getElementById('energyMachine');
  const parts = sel.value.split('|');
  const mw    = parseFloat(parts[0]);
  const name  = parts[1];
  const qty   = parseInt(document.getElementById('energyQty').value) || 1;
  const existing = energyMachines.find(m => m.name === name);
  if (existing) { existing.qty += qty; } else { energyMachines.push({ name, mw, qty }); }
  renderEnergyList();
  calcEnergy();
}

function removeEnergyMachine(name) {
  energyMachines = energyMachines.filter(m => m.name !== name);
  renderEnergyList();
  calcEnergy();
}

function clearEnergyMachines() {
  energyMachines = [];
  renderEnergyList();
  calcEnergy();
}

function renderEnergyList() {
  const el = document.getElementById('energyMachineList');
  if (!energyMachines.length) {
    el.innerHTML = '<div style="font-family:\'Share Tech Mono\',monospace;font-size:0.7rem;color:var(--text-dim);padding:16px 0;text-align:center">// Sin máquinas añadidas</div>';
    return;
  }
  el.innerHTML = energyMachines.map(m => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(42,50,64,0.4)">
      <div>
        <span style="font-size:0.95rem;color:var(--text)">${m.name}</span>
        <span style="font-family:'Share Tech Mono',monospace;font-size:0.68rem;color:var(--text-dim);margin-left:8px">×${m.qty}</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-family:'Share Tech Mono',monospace;font-size:0.8rem;color:var(--orange)">${fmt(m.mw * m.qty)} MW</span>
        <button onclick="removeEnergyMachine('${m.name}')" style="background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:1.1rem;padding:0 4px">×</button>
      </div>
    </div>`).join('');
}

function calcEnergy() {
  const total      = energyMachines.reduce((s, m) => s + m.mw * m.qty, 0);
  const withMargin = Math.ceil(total * 1.2);
  document.getElementById('totalMW').textContent       = fmt(total);
  document.getElementById('totalMWMargin').textContent = fmt(withMargin);

  const tbody = document.getElementById('generatorTable');
  tbody.innerHTML = GENERATORS.map(g => {
    const n = Math.ceil(withMargin / g.mw);
    return `<tr><td>${g.name}</td><td class="num">${fmt(g.mw)} MW</td><td class="num">${n}</td></tr>`;
  }).join('');

  const fuelInfo = document.getElementById('fuelInfo');
  if (total > 0) {
    const coalGen    = Math.ceil(withMargin / 75);
    const coalNeeded = (coalGen * 22.5).toFixed(1);
    fuelInfo.innerHTML = `<span style="color:var(--text)">${coalGen} generadores de carbón</span><br>
      <span style="color:var(--orange)">${fmt(parseFloat(coalNeeded))} Coal/min</span>
      <span style="color:var(--text-dim)"> + agua (45 m³/min c/u)</span>`;
  } else {
    fuelInfo.textContent = 'Añade máquinas para calcular';
  }
}

// ===========================
// ====== FACTORY ============
// ===========================
let factoryLines = [];

function addFactoryLine() {
  const key      = document.getElementById('factoryProduct').value;
  const machines = parseInt(document.getElementById('factoryMachines').value) || 1;
  const oc       = parseFloat(document.getElementById('factoryOCRange').value) / 100;
  const rec      = RECIPES[key];
  if (!rec || rec.isRaw) return;

  factoryLines.push({
    key, name: rec.name, machine: rec.machine,
    machines, oc, outputRate: rec.outputRate,
    inputs: rec.inputs, id: Date.now(),
  });
  renderFactoryLines();
  calcFactory();
}

function removeFactoryLine(id) {
  factoryLines = factoryLines.filter(l => l.id !== id);
  renderFactoryLines();
  calcFactory();
}

function renderFactoryLines() {
  const el = document.getElementById('factoryLines');
  if (!factoryLines.length) {
    el.innerHTML = '<div style="font-family:\'Share Tech Mono\',monospace;font-size:0.7rem;color:var(--text-dim);padding:20px 0;text-align:center">// Sin líneas. Añade una producción.</div>';
    return;
  }
  el.innerHTML = factoryLines.map(l => {
    const outRate = l.outputRate * l.machines * l.oc;
    return `<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:10px 0;border-bottom:1px solid rgba(42,50,64,0.4)">
      <div>
        <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:1rem;color:var(--text-bright)">${l.name}</div>
        <div style="font-family:'Share Tech Mono',monospace;font-size:0.63rem;color:var(--text-dim)">${l.machines}× ${l.machine} · OC ${Math.round(l.oc * 100)}%</div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-family:'Share Tech Mono',monospace;font-size:0.8rem;color:var(--green)">↑ ${fmt(outRate)}/min</span>
        <button onclick="removeFactoryLine(${l.id})" style="background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:1.1rem;padding:0 4px">×</button>
      </div>
    </div>`;
  }).join('');
}

function calcFactory() {
  const card = document.getElementById('factoryBalanceCard');
  if (!factoryLines.length) { card.style.display = 'none'; return; }
  card.style.display = 'block';

  const outputs = {};
  factoryLines.forEach(l => {
    const rate = l.outputRate * l.machines * l.oc;
    outputs[l.name] = (outputs[l.name] || 0) + rate;
  });

  const inputsNeeded = {};
  factoryLines.forEach(l => {
    l.inputs.forEach(inp => {
      const rec = RECIPES[inp.id];
      if (!rec) return;
      const rate = inp.rate * l.machines * l.oc;
      inputsNeeded[rec.name] = (inputsNeeded[rec.name] || 0) + rate;
    });
  });

  const renderItems = (map, colorClass) => Object.entries(map).map(([name, rate]) =>
    `<div style="display:flex;justify-content:space-between;padding:6px 12px;border-bottom:1px solid rgba(42,50,64,0.3);font-size:0.88rem">
      <span style="color:var(--text)">${name}</span>
      <span style="font-family:'Share Tech Mono',monospace;font-size:0.78rem;color:var(--${colorClass})">${fmt(rate)}/min</span>
    </div>`).join('');

  document.getElementById('factoryOutputs').innerHTML = renderItems(outputs, 'green');
  document.getElementById('factoryInputs').innerHTML  = renderItems(inputsNeeded, 'red');

  const net = {};
  Object.entries(outputs).forEach(([name, rate])      => { const consumed = inputsNeeded[name] || 0; net[name] = rate - consumed; });
  Object.entries(inputsNeeded).forEach(([name, rate]) => { if (!(name in outputs)) net[name] = -rate; });

  const surplus  = Object.entries(net).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  const deficit  = Object.entries(net).filter(([, v]) => v < 0).sort((a, b) => a[1] - b[1]);
  const balanced = Object.entries(net).filter(([, v]) => v === 0);

  let html = '';
  if (surplus.length) html +=
    `<div style="font-family:'Share Tech Mono',monospace;font-size:0.6rem;color:var(--green);letter-spacing:0.12em;text-transform:uppercase;padding:8px 12px 4px;border-left:2px solid var(--green)">EXCEDENTE</div>` +
    surplus.map(([n, v]) => `<div style="display:flex;justify-content:space-between;padding:6px 12px;border-bottom:1px solid rgba(42,50,64,0.3);font-size:0.88rem"><span style="color:var(--text)">${n}</span><span style="font-family:'Share Tech Mono',monospace;font-size:0.78rem;color:var(--green)">+${fmt(v)}/min</span></div>`).join('');
  if (deficit.length) html +=
    `<div style="font-family:'Share Tech Mono',monospace;font-size:0.6rem;color:var(--red);letter-spacing:0.12em;text-transform:uppercase;padding:8px 12px 4px;border-left:2px solid var(--red);margin-top:8px">DÉFICIT (necesitas importar)</div>` +
    deficit.map(([n, v]) => `<div style="display:flex;justify-content:space-between;padding:6px 12px;border-bottom:1px solid rgba(42,50,64,0.3);font-size:0.88rem"><span style="color:var(--text)">${n}</span><span style="font-family:'Share Tech Mono',monospace;font-size:0.78rem;color:var(--red)">${fmt(v)}/min</span></div>`).join('');
  if (balanced.length) html +=
    `<div style="font-family:'Share Tech Mono',monospace;font-size:0.6rem;color:var(--text-dim);letter-spacing:0.12em;text-transform:uppercase;padding:8px 12px 4px;border-left:2px solid var(--border);margin-top:8px">BALANCEADO</div>` +
    balanced.map(([n]) => `<div style="display:flex;justify-content:space-between;padding:6px 12px;border-bottom:1px solid rgba(42,50,64,0.3);font-size:0.88rem"><span style="color:var(--text-dim)">${n}</span><span style="font-family:'Share Tech Mono',monospace;font-size:0.78rem;color:var(--text-dim)">0/min ✓</span></div>`).join('');

  document.getElementById('factoryNetBalance').innerHTML = html ||
    '<div style="padding:12px;color:var(--text-dim);font-family:\'Share Tech Mono\',monospace;font-size:0.7rem">Sin datos suficientes</div>';
}

// ===========================
// ======= TRENES ============
// ===========================
const WAGON_CAPACITY = {
  solid:    { name: 'Sólidos (Vagón de Carga)',    capacity: 2400 },
  fluid_m3: { name: 'Fluidos m³ (Vagón Cisterna)', capacity: 50  },
};
const TRAIN_SPEED_KMH = 120;

function calcTrains() {
  const flowRate       = parseFloat(document.getElementById('trainFlow').value)       || 120;
  const cargoType      = document.getElementById('trainCargoType').value;
  const routeDist      = parseFloat(document.getElementById('trainRouteDist').value)  || 1;
  const loadTime       = parseFloat(document.getElementById('trainLoadTime').value)   || 30;
  const unloadTime     = parseFloat(document.getElementById('trainUnloadTime').value) || 30;
  const wagonsPerTrain = parseInt(document.getElementById('trainWagons').value)       || 1;

  const wagon     = WAGON_CAPACITY[cargoType];
  const wagonCap  = wagon.capacity;

  const travelOneWay = (routeDist / TRAIN_SPEED_KMH) * 60;
  const cycleMins    = travelOneWay * 2 + (loadTime / 60) + (unloadTime / 60);

  const capacityPerTrain  = wagonCap * wagonsPerTrain;
  const throughputOneTrain= capacityPerTrain / cycleMins;
  const trainsNeeded      = Math.ceil(flowRate / throughputOneTrain);
  const totalThroughput   = throughputOneTrain * trainsNeeded;
  const frequency         = trainsNeeded > 0 ? cycleMins / trainsNeeded : 0;
  const routeUsage        = ((flowRate / totalThroughput) * 100).toFixed(1);

  document.getElementById('trainResult_trains').textContent     = trainsNeeded;
  document.getElementById('trainResult_freq').textContent       = fmt(frequency);
  document.getElementById('trainResult_throughput').textContent = fmt(totalThroughput);
  document.getElementById('trainResult_usage').textContent      = routeUsage;
  document.getElementById('trainResult_cycle').textContent      = fmt(cycleMins);
  document.getElementById('trainResult_perTrain').textContent   = fmt(throughputOneTrain);

  document.getElementById('trainWarnSaturated').classList.toggle('visible', parseFloat(routeUsage) > 95);

  renderTrainTimeline(trainsNeeded, cycleMins, travelOneWay, loadTime / 60, unloadTime / 60);
  renderTrainAlternatives(flowRate, capacityPerTrain, cycleMins);
}

function renderTrainTimeline(trains, cycleMins, travelOneWay, loadMins, unloadMins) {
  const container = document.getElementById('trainTimeline');
  container.innerHTML = '';

  const totalW = 600;
  const rowH   = 28;
  const svgH   = Math.max(trains * (rowH + 6) + 40, 80);
  const scale  = totalW / cycleMins;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${totalW + 120} ${svgH}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', svgH);

  const phases = [
    { label: 'CARGA',    duration: loadMins,     color: '#4ADE80' },
    { label: 'VIAJE →',  duration: travelOneWay, color: '#38BDF8' },
    { label: 'DESCARGA', duration: unloadMins,    color: '#FBBF24' },
    { label: '← VUELTA', duration: travelOneWay, color: '#38BDF8' },
  ];

  const offset = cycleMins / trains;

  for (let i = 0; i < Math.min(trains, 8); i++) {
    const y     = i * (rowH + 6) + 20;
    const start = (i * offset) % cycleMins;

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', 0); label.setAttribute('y', y + rowH / 2 + 4);
    label.setAttribute('font-family', 'Share Tech Mono, monospace');
    label.setAttribute('font-size', '10'); label.setAttribute('fill', '#6A7A8A');
    label.textContent = `T${i + 1}`;
    svg.appendChild(label);

    let remaining = start;
    let phaseIdx  = 0;
    while (remaining > 0) {
      if (remaining >= phases[phaseIdx].duration) { remaining -= phases[phaseIdx].duration; phaseIdx = (phaseIdx + 1) % phases.length; }
      else break;
    }

    let drawn = 0;
    let pIdx  = phaseIdx;
    let pRem  = phases[phaseIdx].duration - remaining;

    while (drawn < cycleMins) {
      const dur  = Math.min(pRem, cycleMins - drawn);
      const w    = dur * scale;
      const xPos = 20 + (((start + drawn) % cycleMins) / cycleMins) * totalW;
      const actualW = Math.min(w, totalW - (xPos - 20));
      if (actualW > 0) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', xPos); rect.setAttribute('y', y);
        rect.setAttribute('width', actualW); rect.setAttribute('height', rowH);
        rect.setAttribute('fill', phases[pIdx % phases.length].color);
        rect.setAttribute('opacity', '0.7'); rect.setAttribute('rx', '2');
        svg.appendChild(rect);
      }
      drawn += dur;
      pIdx   = (pIdx + 1) % phases.length;
      pRem   = phases[pIdx % phases.length].duration;
    }
  }

  if (trains > 8) {
    const note = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    note.setAttribute('x', 20); note.setAttribute('y', svgH - 6);
    note.setAttribute('font-family', 'Share Tech Mono, monospace');
    note.setAttribute('font-size', '10'); note.setAttribute('fill', '#6A7A8A');
    note.textContent = `... y ${trains - 8} trenes más`;
    svg.appendChild(note);
  }

  container.appendChild(svg);

  const legend = document.getElementById('trainPhaseLegend');
  legend.innerHTML = phases.map(p =>
    `<div style="display:flex;align-items:center;gap:6px;font-family:'Share Tech Mono',monospace;font-size:0.65rem;color:var(--text-dim)">
      <div style="width:12px;height:12px;background:${p.color};opacity:0.8;border-radius:2px;flex-shrink:0"></div>
      ${p.label} (${fmt(p.duration)} min)
    </div>`
  ).join('');
}

function renderTrainAlternatives(flowRate, capPerTrain, baseCycleMins) {
  const tbody = document.getElementById('trainAltTable');
  const wagonsOptions = [1, 2, 3, 4, 6];
  tbody.innerHTML = wagonsOptions.map(w => {
    const cap       = (WAGON_CAPACITY[document.getElementById('trainCargoType').value].capacity) * w;
    const tput1     = cap / baseCycleMins;
    const trains    = Math.ceil(flowRate / tput1);
    const totalCap  = tput1 * trains;
    const usage     = ((flowRate / totalCap) * 100).toFixed(1);
    const isActive  = w === parseInt(document.getElementById('trainWagons').value);
    const uCls      = parseFloat(usage) > 90 ? 'bad' : parseFloat(usage) > 70 ? 'warn' : 'good';
    return `<tr${isActive ? ' style="background:rgba(232,146,26,0.05)"' : ''}>
      <td${isActive ? ' style="color:var(--orange);font-weight:700"' : ''}>${w} vagón${w > 1 ? 'es' : ''}</td>
      <td class="num">${fmt(cap)}</td>
      <td class="num">${trains}</td>
      <td class="num">${fmt(tput1)}/min</td>
      <td class="${uCls}">${usage}%</td>
    </tr>`;
  }).join('');
}

// ===========================
// == MAPA DE NODOS ==========
// ===========================
function renderMapNodes() {
  const tbody = document.getElementById('mapNodesTable');
  tbody.innerHTML = Object.entries(MAP_NODES).map(([key, nodes]) => {
    const rec = RECIPES[key];
    const name = rec ? rec.name : key;
    const totalNodes = nodes.impure + nodes.normal + nodes.pure;
    return `<tr>
      <td>${name}</td>
      <td class="num">${nodes.impure}</td>
      <td class="num">${nodes.normal}</td>
      <td class="num">${nodes.pure}</td>
      <td class="num good">${totalNodes}</td>
      <td class="num" style="color:var(--text-dim)">${fmt(nodes.impure*30 + nodes.normal*60 + nodes.pure*120)}/min (Mk.1)</td>
    </tr>`;
  }).join('');
}

// ===========================
// === GUARDAR / CARGAR ======
// ===========================
function getAppState() {
  return {
    v: 2,
    extractor: {
      type: document.getElementById('extractorType').value,
      purity: document.getElementById('purity').value,
      eff: document.getElementById('extractorEffRange').value,
      machSel: document.getElementById('targetMachine').value,
      machEff: document.getElementById('machineEffRange').value,
      customRate: document.getElementById('customRate').value,
    },
    recipe: {
      key: document.getElementById('recipe').value,
      desired: document.getElementById('desiredOutput').value,
      eff: document.getElementById('recipeEffRange').value,
    },
    tree: {
      product: document.getElementById('treeProduct').value,
      target: document.getElementById('treeTarget').value,
      oc: document.getElementById('treeOCRange').value,
      overrides: { ...treeRecipeOverrides },
    },
    factory: factoryLines.map(l => ({ key: l.key, machines: l.machines, oc: Math.round(l.oc * 100) })),
    energy: energyMachines.map(m => ({ name: m.name, mw: m.mw, qty: m.qty })),
    trains: {
      flow: document.getElementById('trainFlow').value,
      cargoType: document.getElementById('trainCargoType').value,
      dist: document.getElementById('trainRouteDist').value,
      wagons: document.getElementById('trainWagons').value,
      loadTime: document.getElementById('trainLoadTime').value,
      unloadTime: document.getElementById('trainUnloadTime').value,
    },
  };
}

function applyAppState(state) {
  if (!state || (state.v !== 1 && state.v !== 2)) return;
  try {
    const e = state.extractor;
    document.getElementById('extractorType').value     = e.type;
    document.getElementById('purity').value            = e.purity;
    document.getElementById('extractorEffRange').value = e.eff;
    syncEff(e.eff);
    document.getElementById('targetMachine').value     = e.machSel;
    document.getElementById('machineEffRange').value   = e.machEff;
    syncMachEff(e.machEff);
    document.getElementById('customRate').value        = e.customRate;
    calcExtractor();

    const r = state.recipe;
    document.getElementById('recipe').value         = r.key;
    document.getElementById('desiredOutput').value  = r.desired;
    document.getElementById('recipeEffRange').value = r.eff;
    syncRecEff(r.eff);
    calcRecipe();

    const t = state.tree;
    document.getElementById('treeProduct').value  = t.product;
    document.getElementById('treeTarget').value   = t.target;
    document.getElementById('treeOCRange').value  = t.oc;
    syncTreeOC(t.oc);
    treeRecipeOverrides = t.overrides || {};

    factoryLines = [];
    (state.factory || []).forEach(l => {
      const rec = RECIPES[l.key];
      if (!rec || rec.isRaw) return;
      factoryLines.push({ key: l.key, name: rec.name, machine: rec.machine, machines: l.machines, oc: l.oc / 100, outputRate: rec.outputRate, inputs: rec.inputs, id: Date.now() + Math.random() });
    });
    renderFactoryLines(); calcFactory();

    energyMachines = state.energy || [];
    renderEnergyList(); calcEnergy();

    const tr = state.trains;
    if (tr) {
      document.getElementById('trainFlow').value        = tr.flow;
      document.getElementById('trainCargoType').value   = tr.cargoType;
      document.getElementById('trainRouteDist').value   = tr.dist;
      document.getElementById('trainWagons').value      = tr.wagons;
      document.getElementById('trainLoadTime').value    = tr.loadTime;
      document.getElementById('trainUnloadTime').value  = tr.unloadTime;
      calcTrains();
    }
  } catch(err) { console.warn('Error al cargar estado:', err); }
}

function saveConfig() {
  const state = getAppState();
  const json  = JSON.stringify(state, null, 2);
  const blob  = new Blob([json], { type: 'application/json' });
  const a     = document.createElement('a');
  a.href      = URL.createObjectURL(blob);
  a.download  = 'ficsit-config.json';
  a.click();
  showNotification('✓ Configuración guardada como ficsit-config.json');
}

function loadConfig() {
  const input = document.createElement('input');
  input.type  = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file   = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const state = JSON.parse(ev.target.result);
        applyAppState(state);
        showNotification('✓ Configuración cargada correctamente');
      } catch { showNotification('✗ Error: archivo JSON inválido', true); }
    };
    reader.readAsText(file);
  };
  input.click();
}

function shareURL() {
  const state   = getAppState();
  const encoded = btoa(encodeURIComponent(JSON.stringify(state)));
  const url     = `${location.origin}${location.pathname}?cfg=${encoded}`;
  navigator.clipboard.writeText(url).then(() => {
    showNotification('✓ URL copiada al portapapeles');
  }).catch(() => {
    prompt('Copia esta URL:', url);
  });
}

function loadFromURL() {
  const params  = new URLSearchParams(location.search);
  const cfg     = params.get('cfg');
  if (!cfg) return;
  try {
    const state = JSON.parse(decodeURIComponent(atob(cfg)));
    applyAppState(state);
    showNotification('✓ Configuración cargada desde URL');
  } catch { console.warn('URL cfg inválida'); }
}

function showNotification(msg, isError = false) {
  let toast = document.getElementById('ficsitToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ficsitToast';
    toast.style.cssText = `
      position:fixed;bottom:24px;right:24px;z-index:10000;
      font-family:'Share Tech Mono',monospace;font-size:0.75rem;letter-spacing:0.08em;
      padding:12px 20px;border:1px solid;
      transition:opacity 0.3s,transform 0.3s;opacity:0;transform:translateY(8px);
      pointer-events:none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background  = isError ? 'rgba(248,113,113,0.1)' : 'rgba(74,222,128,0.1)';
  toast.style.borderColor = isError ? '#F87171' : '#4ADE80';
  toast.style.color       = isError ? '#F87171' : '#4ADE80';
  toast.style.opacity     = '1';
  toast.style.transform   = 'translateY(0)';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(8px)'; }, 3000);
}

function switchTab(id) {
  const ids = ['extractor', 'maquinas', 'comparador', 'arbol', 'cintas', 'tuberias', 'energia', 'fabrica', 'trenes', 'referencia'];
  document.querySelectorAll('.tab').forEach((t, i)  => t.classList.toggle('active', ids[i] === id));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + id));
}

// ===========================
// ======= INIT ==============
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  calcExtractor();
  calcRecipe();
  calcBelts();
  calcPipes();
  calcEnergy();
  runComparator();
  calcTrains();
  renderMapNodes();
  loadFromURL();
});