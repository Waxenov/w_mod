// Looting-aware drops for Barrelbot and Kindletron.
// Both mobs use custom death animations and bypass vanilla loot-table death handling,
// so their special progression materials are emitted here exactly once.
// Multiplier rule requested for Looting: no enchant/level I = x1, II = x2, III = x3, IV = x4, etc.

var EnchantingHelper_BossLoot = null;
var Enchantments_BossLoot = null;
var ServerPlayer_BossLoot = null;
var BuiltInRegistries_BossLoot = null;
var bossLootDisabled = false;
var bossLootScanTick = 0;

try {
  EnchantingHelper_BossLoot = Java.loadClass('fuzs.puzzleslib.api.item.v2.EnchantingHelper');
  Enchantments_BossLoot = Java.loadClass('net.minecraft.world.item.enchantment.Enchantments');
  ServerPlayer_BossLoot = Java.loadClass('net.minecraft.server.level.ServerPlayer');
  BuiltInRegistries_BossLoot = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
} catch (err) {
  bossLootDisabled = true;
  console.warn('[miniboss_looting_drops] Не удалось загрузить API зачарований: ' + err);
}

function bossLootKiller(entity) {
  var killer = null;
  try {
    killer = entity.getLastHurtByMob();
  } catch (ignored1) {}

  if (killer instanceof ServerPlayer_BossLoot) return killer;

  try {
    killer = entity.getTarget();
  } catch (ignored2) {
    killer = null;
  }
  return (killer instanceof ServerPlayer_BossLoot) ? killer : null;
}

function bossLootMultiplierForKiller(killer) {
  if (!killer) return 1;

  try {
    var level = EnchantingHelper_BossLoot.getEnchantmentLevel(Enchantments_BossLoot.LOOTING, killer);
    return level >= 2 ? level : 1;
  } catch (err) {
    console.warn('[miniboss_looting_drops] Не удалось прочитать Добычу: ' + err);
    return 1;
  }
}

function bossLootMultiplier(entity) {
  return bossLootMultiplierForKiller(bossLootKiller(entity));
}

function bossLootProcess(entity, itemId, delayTicks) {
  if (!entity.isDying()) return;

  var data = entity.getPersistentData();
  if (data.getBoolean('kenny_special_loot_done')) return;

  if (data.getInt('kenny_special_loot_multiplier') <= 0) {
    data.putInt('kenny_special_loot_multiplier', bossLootMultiplier(entity));
  }

  var ticks = data.getInt('kenny_special_loot_ticks') + 5;
  data.putInt('kenny_special_loot_ticks', ticks);
  if (ticks < delayTicks) return;

  // Exactly one base roll (1-2), then multiply that roll by Looting level.
  var base = 1 + Math.floor(Math.random() * 2);
  var multiplier = data.getInt('kenny_special_loot_multiplier');
  var count = base * multiplier;

  entity.spawnAtLocation(Item.of(itemId, count));
  data.putBoolean('kenny_special_loot_done', true);
}

ServerEvents.tick(event => {
  if (bossLootDisabled) return;

  bossLootScanTick++;
  if ((bossLootScanTick % 5) !== 0) return;

  try {
    event.server.getAllLevels().forEach(level => {
      level.getAllEntities().forEach(entity => {
        var id = '' + BuiltInRegistries_BossLoot.ENTITY_TYPE.getKey(entity.getType());
        if (id === 'barrelbot:barrel_bot') {
          bossLootProcess(entity, 'kubejs:barrelbot_core_fragment', 90);
        } else if (id === 'kindletron:kindletron') {
          bossLootProcess(entity, 'kubejs:iskrite_ingot', 110);
        }
      });
    });
  } catch (err) {
    bossLootDisabled = true;
    console.warn('[miniboss_looting_drops] Скрипт отключён после ошибки: ' + err);
  }
});


// Piglin Mech uses the normal entity death/loot pipeline, so only its special core stack
// needs to be multiplied after the loot table has created it.
EntityEvents.drops('mech:mech', event => {
  if (bossLootDisabled) return;

  try {
    var killer = event.source ? event.source.getEntity() : null;
    if (!(killer instanceof ServerPlayer_BossLoot)) return;

    var multiplier = bossLootMultiplierForKiller(killer);
    if (multiplier <= 1) return;

    event.getDrops().forEach(itemEntity => {
      var stack = itemEntity.getItem();
      var id = '' + BuiltInRegistries_BossLoot.ITEM.getKey(stack.getItem());
      if (id === 'kubejs:mech_core') {
        stack.setCount(stack.getCount() * multiplier);
      }
    });
  } catch (err) {
    console.warn('[miniboss_looting_drops] Не удалось применить Добычу к ядру Пиглин-меха: ' + err);
  }
});
