// Restore Ultimate Compression ore XP ranges from UCOres (NeoForge 1.21.1 / UC 3.2.0).
// Static loot tables control drops, Fortune and Silk Touch; this event only restores XP.
const UC_ORE_XP = {
  'uc:compressed_coal_ore': [0, 2],
  'uc:compressed_diamond_ore': [9, 21],
  'uc:compressed_emerald_ore': [9, 21],
  'uc:compressed_lapis_ore': [6, 15],
  'uc:compressed_redstone_ore': [3, 15],
  'uc:compressed_nether_quartz_ore': [2, 5],
  'uc:compressed_nether_gold_ore': [1, 2]
}

Object.entries(UC_ORE_XP).forEach(([id, range]) => {
  BlockEvents.drops(id, event => {
    // No drops or the ore block itself means no XP (e.g. Silk Touch).
    if (event.items.size() === 0 || event.containsItem(id)) {
      event.setXp(0)
      return
    }

    var min = range[0]
    var max = range[1]
    event.setXp(min + Math.floor(Math.random() * (max - min + 1)))
  })
})
