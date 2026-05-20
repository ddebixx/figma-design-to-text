import type { JsonRecord } from './jsonValue'

export function summarizeEffects(effects: ReadonlyArray<Effect>): JsonRecord[] {
  return effects.filter((effect) => effect.visible !== false).map(summarizeEffect)
}

function summarizeEffect(effect: Effect): JsonRecord {
  const summary: JsonRecord = {
    type: effect.type,
  }

  if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
    summary.radius = effect.radius
    return summary
  }

  if (effect.type === 'LAYER_BLUR' || effect.type === 'BACKGROUND_BLUR') {
    summary.radius = effect.radius
  }

  return summary
}
