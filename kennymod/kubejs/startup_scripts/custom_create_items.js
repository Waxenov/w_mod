// Custom Create ingredients for NeoForge 1.21.1 / KubeJS
// Put this folder into the game directory: <instance>/kubejs

StartupEvents.registry('item', event => {
  event.create('couchuk')
    .maxStackSize(64)
    .rarity('common')
    .displayName('Каучуковая масса')

  event.create('resine_sheet')
    .maxStackSize(64)
    .rarity('common')
    .displayName('Резиновая пластина')

  event.create('armour_resine')
    .maxStackSize(64)
    .rarity('uncommon')
    .displayName('Армированная резина')

  event.create('copper_spool')
    .maxStackSize(64)
    .rarity('uncommon')
    .displayName('Медная обмотка')

  event.create('brass_frame')
    .maxStackSize(64)
    .rarity('uncommon')
    .displayName('Латунная рамка')

  event.create('gear')
    .maxStackSize(64)
    .rarity('common')
    .displayName('Зубчатая заготовка')

  event.create('paste')
    .maxStackSize(64)
    .rarity('common')
    .displayName('Смазочная паста')

  event.create('graphite_sheet')
    .maxStackSize(64)
    .rarity('uncommon')
    .displayName('Графитовая пластина')

  event.create('metal_alloy')
    .maxStackSize(64)
    .rarity('uncommon')
    .displayName('Жаростойкий сплав')

  event.create('alloy_zink_brass')
    .maxStackSize(64)
    .rarity('uncommon')
    .displayName('Латунно-цинковый сплав')

  event.create('steel_mechanism')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Стальной механизм')

  event.create('sealed_mechanism')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Герметичный механизм')

  event.create('sync_mechanism')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Механизм синхронизации')

  event.create('quartz_mechanism')
    .maxStackSize(64)
    .rarity('epic')
    .displayName('Кварцевый механизм точности')

  event.create('induction_mechanism')
    .maxStackSize(64)
    .rarity('epic')
    .displayName('Индукционный механизм')


  // Transitional items for sequenced assembly. These are deliberately distinct
  // from finished products so partially processed items cannot bypass a chain.
  event.create('unfinished_gear')
    .maxStackSize(64)
    .rarity('common')
    .displayName('Незавершённая зубчатая заготовка')

  event.create('unfinished_armour_resine')
    .maxStackSize(64)
    .rarity('uncommon')
    .displayName('Незавершённая армированная резина')

  event.create('unfinished_steel_mechanism')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Незавершённый стальной механизм')

  event.create('unfinished_sealed_mechanism')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Незавершённый герметичный механизм')

  event.create('unfinished_sync_mechanism')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Незавершённый механизм синхронизации')

  event.create('unfinished_quartz_mechanism')
    .maxStackSize(64)
    .rarity('epic')
    .displayName('Незавершённый кварцевый механизм точности')

  event.create('unfinished_induction_mechanism')
    .maxStackSize(64)
    .rarity('epic')
    .displayName('Незавершённый индукционный механизм')

  event.create('unfinished_redstone_engine')
    .maxStackSize(64)
    .rarity('uncommon')
    .displayName('Незавершённый редстоуновый двигатель')

  event.create('unfinished_coal_engine')
    .maxStackSize(64)
    .rarity('uncommon')
    .displayName('Незавершённый угольный двигатель')

  event.create('unfinished_game_processor')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Незавершённый игровой процессор')

  // Late-game Create More Machines progression materials
  event.create('barrelbot_core_fragment')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Фрагмент ядра Бочкобота')

  event.create('iskrite_ingot')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Искритовый слиток')

  event.create('raw_resonant_core')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Необработанное резонансное ядро')

  event.create('compressed_resonant_core')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Сжатое резонансное ядро')

  event.create('unfinished_resonant_core')
    .maxStackSize(64)
    .rarity('rare')
    .displayName('Незавершённое резонансное ядро')

  event.create('resonant_mechanical_core')
    .maxStackSize(64)
    .rarity('epic')
    .displayName('Резонансное механическое ядро')

  event.create('overcharged_resonant_core')
    .maxStackSize(64)
    .rarity('epic')
    .displayName('Перегруженное резонансное ядро')

  event.create('mech_activation_core')
    .maxStackSize(1)
    .rarity('epic')
    .displayName('Ядро активации Пиглин-меха')

  event.create('mech_core')
    .maxStackSize(16)
    .rarity('epic')
    .displayName('Ядро Пиглин-меха')

})
