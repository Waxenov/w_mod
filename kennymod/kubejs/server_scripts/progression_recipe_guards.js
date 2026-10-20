// Progression recipe guards for NeoForge 1.21.1 / KubeJS 2101.x.
// Keep this in server_scripts. It removes shortcut recipes by output and re-adds only the gated versions.

ServerEvents.recipes(event => {
  // Work around Create 6.0.10 crashing on the vanilla green + white dye
  // recipe when Mechanical Crafters enter the regular-crafting fallback.
  event.remove({ id: 'minecraft:lime_dye' })

  event.custom({
    type: 'minecraft:crafting_shapeless',
    category: 'misc',
    ingredients: [
      { item: 'minecraft:green_dye' },
      { item: 'minecraft:white_dye' }
    ],
    result: { id: 'minecraft:lime_dye', count: 2 }
  }).id('kubejs:lime_dye_manual_only')

  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    pattern: ['GW'],
    key: {
      G: { item: 'minecraft:green_dye' },
      W: { item: 'minecraft:white_dye' }
    },
    result: { id: 'minecraft:lime_dye', count: 2 }
  }).id('kubejs:lime_dye_mechanical')

  const colors = ['white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black']

  // Remove known vanilla/mod recipes by ID or ID regex only.
  ;[
    'kubejs:crafting/copper_spool',
    'kubejs:crafting/rotation_speed_controller_induction_upgrade',
    'kubejs:sequenced_assembly/armour_resine',
    'kubejs:sequenced_assembly/steel_mechanism',
    'kubejs:sequenced_assembly/sync_mechanism',
    'aeronautics:mechanical_crafting/mounted_potato_cannon',
    'sophisticatedbackpacks:backpack',
    // Keep the customized copper -> iron route as the single intended upgrade recipe.
    'sophisticatedbackpacks:iron_backpack_from_copper',
    'sophisticatedbackpacks:upgrade_base',
    // The customized Create Armorer pack already supplies progression-aware recipes.
    // Disable Create Immersive TaCZ's parallel recipes so EMI shows one intended route.
    'createimmersivetacz:attachments/ap_projectile',
    'createimmersivetacz:attachments/bigger_cylinder',
    'createimmersivetacz:attachments/blasting_protocol',
    'createimmersivetacz:attachments/brass_retractor',
    'createimmersivetacz:attachments/extended_mag_1',
    'createimmersivetacz:attachments/extended_mag_2',
    'createimmersivetacz:attachments/extended_mag_3',
    'createimmersivetacz:attachments/gantry_shaft_grip',
    'createimmersivetacz:attachments/lava_perfusion_bottle',
    'createimmersivetacz:attachments/medium_distance_scope',
    'createimmersivetacz:attachments/muzzle_refit_energy_blade',
    'createimmersivetacz:attachments/shaft_grip',
    'createimmersivetacz:attachments/sight_reflex',
    'createimmersivetacz:attachments/simple_mechanical_sight',
    'createimmersivetacz:attachments/standard_scope',
    'createimmersivetacz:attachments/telephoto_scope',
    'createimmersivetacz:attachments/wooden_grip',
    'createimmersivetacz:guns/assault_rifle',
    'createimmersivetacz:guns/double_barrel_shotgun',
    'createimmersivetacz:guns/field_gun',
    'createimmersivetacz:guns/grenade_launcher',
    'createimmersivetacz:guns/lmg',
    'createimmersivetacz:guns/pistol',
    'createimmersivetacz:guns/pump_shotgun',
    'createimmersivetacz:guns/revolver',
    'createimmersivetacz:guns/roller',
    'createimmersivetacz:guns/semi_rifle',
    'createimmersivetacz:guns/smg',
    'createimmersivetacz:guns/sniper',
    // Create Arbitrary ships cheap creative recipes under the create namespace.
    // Remove every native shortcut; the post-Beyond recipes live in kubejs/data.
    'create:creative_blaze_cake',
    'create:creative_crate',
    'create:creative_fluid_tank',
    'create:creative_motor',
    'create:mechanical_crafting/handheld_worldshaper',
    'create:sequenced_assembly/creative_casing',
    'create:sequenced_assembly/creative_mechanism'
  ].forEach(id => event.remove({ id: id }))

  ;[
    /^create:.*electron_tube.*$/,
    /^create:.*empty_blaze_burner.*$/,
    /^create:.*mechanical_pump.*$/,
    /^create:.*hose_pulley.*$/,
    /^create:.*brass_casing.*$/,
    /^create:.*rotation_speed_controller.*$/,
    /^create_sa:.*heat_engine.*$/,
    /^create_sa:.*hydraulic_engine.*$/,
    /^aeronautics:.*mounted_potato_cannon.*$/,
    /^aeronautics:.*_envelope.*$/,
    /^sophisticatedbackpacks:.*upgrade_base.*$/
  ].forEach(id => event.remove({ id: id }))

  event.custom({
    type: 'minecraft:crafting_shaped',
    category: 'misc',
    pattern: [' C ', 'CRC', ' C '],
    key: {
      C: { item: 'create:copper_sheet' },
      R: { item: 'kubejs:resine_sheet' }
    },
    result: { id: 'kubejs:copper_spool', count: 2 }
  }).id('kubejs:progression/copper_spool')

  event.custom({
    type: 'minecraft:crafting_shaped',
    category: 'misc',
    pattern: ['L', 'S', 'N'],
    key: {
      L: { item: 'create:polished_rose_quartz' },
      S: { item: 'kubejs:copper_spool' },
      N: { tag: 'c:plates/iron' }
    },
    result: { id: 'create:electron_tube' }
  }).id('kubejs:progression/electron_tube')

  event.custom({
    type: 'minecraft:crafting_shaped',
    category: 'misc',
    pattern: [' C ', 'FPF', ' S '],
    key: {
      C: { item: 'create:copper_sheet' },
      F: { item: 'create:fluid_pipe' },
      P: { item: 'kubejs:copper_spool' },
      S: { item: 'create:shaft' }
    },
    result: { id: 'create:mechanical_pump' }
  }).id('kubejs:progression/mechanical_pump')

  event.custom({
    type: 'minecraft:crafting_shaped',
    category: 'misc',
    pattern: ['BHB', ' S ', ' C '],
    key: {
      B: { item: 'create:copper_casing' },
      H: { item: 'create_sa:hydraulic_engine' },
      S: { item: 'kubejs:sealed_mechanism' },
      C: { tag: 'c:plates/copper' }
    },
    result: { id: 'create:hose_pulley' }
  }).id('kubejs:progression/hose_pulley')

  event.custom({
    type: 'create:item_application',
    ingredients: [{ tag: 'c:stripped_logs' }, { tag: 'c:plates/brass' }],
    results: [{ id: 'create:brass_casing' }]
  }).id('kubejs:progression/brass_casing_from_log')

  event.custom({
    type: 'create:item_application',
    ingredients: [{ tag: 'c:stripped_woods' }, { tag: 'c:plates/brass' }],
    results: [{ id: 'create:brass_casing' }]
  }).id('kubejs:progression/brass_casing_from_wood')

  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    pattern: [' S ', 'SIS', ' S '],
    key: {
      S: { item: 'create:brass_sheet' },
      I: { item: 'kubejs:induction_mechanism' }
    },
    result: { id: 'create:rotation_speed_controller' }
  }).id('kubejs:progression/rotation_speed_controller')

  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'create:andesite_alloy' },
    loops: 3,
    results: [{ id: 'create_sa:heat_engine', chance: 120.0 }, { id: 'create:zinc_nugget', chance: 8.0 }],
    sequence: [
      { type: 'create:deploying', ingredients: [{ item: 'create_sa:incomplete_heat_engine' }, { item: 'kubejs:gear' }], results: [{ id: 'create_sa:incomplete_heat_engine' }] },
      { type: 'create:deploying', ingredients: [{ item: 'create_sa:incomplete_heat_engine' }, { item: 'kubejs:paste' }], results: [{ id: 'create_sa:incomplete_heat_engine' }] },
      { type: 'create:deploying', ingredients: [{ item: 'create_sa:incomplete_heat_engine' }, { item: 'minecraft:blaze_powder' }], results: [{ id: 'create_sa:incomplete_heat_engine' }] },
      { type: 'create:deploying', ingredients: [{ item: 'create_sa:incomplete_heat_engine' }, { item: 'create:large_cogwheel' }], results: [{ id: 'create_sa:incomplete_heat_engine' }] },
      { type: 'create:pressing', ingredients: [{ item: 'create_sa:incomplete_heat_engine' }], results: [{ id: 'create_sa:incomplete_heat_engine' }] }
    ],
    transitional_item: { id: 'create_sa:incomplete_heat_engine' }
  }).id('kubejs:progression/heat_engine')

  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'create:copper_sheet' },
    loops: 3,
    results: [{ id: 'create_sa:hydraulic_engine', chance: 120.0 }, { id: 'create:copper_sheet', chance: 8.0 }],
    sequence: [
      { type: 'create:filling', ingredients: [{ item: 'create_sa:incomplete_hydraulic_engine' }, { type: 'neoforge:single', fluid: 'minecraft:water', amount: 250 }], results: [{ id: 'create_sa:incomplete_hydraulic_engine' }] },
      { type: 'create:deploying', ingredients: [{ item: 'create_sa:incomplete_hydraulic_engine' }, { item: 'kubejs:resine_sheet' }], results: [{ id: 'create_sa:incomplete_hydraulic_engine' }] },
      { type: 'create:deploying', ingredients: [{ item: 'create_sa:incomplete_hydraulic_engine' }, { item: 'kubejs:copper_spool' }], results: [{ id: 'create_sa:incomplete_hydraulic_engine' }] },
      { type: 'create:pressing', ingredients: [{ item: 'create_sa:incomplete_hydraulic_engine' }], results: [{ id: 'create_sa:incomplete_hydraulic_engine' }] }
    ],
    transitional_item: { id: 'create_sa:incomplete_hydraulic_engine' }
  }).id('kubejs:progression/hydraulic_engine')

  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'kubejs:resine_sheet' },
    loops: 2,
    results: [{ id: 'kubejs:armour_resine' }, { id: 'kubejs:resine_sheet', chance: 0.12 }, { id: 'minecraft:string', chance: 0.08 }],
    sequence: [
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_armour_resine' }, { tag: 'c:plates/iron' }], results: [{ id: 'kubejs:unfinished_armour_resine' }] },
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_armour_resine' }, { item: 'minecraft:string' }], results: [{ id: 'kubejs:unfinished_armour_resine' }] },
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_armour_resine' }, { item: 'kubejs:alloy_zink_brass' }], results: [{ id: 'kubejs:unfinished_armour_resine' }] },
      { type: 'create:pressing', ingredients: [{ item: 'kubejs:unfinished_armour_resine' }], results: [{ id: 'kubejs:unfinished_armour_resine' }] }
    ],
    transitional_item: { id: 'kubejs:unfinished_armour_resine' }
  }).id('kubejs:progression/armour_resine')

  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'kubejs:gear' },
    loops: 4,
    results: [{ id: 'kubejs:steel_mechanism' }, { id: 'kubejs:gear', chance: 0.1 }, { id: 'createnuclear:steel_nugget', chance: 0.18 }],
    sequence: [
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_steel_mechanism' }, { item: 'createnuclear:steel_ingot' }], results: [{ id: 'kubejs:unfinished_steel_mechanism' }] },
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_steel_mechanism' }, { item: 'kubejs:metal_alloy' }], results: [{ id: 'kubejs:unfinished_steel_mechanism' }] },
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_steel_mechanism' }, { item: 'kubejs:copper_spool' }], results: [{ id: 'kubejs:unfinished_steel_mechanism' }] },
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_steel_mechanism' }, { item: 'create:large_cogwheel' }], results: [{ id: 'kubejs:unfinished_steel_mechanism' }] },
      { type: 'create:pressing', ingredients: [{ item: 'kubejs:unfinished_steel_mechanism' }], results: [{ id: 'kubejs:unfinished_steel_mechanism' }] }
    ],
    transitional_item: { id: 'kubejs:unfinished_steel_mechanism' }
  }).id('kubejs:progression/steel_mechanism')

  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'kubejs:brass_frame' },
    loops: 3,
    results: [{ id: 'kubejs:sync_mechanism' }, { id: 'kubejs:brass_frame', chance: 0.08 }, { id: 'minecraft:redstone', chance: 0.16 }],
    sequence: [
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_sync_mechanism' }, { item: 'create:electron_tube' }], results: [{ id: 'kubejs:unfinished_sync_mechanism' }] },
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_sync_mechanism' }, { item: 'kubejs:metal_alloy' }], results: [{ id: 'kubejs:unfinished_sync_mechanism' }] },
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_sync_mechanism' }, { item: 'kubejs:copper_spool' }], results: [{ id: 'kubejs:unfinished_sync_mechanism' }] },
      { type: 'create:deploying', ingredients: [{ item: 'kubejs:unfinished_sync_mechanism' }, { tag: 'c:dusts/redstone' }], results: [{ id: 'kubejs:unfinished_sync_mechanism' }] },
      { type: 'create:pressing', ingredients: [{ item: 'kubejs:unfinished_sync_mechanism' }], results: [{ id: 'kubejs:unfinished_sync_mechanism' }] }
    ],
    transitional_item: { id: 'kubejs:unfinished_sync_mechanism' }
  }).id('kubejs:progression/sync_mechanism')

  colors.forEach(color => {
    event.custom({
      type: 'create:deploying',
      ingredients: [{ item: `minecraft:${color}_wool` }, { item: 'kubejs:resine_sheet' }],
      results: [{ id: `aeronautics:${color}_envelope`, count: 3 }]
    }).id(`kubejs:progression/envelope_${color}`)
  })

  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    pattern: ['SRB  ', 'KCPPB', 'SRB  '],
    key: {
      C: { item: 'create:cogwheel' },
      K: { item: 'minecraft:dried_kelp_block' },
      P: { item: 'create:fluid_pipe' },
      R: { item: 'minecraft:redstone' },
      S: { item: 'create:copper_sheet' },
      B: { item: 'kubejs:armour_resine' }
    },
    result: { id: 'aeronautics:mounted_potato_cannon', count: 1 }
  }).id('kubejs:progression/mounted_potato_cannon')

  event.custom({
    type: 'sophisticatedbackpacks:basic_backpack',
    category: 'misc',
    pattern: ['RVR', 'LBL', 'RVR'],
    key: {
      R: { item: 'kubejs:resine_sheet' },
      V: { item: 'create_sa:vault_component' },
      L: { tag: 'c:leathers' },
      B: { item: 'kubejs:brass_frame' }
    },
    result: { id: 'sophisticatedbackpacks:backpack', count: 1 }
  }).id('kubejs:progression/backpack')

  event.custom({
    type: 'minecraft:crafting_shaped',
    category: 'misc',
    pattern: ['RVR', 'LCL', 'RVR'],
    key: {
      R: { item: 'kubejs:resine_sheet' },
      V: { item: 'create_sa:vault_component' },
      L: { tag: 'c:leathers' },
      C: { item: 'create:brass_casing' }
    },
    result: { id: 'sophisticatedbackpacks:upgrade_base', count: 1 }
  }).id('kubejs:progression/upgrade_base')
})
