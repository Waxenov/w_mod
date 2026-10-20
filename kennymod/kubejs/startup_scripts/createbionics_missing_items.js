// Create Bionics 2.1.0 ships assets and recipes for these two components,
// but does not register them. Restore the intended crafting components so
// the mod's progression can use its own assets without Missing Item entries.
StartupEvents.registry('item', event => {
  event.create('createbionics:simple_engine')
  event.create('createbionics:silent_piston')
})
